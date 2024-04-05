from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from llama_index.core import StorageContext, VectorStoreIndex, load_index_from_storage, SimpleDirectoryReader
from llama_index.core import PromptTemplate
from llama_index.llms.openai import OpenAI
from llama_index.core.prompts import LangchainPromptTemplate
from langchain import hub
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
import os
import time
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
 
 
os.environ["OPENAI_API_KEY"] = "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"
 
langchain_prompt = hub.pull("rlm/rag-prompt")
 
 
def get_index(data, index_name):
    index = None
    print("Building index", index_name)
    start_embedding_time = time.time()
    index = VectorStoreIndex.from_documents(data, show_progress=True)
    index.storage_context.persist(persist_dir=index_name)
    end_embedding_time = time.time()
    embedding_time = end_embedding_time - start_embedding_time
    return index, embedding_time
 
def load_index(index_name):
    index = None
    start_embedding_time = time.time()
    index = load_index_from_storage(StorageContext.from_defaults(persist_dir=index_name))
    end_embedding_time = time.time()
    embedding_time = end_embedding_time - start_embedding_time
    return index, embedding_time
 
def load_data():
    report_pdf = SimpleDirectoryReader("data").load_data()
    return report_pdf
 
gpt35_llm = OpenAI(model="gpt-3.5-turbo")
 
if not os.path.exists("test_data_embeddings"):
    report_pdf = load_data()
    report_index, time_stamp = get_index(report_pdf, "test_data_embeddings")
else:
    report_index, time_stamp = load_index("test_data_embeddings")
 
report_engine = report_index.as_query_engine(response_mode="tree_summarize", similarity_top_k=4, llm=gpt35_llm)
 
new_summary_tmpl_str = (
    "Context information is below.\n"
    "---------------------\n"
    "{context_str}\n"
    "---------------------\n"
    "Given the context information and not prior knowledge\n"
    "First answer the user query\n"
    "Then give at most 3 recommended products similar to the user query\n"
    "Query: {query_str}\n"
    "Answer: "
)
 
new_summary_tmpl = PromptTemplate(new_summary_tmpl_str)
report_engine.update_prompts(
    {"response_synthesizer:summary_template": new_summary_tmpl}
)
 
lc_prompt_tmpl = LangchainPromptTemplate(
    template=langchain_prompt,
    template_var_mappings={"query_str": "question", "context_str": "context"},
)
 
report_engine.update_prompts(
    {"response_synthesizer:text_qa_template": lc_prompt_tmpl}
)
 
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
 
@app.post("/chat")
async def chat(payload: dict):
    try:
        user_input_history = payload.get("history", [])
        userID = payload.get("userID", "")
        if not user_input_history:
            return JSONResponse(
                content={"error": "User input history is missing"}, status_code=400
            )
 
        user_input_str = user_input_history[-1].get("user", "")
        result = report_engine.query(user_input_str)
        result = str(result)
 
        formatted_response = {
            "data_points": [user_input_str],
            "thoughts": "thoughts",
            "exchange_id": 92,
            "question": user_input_str,
            "answer": result,
            "tokens": 0,
            "recommended_question": [],
            "isChartRequired": False,
            "chart_data": None,
            "query_id": ""
        }
 
        return JSONResponse(content=formatted_response, status_code=200)
 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
   
app.mount("/", StaticFiles(directory="static", html=True), name="static")
 
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8541, reload=True, workers=2)
 
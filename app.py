from fastapi import FastAPI, HTTPException
import os
import time
from llama_index.core import StorageContext, VectorStoreIndex, load_index_from_storage, SimpleDirectoryReader
from llama_index.core import PromptTemplate
from llama_index.llms.openai import OpenAI
from llama_index.core.prompts import LangchainPromptTemplate
from langchain import hub
from IPython.display import Markdown,display


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
"Then give atmost 3 recommended products similar to the user query\n"
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

@app.get("/answer/")
async def get_answer(question: str):
    try:
        result = report_engine.query(question)
        result = str(result)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

import { AskRequest, AskResponse, ChatRequest, ChartJSResponse, userInfoResponse, ChartJSRequest, feedbackRequest, exportPdfRequest } from "./models";

export async function askApi(options: AskRequest): Promise<AskResponse> {
    const response = await fetch("/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question: options.question,
            approach: options.approach,
            overrides: {
                semantic_ranker: options.overrides?.semanticRanker,
                semantic_captions: options.overrides?.semanticCaptions,
                top: options.overrides?.top,
                temperature: options.overrides?.temperature,
                prompt_template: options.overrides?.promptTemplate,
                prompt_template_prefix: options.overrides?.promptTemplatePrefix,
                prompt_template_suffix: options.overrides?.promptTemplateSuffix,
                exclude_category: options.overrides?.excludeCategory
            }
        })
    });

    const parsedResponse: AskResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }

    return parsedResponse;
}

export async function chatApi(options: ChatRequest, signal?: AbortSignal): Promise<AskResponse> {
    const controller = new AbortController();
    const mergedSignal = signal || controller.signal;

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            history: options.history,
            approach: options.approach,
            overrides: {
                semantic_ranker: options.overrides?.semanticRanker,
                semantic_captions: options.overrides?.semanticCaptions,
                top: options.overrides?.top,
                temperature: options.overrides?.temperature,
                prompt_template: options.overrides?.promptTemplate,
                prompt_template_prefix: options.overrides?.promptTemplatePrefix,
                prompt_template_suffix: options.overrides?.promptTemplateSuffix,
                exclude_category: options.overrides?.excludeCategory,
                suggest_followup_questions: options.overrides?.suggestFollowupQuestions
            },
            temperature: options.temperature,
            token: options.temperature,
            personalization: false,
            language: options.language,
            userID: options.userID,
            chatID: options.chatID
        }),
        signal: mergedSignal
    });

    const parsedResponse: AskResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }

    return parsedResponse;
}

export function getCitationFilePath(citation: string): string {
    return `/content/${citation}`;
}

export async function feedBackApi(options: feedbackRequest): Promise<AskResponse> {
    const response = await fetch("/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            exchange_id: options.exchange_id,
            answer: options.answer,
            reaction: options.reaction,
            comment_categories: options.comment_categories,
            additional_comments: options.additional_comments
        })
    });

    const parsedResponse: AskResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }

    return parsedResponse;
}

export async function exportChatbotApi() {
    return fetch("/export")
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(href => {
            Object.assign(document.createElement("a"), {
                href,
                download: "ChatbotMessage.xlsx"
            }).click();
        });
}

export async function exportChatbotPdfApi(options: exportPdfRequest) {
    return fetch("/export_pdf", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            queries: options.queries
        })
    })
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(href => {
            Object.assign(document.createElement("a"), {
                href,
                download: "UserChatbotMessage.pdf"
            }).click();
        });
}

export async function userInfoApi(): Promise<userInfoResponse> {
    const response = await fetch("/get_user_info", {
        method: "GET"
    });
    const parsedResponse: userInfoResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        return { user_id: "U-Chat", status: "FAIL" };
    }
    return parsedResponse;
}

export async function ChartJSApi(options: ChartJSRequest): Promise<ChartJSResponse> {
    const response = await fetch("/generate_chart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           chart_data: options.chart_data,
           data:options.data
        })
    });

    const parsedResponse: ChartJSResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }
    return parsedResponse;
}

export async function fecthApi(apiName: string) {
    try {
        const response = await fetch(`/${apiName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const parsedResponse = await response.json();
        if (response.status > 299 || !response.ok) {
            throw Error(parsedResponse.error || "Unknown error");
        }
        return parsedResponse;
    } catch (err) {
        return [];
    }
}

export async function CreateAPI(options: any, apiName: string): Promise<any> {
    try {
        const response = await fetch(`/${apiName}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(options)
        });
        const parsedResponse = await response.json();
        if (response.status > 299 || !response.ok) {
            throw Error(parsedResponse.error || "Unknown error");
        }
        return parsedResponse;
    } catch (err) {
        return [];
    }
}

export async function DeleteAppointemtApi(apiName: any) {
    const response = await fetch(`/${apiName}`, {
        method: "delete"
    });
    const parsedResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }
    return parsedResponse;
}

export async function UpdateAppointemtApi(options: any, apiName: any) {
    const response = await fetch(`/${apiName}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
    });
    const parsedResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }
    return parsedResponse;
}

const BASE_API_URL = "";

export async function postApi(options: any, apiName: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_API_URL}/${apiName}`, {
            method: "POST",
            body: JSON.stringify(options),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });

        const parsedResponse = await response.json();
        if (!response.ok) {
            throw Error(parsedResponse.error || "Unknown error");
        }

        return parsedResponse;
    } catch (err) {
        return [];
    }
}

export async function postApiFiles(options: any, apiName: string, headers?: any): Promise<any> {
    try {
        const response = await fetch(`${BASE_API_URL}/${apiName}`, {
            method: "POST",
            mode: "cors",
            headers: headers,
            body: JSON.stringify(options)
        });

        const parsedResponse = await response.json();
        if (!response.ok) {
            throw Error(parsedResponse.error || "Unknown error");
        }

        return parsedResponse;
    } catch (err) {
        return [];
    }
}

export async function getApi(apiName: string) {
    try {
        const response = await fetch(`${BASE_API_URL}/${apiName}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const parsedResponse = await response.json();
        if (response.status > 299 || !response.ok) {
            throw Error(parsedResponse.error || "Unknown error");
        }
        return parsedResponse;
    } catch (err) {
        return [];
    }
}

export async function postApiWithJson(options: any, apiName: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_API_URL}/${apiName}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(options)
        });
        const parsedResponse = await response.json();
        if (response.status > 299 || !response.ok) {
            throw Error(parsedResponse.error || "Unknown error");
        }
        return parsedResponse;
    } catch (err) {
        return [];
    }
}

export async function updateApi(options: any, apiName: any) {
    const response = await fetch(`${BASE_API_URL}/${apiName}`, {
        method: "PUT",
        body: options
    });
    const parsedResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }
    return parsedResponse;
}

export async function deleteApi(apiName: any) {
    const response = await fetch(`${BASE_API_URL}/${apiName}`, {
        method: "delete"
    });
    const parsedResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }
    return parsedResponse;
}

export async function deleteApiFile(apiName: any) {
    const response = await fetch(`${BASE_API_URL}/${apiName}`, {
        method: "delete"
    });

    return response;
}
export const fileUpload = (formData: any, apiName: any) => {
    const response = fetch(`${BASE_API_URL}/${apiName}`, {
        method: "POST",
        body: formData
    })
        .then(response => {
            // Handle response
            return response;
        })
        .catch(error => {
            // Handle error
            console.log("error:", error);
        });

    return response;
};


export async function getApiDownload(apiName: string) {
    try {
        const response = await fetch(`${BASE_API_URL}/${apiName}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        });
       
        return response;
    } catch (err) {
        return [];
    }
}

export async function getApiQuery(apiName: string,queryName: string ,tagName: string) {
    try {
        const response = await fetch(`${BASE_API_URL}/${apiName}?${queryName}=${tagName}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const parsedResponse = await response.json();
        if (response.status > 299 || !response.ok) {
            throw Error(parsedResponse.error || "Unknown error");
        }
        return parsedResponse;
    } catch (err) {
        return [];
    }
}


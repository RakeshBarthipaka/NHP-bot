export const enum Approaches {
    RetrieveThenRead = "rtr",
    ReadRetrieveRead = "rrr",
    ReadDecomposeAsk = "rda"
}

export type AskRequestOverrides = {
    semanticRanker?: boolean;
    semanticCaptions?: boolean;
    excludeCategory?: string;
    top?: number;
    temperature?: number;
    promptTemplate?: string;
    promptTemplatePrefix?: string;
    promptTemplateSuffix?: string;
    suggestFollowupQuestions?: boolean;
};

export type AskRequest = {
    question: string;
    approach: Approaches;
    overrides?: AskRequestOverrides;
};

export type AskResponse = {
    isChartRequired: boolean;
    isChartActive:any;
    answer: string;
    exchange_id: string;
    chart: string | null;
    thoughts: string | null;
    data_points: string[];
    error?: string;
    status: string;
    order_status: string;
    product_list:any,
    doctorlist:any,
    recommended_question:string[];
    appointmentlist:any,
    patientemail:any
    patientemailconfirm:boolean
    hospitallist:any,
    appointmentlimit:boolean
};

export type ChatTurn = {
    user: string;
    bot?: string
};

export type ChatRequest = {
    history: ChatTurn[];
    approach: Approaches;
    overrides?: AskRequestOverrides;
    temperature:string,
    token:string,
    language:string,
    userID:string,
    appointmentData:any
    patientemail:any
    patientemailconfirm:boolean,
    // latitude:any,
    // longitude:any,
    // userLocation:any,
};

      



export type feedbackRequest = {
    exchange_id: string;
    answer: string;
    reaction: string;
    additional_comments: string;
    comment_categories: string[];
};

export type exportPdfRequest = {
    queries: Array<any>[];
};

export type userInfoResponse = {
    user_id: string;
    error?: string;
    status: string;
};

export type ChartJSRequest = {
   data: object;
};

export type ChartJSResponse = {
    chart: string;
    chart_type: string;
    error?: string;
    status: string;
};

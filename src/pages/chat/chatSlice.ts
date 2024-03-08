
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'theme',
  initialState: {
    showHistory : false,
    answers : [],
    qnA : [],
    recommendedQuestions : [],
    latestQuestion : "",
    resetChat:false,
  },
  reducers: {
    set_history: (state,action:any) => {
      state.showHistory = action.payload ;
    },
    set_answers: (state,action:any) => {
        state.answers = action.payload
    },
    set_QnA: (state,action:any) => {
        state.qnA = action.payload
    },
    set_recommendedQnA: (state,action:any) => {
        state.recommendedQuestions = action.payload
    },
    set_latestQuestion : (state, action:any) => {
        state.latestQuestion = action.payload
    },
    resetChatList:(state,action:any)=>{
      state.resetChat=action.payload;
    }
  },
});

export const { set_history,set_answers,set_QnA,set_recommendedQnA,set_latestQuestion,resetChatList } = chatSlice.actions;
export default chatSlice.reducer;

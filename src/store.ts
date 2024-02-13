// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './pages/layout/layoutSlice';
import chatReducer from './pages/chat/chatSlice';

export const store = configureStore({
  reducer: {
    theme: colorReducer,
    chat: chatReducer
  },
});

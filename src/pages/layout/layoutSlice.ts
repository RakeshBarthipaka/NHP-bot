
import { createSlice } from '@reduxjs/toolkit';
import azureSpeakerVoiceList from "../../utils/azureSpeakerVoiceList";

const colorSlice = createSlice({
  name: 'theme',
  initialState: {
    //@ts-ignore
    color: JSON.parse(localStorage.getItem('color')) || {
      color: "Blue",
      colorCode: "#0027B0",
      class: "theme-blue"
    },
    avatar : azureSpeakerVoiceList[0]
  },
  reducers: {
    set_color: (state, action: any) => {
      state.color = action.payload;
    },
    set_avatar:(state,action : any) => {
      state.avatar = action.payload
    }
  },
});

export const { set_color,set_avatar } = colorSlice.actions;
export default colorSlice.reducer;

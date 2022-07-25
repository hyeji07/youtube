import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getVideoList = createAsyncThunk("GET_VIDEO_LIST", async (url) => {
  try {
    const res = await axios.get(url);
    return res.data.items;
  } catch (err) {
    console.log(err);
  }
});

export const getChannelInfo = createAsyncThunk(
  "GET_CHANNEL_LIST",
  async (url) => {
    try {
      const res = await axios.get(url);
      return res.data.items;
    } catch (err) {
      console.log(err);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState: {
    data: [],
    listLayout: "grid",
    loading: true /* npm React Spinners 라이브러리 사용으로 만든 변수*/,
    channel: "", //[]이것도 상관없음
  }, //initialState:초기값
  reducers: {
    videoListLayout: (state, action) => {
      state.listLayout = action.payload;
    },
  },
  extraReducers: (builder) => {
    /* npm React Spinners/.pending: 지정,들어오고있는지 판단 */
    builder.addCase(getVideoList.pending, (state, action) => {
      state.loading = true;
    });
    /*.fulfilled */
    builder.addCase(getVideoList.fulfilled, (state, action) => {
      /* console.log("액션페이로드", action.payload); */
      state.data = action.payload;
      state.loading = false;
    });
    /*.rejected*/
    builder.addCase(getVideoList.rejected, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getChannelInfo.fulfilled, (state, action) => {
      console.log("비디오채널정보", action.payload);
      state.channel = action.payload;
    });
  },
});

export const { videoListLayout } = videoSlice.actions;
export default videoSlice.reducer;

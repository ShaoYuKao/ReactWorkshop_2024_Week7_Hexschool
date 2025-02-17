import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 建立一個 message 的 slice
const messageSlice = createSlice({
  name: 'message', // slice 的名稱
  initialState: [], // 初始狀態為空陣列
  reducers: {
    // 建立訊息
    createMessage(state, action) {
      const { type, message } = action.payload;
      const newMessage = {
        type,
        title: getTitleByType(type), // 根據類型取得標題
        text: Array.isArray(message) ? message.join('、') : message, // 如果 message 是陣列，則用 '、' 連接
      };
      state.push(newMessage); // 將新訊息加入狀態
    },
    // 移除訊息
    removeMessage(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1); // 根據索引移除訊息
    },
  },
});

// 根據訊息類型取得標題的函式
function getTitleByType(type) {
  switch (type) {
    case MESSAGE_TYPES.SUCCESS:
      return '成功';
    case MESSAGE_TYPES.FAIL:
      return '失敗';
    case MESSAGE_TYPES.WARNING:
      return '警告';
    default:
      return '';
  }
}

// 建立一個異步訊息的 thunk
export const createAsyncMessage = createAsyncThunk(
  'message/createAsyncMessage',
  async (payload, { dispatch, requestId }) => {
    dispatch(messageSlice.actions.createMessage({
      ...payload,
      id: requestId, // 使用 requestId 作為訊息的 id
    }));

    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId)); // 2 秒後移除訊息
    }, 2000);
  },
);

// 訊息類型的常數
export const MESSAGE_TYPES = {
  SUCCESS: 'success',
  FAIL: 'fail',
  WARNING: 'warning',
};

export const { createMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;

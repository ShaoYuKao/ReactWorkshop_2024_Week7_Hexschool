import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: [],
  reducers: {
    createMessage(state, action) {
      switch (action.payload.type) {
        case actionType.success:
          state.push({
            type: 'success',
            title: '成功',
            text: action.payload.message,
          });
          break;
        case actionType.fail:
          state.push({
            type: 'danger',
            title: '失敗',
            text: Array.isArray(action.payload.message)
              ? action.payload.message.join('、')
              : action.payload.message,
          });
          break;
        case actionType.warning:
          state.push({
            type: 'warning',
            title: '警告',
            text: action.payload.message,
          });
          break;
        default:
          break;
      }
    },
    removeMessage(state, action) {
      const index = state.findIndex((item) => item === action.payload);
      state.splice(index, 1);
    },
  },
});

export const createAsyncMessage = createAsyncThunk(
  'message/createAsyncMessage',
  async (payload, { dispatch, requestId }) => {
    dispatch(messageSlice.actions.createMessage({
      ...payload,
      id: requestId,
    }));

    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId));
    }, 2000);
  },
);

export const actionType = {
  success: 'success',
  fail: 'fail',
  warning: 'warning',
};
export const { createMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;

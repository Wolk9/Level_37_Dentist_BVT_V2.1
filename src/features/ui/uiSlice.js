import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const uiAdapter = createEntityAdapter({});

const initialState = uiAdapter.getInitialState({
  editModalOpen: false,
  addModalOpen: false,
  userType: "assistants"
});

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setUserType: (state, action) => void (state.userType = action.payload),
    setEditModalOpen: (state, action) =>
      void (state.editModalOpen = action.payload),
    setAddModalOpen: (state, action) => {
      void (state.addModalOpen = action.payload);
    }
  },
  extraReducers: {}
});

export const { setUserType, setEditModalOpen, setAddModalOpen } =
  uiSlice.actions;

export default uiSlice.reducer;

import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const uiAdapter = createEntityAdapter({});

const initialState = uiAdapter.getInitialState({
  editModalOpen: false,
  addModalOpen: false,
  userType: "assistants",
  formValue: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    active: false,
    dob: ""
  }
});

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setUserType: (state, action) => void (state.userType = action.payload),
    setEditModalOpen: (state, action) =>
      void (state.editModalOpen = action.payload),
    setAddModalOpen: (state, action) =>
      void (state.addModalOpen = action.payload),
    setFormValue: (state, action) => {
      void (state.formValue = action.payload);
    }
  },
  extraReducers: {}
});

export const uiSelectors = uiAdapter.getSelectors((state) => state.ui);

export const { setUserType, setEditModalOpen, setAddModalOpen, setFormValue } =
  uiSlice.actions;

export default uiSlice.reducer;

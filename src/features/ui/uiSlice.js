import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const uiAdapter = createEntityAdapter({});

const initialState = uiAdapter.getInitialState({
  editModalOpen: false,
  addModalOpen: false,
  userType: "clients",
  page: 0,
  rowsPerPage: 10,
  order: "asc",
  orderBy: "last_name",
  selected: [],
  formValue: { availability: true, gender: "male", phone: "+31" },
  formError: {}
});

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setOrder: (state, action) => void (state.order = action.payload),
    setSelected: (state, action) => void (state.selected = action.payload),
    setOrderBy: (state, action) => void (state.orderBy = action.payload),
    setPage: (state, action) => void (state.page = action.payload),
    setRowsPerPage: (state, action) =>
      void (state.rowsPerPage = action.payload),

    setUserType: (state, action) => void (state.userType = action.payload),
    setEditModalOpen: (state, action) =>
      void (state.editModalOpen = action.payload),
    setAddModalOpen: (state, action) =>
      void (state.addModalOpen = action.payload),
    setFormError: (state, action) => {
      console.log("error", action.payload);
      state.formError = action.payload;
    },
    setFormValue: (state, action) => {
      console.log("form", action.payload);
      state.formValue = action.payload;
    },
    extraReducers: {}
  }
});

export const uiSelectors = uiAdapter.getSelectors((state) => state.ui);

export const {
  setUserType,
  setPage,
  setRowsPerPage,
  setOrder,
  setOrderBy,
  setSelected,
  setEditModalOpen,
  setAddModalOpen,
  setFormValue,
  setFormError
} = uiSlice.actions;

export default uiSlice.reducer;

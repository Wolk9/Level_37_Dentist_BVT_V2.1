import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const uiAdapter = createEntityAdapter({});

const initialState = uiAdapter.getInitialState({
  edit: false,
  formError: {},
  formValue: {
    id: undefined,
    availability: true,
    gender: "male",
    phone: "+31",
    first_name: "",
    last_name: "",
    email: "",
    dob: ""
  },
  page: 0,
  order: "asc",
  orderBy: "last_name",
  rowsPerPage: 10,
  selected: [],
  userModalOpen: false,
  userType: "clients"
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
    setUserModalOpen: (state, action) =>
      void (state.userModalOpen = action.payload),
    setEdit: (state, action) => void (state.edit = action.payload),
    setFormError: (state, action) => {
      console.log("formError", action.payload);
      state.formError = action.payload;
    },
    setFormValue: (state, action) => {
      console.log("formValue", action.payload);
      state.formValue = action.payload;
    },
    resetFormValue: (state) => {
      console.log("reset");
      return { ...state, formValue: initialState.formValue };
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
  setUserModalOpen,
  setEdit,
  setFormValue,
  resetFormValue,
  setFormError
} = uiSlice.actions;

export default uiSlice.reducer;

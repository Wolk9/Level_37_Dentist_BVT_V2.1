import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const apptAdapter = createEntityAdapter({
  selectId: (appt) => appt.id,
  sortComparer: (a, b) => a.date.compareTo(b.date)
});

export const apptSlice = createSlice({
  name: "appt",
  initialState: apptAdapter.getInitialState(),
  reducers: {
    addAppt: (state) => {
      state.value += 1;
    },
    removeAppt: (state) => {
      state.value -= 1;
    }
  }
});

export const { addAppt, removeAppt } = apptSlice.actions;
export default apptSlice.reducer;

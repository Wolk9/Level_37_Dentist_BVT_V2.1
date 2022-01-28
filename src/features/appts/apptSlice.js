import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";

const URL = "http://localhost:3002/";

export const fetchAppts = createAsyncThunk("users/fetchAppts", async () => {
  const appts = await fetch(URL + "appts").then((res) => res.json());
  return { appts };
});

const apptAdapter = createEntityAdapter({
  selectId: (appt) => appt.id,
  sortComparer: (a, b) => a.date.compareTo(b.date)
});

const initialState = apptAdapter.getInitialState({
  loading: false,
  appts: apptAdapter.getInitialState()
});

export const apptSlice = createSlice({
  name: "appt",
  initialState: initialState,
  reducers: {
    addAppt: (state, action) => {},
    removeAppt: (state) => {
      state.value -= 1;
    }
  },
  extraReducers: {
    [fetchAppts.pending](state) {
      state.loading = true;
    },
    [fetchAppts.fulfilled](state, { payload }) {
      state.loading = false;
      apptAdapter.setAll(state.appts, payload.appts);
    },
    [fetchAppts.rejected](state) {
      state.loading = false;
    }
  }
});

export const { addAppt, removeAppt } = apptSlice.actions;
export default apptSlice.reducer;

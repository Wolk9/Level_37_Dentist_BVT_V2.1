import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";

const URL = "http://localhost:3002/";

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  await sleep(20);
  const dentists = await fetch(URL + "dentists").then((res) => res.json());
  const assistants = await fetch(URL + "assistants").then((res) => res.json());
  const clients = await fetch(URL + "clients").then((res) => res.json());
  console.log({ dentists, assistants, clients });
  return { dentists, assistants, clients };
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id, userType }) => {
    console.log(id, userType);
    await fetch(URL + userType + `/` + id, {
      method: "DELETE"
    });
    return id;
  }
);

//selectId: (user) => user.id
// sortComparer: (a, b) => a.last_name.localCompare(b.last_name)

const userAdapter = createEntityAdapter({});

const clientsAdapter = createEntityAdapter({});

const assistantsAdapter = createEntityAdapter({});

const dentistsAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState({
  loading: false,
  userType: "assistants",
  modalOpen: false,
  assistants: assistantsAdapter.getInitialState(),
  dentists: dentistsAdapter.getInitialState(),
  clients: clientsAdapter.getInitialState()
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setModalOpen: (state, action) => void (state.modalOpen = action.payload),
    setUserType: (state, action) => void (state.userType = action.payload)
  },
  extraReducers: {
    [fetchUsers.pending](state) {
      state.loading = true;
    },
    [fetchUsers.fulfilled](state, { payload }) {
      console.log(payload);
      state.loading = false;
      dentistsAdapter.setAll(state.dentists, payload.dentists);
      assistantsAdapter.setAll(state.assistants, payload.assistants);
      clientsAdapter.setAll(state.clients, payload.clients);
    },
    [fetchUsers.rejected](state) {
      state.loading = false;
    },
    [deleteUser.rejected](state) {
      state.loading = false;
    },
    [deleteUser.pending](state) {
      state.loading = true;
    },
    [deleteUser.fulfilled](state, { payload }) {
      state.loading = false;
      console.log(payload);
      dentistsAdapter.removeOne(state, payload.id);
      assistantsAdapter.removeOne(state, payload.id);
      clientsAdapter.removeOne(state, payload.id);
    }
  }
});

export const dentistsSelectors = userAdapter.getSelectors(
  (state) => state.users.dentists
);
export const assistantsSelectors = userAdapter.getSelectors(
  (state) => state.users.assistants
);
export const clientsSelectors = userAdapter.getSelectors(
  (state) => state.users.clients
);

export const { setModalOpen, setUserType } = userSlice.actions;
export default userSlice.reducer;

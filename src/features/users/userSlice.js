import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  current
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
    return { id, userType };
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ userType, formValue }) => {
    console.log(formValue, formValue.first_name);
    await fetch(URL + userType, {
      method: "POST",
      body: formValue,
      redirect: "follow"
    });
    return { userType, id: formValue.id, changes: formValue };
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

  assistants: assistantsAdapter.getInitialState(),
  dentists: dentistsAdapter.getInitialState(),
  clients: clientsAdapter.getInitialState()
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action) => void (state.loading = action.payload),
    addUser: assistantsAdapter.addOne
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
      console.log(current(state), payload);
      dentistsAdapter.removeOne(state.dentists, payload.id);
      assistantsAdapter.removeOne(state.assistants, payload.id);
      clientsAdapter.removeOne(state.clients, payload.id);
    }
    // [addUser.pending](state) {
    //   state.loading = true;
    // },
    // [addUser.fulfilled](state, { payload }) {
    //   state.loading = false;
    //   console.log(payload.userType, payload, payload.id, payload.changes);
    //   switch (payload.userType) {
    //     case "clients":
    //       clientsAdapter.upsertOne(state.clients, {
    //         id: payload.id,
    //         changes: payload.changes
    //       });
    //       break;
    //     case "assistants":
    //       console.log(state.assistants, payload.changes);
    //       assistantsAdapter.upsertOne(state.assistants, {
    //         id: payload.id,
    //         changes: payload.changes
    //       });
    //       break;
    //     case "dentists":
    //       dentistsAdapter.upsertOne(state.dentists, {
    //         id: payload.id,
    //         changes: payload.changes
    //       });
    //       break;
    //     default:
    //       break;
    //   }
    // }
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

export const { setLoading, addClient, addAssistant, addDentist } =
  userSlice.actions;
export default userSlice.reducer;

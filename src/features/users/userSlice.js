import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  current
} from "@reduxjs/toolkit";

const URL = "http://localhost:3002/";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const dentists = await fetch(URL + "dentists").then((res) => res.json());
  const assistants = await fetch(URL + "assistants").then((res) => res.json());
  const clients = await fetch(URL + "clients").then((res) => res.json());
  return { dentists, assistants, clients };
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (props) => {
    const { selectedIds, userType } = props;
    console.log(selectedIds, userType);
    selectedIds.forEach(
      async (id) =>
        await fetch(URL + userType + `/` + id, {
          method: "DELETE"
        })
    );
    return props;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userType, id, changes }) => {
    console.log(id, userType, changes);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(changes);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    await fetch(URL + userType + "/" + id, requestOptions); // id.forEach(

    return { id, changes, userType };
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ formValue, userType }) => {
    console.log(formValue);
    console.log(formValue.first_name);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formValue);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    await fetch(URL + userType, requestOptions);

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
  deleting: false,
  assistants: assistantsAdapter.getInitialState(),
  dentists: dentistsAdapter.getInitialState(),
  clients: clientsAdapter.getInitialState()
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action) => void (state.loading = action.payload),
    setDeleting: (state, action) => void (state.deleting = action.payload)
  },
  extraReducers: {
    [fetchUsers.pending](state) {
      state.loading = true;
    },
    [fetchUsers.fulfilled](state, { payload }) {
      state.loading = false;
      dentistsAdapter.setAll(state.dentists, payload.dentists);
      assistantsAdapter.setAll(state.assistants, payload.assistants);
      clientsAdapter.setAll(state.clients, payload.clients);
    },
    [fetchUsers.rejected](state) {
      state.loading = false;
    },

    [deleteUser.pending](state) {
      state.loading = true;
      state.deleting = true;
    },
    [deleteUser.fulfilled](state, { payload }) {
      state.loading = false;
      console.log(current(state), payload);
      dentistsAdapter.removeMany(state.dentists, payload.selectedIds);
      assistantsAdapter.removeMany(state.assistants, payload.selectedIds);
      clientsAdapter.removeMany(state.clients, payload.selectedIds);
    },
    [deleteUser.rejected](state) {
      state.loading = false;
      state.deleting = false;
    },
    [addUser.pending](state) {
      state.loading = true;
    },
    [addUser.fulfilled](state, { payload }) {
      state.loading = false;
      console.log(payload.userType);
      console.log(payload);
      console.log(payload.id);
      console.log(payload.changes);
      switch (payload.userType) {
        case "clients":
          clientsAdapter.addOne(state.clients, payload.changes);
          break;
        case "assistants":
          assistantsAdapter.addOne(state.assistants, payload.changes);
          break;
        case "dentists":
          dentistsAdapter.addOne(state.dentists, payload.changes);
          break;
        default:
          break;
      }
    },
    [addUser.rejected](state) {
      state.loading = false;
    },
    [updateUser.pending](state) {
      state.loading = true;
    },
    [updateUser.fulfilled](state, { payload }) {
      state.loading = false;
      const { changes, id, userType } = payload;
      switch (userType) {
        case "clients":
          console.log("clients");
          clientsAdapter.updateOne(state.clients, {
            id: id,
            changes: changes
          });
          break;
        case "assistants":
          console.log("assistants");
          assistantsAdapter.updateOne(state.assistants, {
            id: id,
            changes: changes
          });
          break;
        case "dentists":
          console.log("dentists");
          dentistsAdapter.updateOne(state.dentists, {
            id: id,
            changes: changes
          });
          break;
        default:
          break;
      }
    },
    [updateUser.rejected](state) {
      state.loading = false;
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

export const { setLoading, setDeleting } = userSlice.actions;
export default userSlice.reducer;

import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";

const URL = "http://localhost:3002/";

export const fetchUsers = createAsyncThunk(
  "users/dentists/fetchUsers",
  async () => {
    const dentists = await fetch(URL + "dentists").then((res) => res.json());
    const assistants = await fetch(URL + "assistants").then((res) =>
      res.json()
    );
    const clients = await fetch(URL + "clients").then((res) => res.json());
    console.log({ dentists, assistants, clients });
    return { dentists, assistants, clients };
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
  userType: "clients",
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
    setUserType: (state, action) => void (state.userType = action.payload),
    addUser: (state, action) => void state.push(action.payload),
    removeUser: (state, action) => {
      const { id } = action.payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) {
        return state.filter((user) => user.id != id);
      }
    },
    editUser: (state, action) => {
      const { id, first_name, last_name, email, gender, active } =
        action.payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) {
        existingUser.first_name = first_name;
        existingUser.last_name = last_name;
        existingUser.email = email;
        existingUser.gender = gender;
        existingUser.active = active;
      }
    }
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

export const { setModalOpen, setUserType, addUser, removeUser, editUser } =
  userSlice.actions;
export default userSlice.reducer;

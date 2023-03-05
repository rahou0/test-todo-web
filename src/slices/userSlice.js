import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const initialState = { id: null, email: null };

export const userSlice = createSlice({
  name: "user",
  initialState: { user: initialState },
  reducers: {
    initUser(state, action) {
      state.user = action?.payload?.user ?? initialState;
    },
  },
});
export const { initUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        query() {
          return `/authentification`;
        },
      }),
    };
  },
});

export default userSlice.reducer;

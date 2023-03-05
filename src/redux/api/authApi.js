import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndpoints } from "../../config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: `${apiEndpoints.baseUrl}`,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(email) {
        return {
          url: `${apiEndpoints.auth.registerUser}`,
          method: "POST",
          body: { email },
        };
      },
    }),
    loginUser: builder.mutation({
      query(email) {
        return `${apiEndpoints.auth.loginUser}?email=${email}`;
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;

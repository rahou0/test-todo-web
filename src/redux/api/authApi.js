import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { apiEndpoints } from "../../config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiEndpoints.baseUrl}`,
  }),
  endpoints: (builder) => ({
    // Send the register request
    registerUser: builder.mutation({
      query(email) {
        return {
          url: `${apiEndpoints.auth.registerUser}`,
          method: "POST",
          body: { email },
        };
      },
    }),
    // Send the login request
    loginUser: builder.mutation({
      query: (email) => ({
        url: `${apiEndpoints.auth.loginUser}?email=${email}`,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;

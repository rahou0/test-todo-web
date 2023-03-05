import React, { useEffect } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../redux/api/authApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Typography, Paper, TextField } from "@mui/material";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Container = styled(Paper)`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
`;

const Title = styled(Typography)``;
function LoginForm() {
  const [cookies, setCookie] = useCookies(["logged_in"]);
  const [loginUser, { isLoading, data, isSuccess }] = useLoginUserMutation();

  const [
    registerUser,
    {
      isLoading: isLoadingRegistration,
      data: dataRegister,
      isSuccess: isSuccessRegister,
    },
  ] = useRegisterUserMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      loginUser(values.email);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      if (data[0]) {
        setCookie("logged_in", JSON.stringify(data[0]));
        formik.resetForm();
        toast.success("You successfully logged in");
      } else {
        registerUser(formik.values.email);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSuccessRegister) {
      if (dataRegister) {
        setCookie("logged_in", JSON.stringify(dataRegister));
        formik.resetForm();
        toast.success("You successfully registred and logged in");
      } else {
        toast.error("Failed to register a user");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingRegistration]);
  return (
    <Container>
      <Title variant="h3" component="h3">
        Login
      </Title>
      <TextField
        sx={{ minWidth: "300px" }}
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="Email"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        disabled={isLoading || isLoadingRegistration}
        required
        value={formik.values.email}
        placeholder="test@test.com"
      />
      <Button
        sx={{ minHeight: "45px" }}
        color="primary"
        disabled={isLoading || isLoadingRegistration}
        onClick={() => {
          formik.handleSubmit();
        }}
        fullWidth
        variant="contained"
      >
        Login
      </Button>
    </Container>
  );
}

export default LoginForm;

import React, { useEffect } from "react";
import { useLoginUserMutation } from "../../../redux/api/authApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import AuthCard from "../AuthCard";
import { show_notification } from "../../../utils/notificationHelper";

function LoginCard() {
  const [cookies, setCookie] = useCookies(["logged_in"]);
  const [loginUser, { isLoading, data, isSuccess }] = useLoginUserMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      // Send a login request
      loginUser(values.email);
    },
  });
  useEffect(() => {
    // if the email exisit then save the email + id in a cookie
    if (isSuccess) {
      if (data[0]) {
        setCookie("logged_in", JSON.stringify(data[0]));
        formik.resetForm();
        show_notification("You successfully logged in");
      } else {
        //otherwise show an error message
        show_notification("You dont have an account!", "error");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <AuthCard
      buttonText="Login"
      title="Welcome Back 👋"
      formik={formik}
      isLoading={isLoading}
    />
  );
}

export default LoginCard;

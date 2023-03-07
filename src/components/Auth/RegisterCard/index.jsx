import React, { useEffect } from "react";
import { useRegisterUserMutation } from "../../../redux/api/authApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import AuthCard from "../AuthCard";
import { show_notification } from "../../../utils/notificationHelper";

function RegisterCard() {
  const [cookies, setCookie] = useCookies(["logged_in"]);

  const [registerUser, { isLoading, data, isSuccess }] =
    useRegisterUserMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      registerUser(values.email);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        setCookie("logged_in", JSON.stringify(data));
        formik.resetForm();
        show_notification("You successfully registred and logged in");
      } else {
        show_notification("Failed to register");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <AuthCard
      buttonText="Register"
      title="Sign Up to Todos"
      formik={formik}
      isLoading={isLoading}
    />
  );
}

export default RegisterCard;

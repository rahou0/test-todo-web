import React, { useState } from "react";
import { Tabs, Tab, Paper } from "@mui/material";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button, Typography, TextField } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

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

const InnerContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 100%;
  box-sizing: border-box;
`;

function getActiveIndexFromPath(path) {
  if (path?.includes("/register")) return 1;
  return 0;
}
function AuthCard({ buttonText, title, formik, isLoading }) {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(
    getActiveIndexFromPath(history?.location?.pathname)
  );
  const handleChange = (event, newIndex) => {
    if (newIndex === activeIndex) return;
    setActiveIndex(newIndex);
    history.push({ pathname: newIndex === 0 ? "/login" : "/register" });
  };

  return (
    <Container>
      <Tabs
        value={activeIndex}
        onChange={handleChange}
        variant="fullWidth"
        sx={{ width: "100%" }}
      >
        <Tab label="Sign In" />
        <Tab label="Signup" />
      </Tabs>
      <AnimatePresence mode="wait">
        <InnerContainer
          key={activeIndex}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h4" textAlign="center">
            {title}
          </Typography>
          <TextField
            sx={{ sx: { minWidth: "300px" }, md: "100%" }}
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email"
            name="email"
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            disabled={isLoading}
            required
            value={formik.values.email}
            placeholder="test@test.com"
          />
          <Button
            sx={{ minHeight: "45px", color: "white" }}
            color="primary"
            disabled={isLoading}
            onClick={() => {
              formik.handleSubmit();
            }}
            fullWidth
            variant="contained"
          >
            {buttonText}
          </Button>
        </InnerContainer>
      </AnimatePresence>
    </Container>
  );
}

export default AuthCard;

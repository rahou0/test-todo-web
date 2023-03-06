import React, { useState } from "react";
import { Tabs, Tab, Paper } from "@mui/material";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
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

function getActiveIndexFromPath(path) {
  if (path?.includes("/register")) return 1;
  return 0;
}
function AuthCard({ children }) {
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
      {children}
    </Container>
  );
}

export default AuthCard;

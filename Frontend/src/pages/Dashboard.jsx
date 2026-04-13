import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    else if (user.role === "seller") navigate("/seller");
    else if (user.role === "admin") navigate("/admin");
    else navigate("/orders");
  }, []);

  return null;
}

export default Dashboard;

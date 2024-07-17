import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";


const AdminRoutes = () => {
  const [ok, setOk] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
        const res = await axios.get(
          `/api/v1/auth/admin-auth`,
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        console.log("Admin auth response:", res.data);

        if (res.data.ok) {
          console.log("Admin auth successful");
          // Add a small delay before setting the state
          setTimeout(() => setOk(true), 100);
        } else {
          console.log("Admin auth failed");
          setOk(false);
        }
      } 

    if (auth?.token) {
      authCheck();
    } else {
      console.log("No auth token found");
      setOk(false);
    }
  }, [auth?.token]);

  console.log("Current 'ok' state:", ok);

  if (ok === null) {
    return <Spinner/>;
  }

  return ok ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoutes;

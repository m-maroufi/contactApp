import React, { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const RequireAuth = () => {
	const { user } = useAuth();
	const [isLoggined, setIsLoggined] = useState(false);
	return <>{user?.role =="user" ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default RequireAuth;

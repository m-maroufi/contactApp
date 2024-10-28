import React, { useContext } from "react";
import { userContext } from "../context/AuthProvider";

const useAuth = () => {
	return useContext(userContext);
};

export default useAuth;

import React, { useContext, useEffect, useState, createContext } from "react";
import { json, useLocation } from "react-router-dom";
export const userContext = createContext();
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(
		localStorage.getItem("user")
			? JSON.parse(localStorage.getItem("user"))
			: null,
	);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		}
	}, [user]);

	return (
		<userContext.Provider value={{ user, setUser, loading }}>
			{children}
		</userContext.Provider>
	);
};

export default AuthProvider;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import RequireAuth from "./components/require/requireAuth.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<BrowserRouter basename={import.meta.env.BASE_URL}>
				<Routes>
					<Route element={<RequireAuth />}>
						<Route path="/" element={<App />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>,
);

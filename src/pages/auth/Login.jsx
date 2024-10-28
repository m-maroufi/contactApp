import React, { useState } from "react";
import "./auth.css";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaLock } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { AX_instance } from "../../api/API";
import useAuth from "../../hooks/useAuth";
const Login = () => {
	const navigate = useNavigate();
	const { user, setUser } = useAuth();

	if (user) {
		return <Navigate to={"/"} replace={true} />;
	}

	const form = useForm();
	const [isPending, setIsPending] = useState(false);
	const {
		register,
		handleSubmit,
		control,
		setError,
		formState: { errors, submitCount },
	} = form;

	const onSubmitHandler = async data => {
		setIsPending(true);
		AX_instance.get(`/users?phone=${data.phone}`)
			.then(res => {
				if (res.status == 200) {
					if (res.data.length > 0) {
						if (res.data[0].password === data.password) {
							setUser(res.data[0]);
							setIsPending(false);
							return navigate("/", { replace: true });
						}
						setError("password", {
							type: "validate",
							message: "اطلاعات وارد شده صحیح  نمی باشد.",
						});
						setIsPending(false);
						return;
					}
					setError("phone", {
						type: "validate",
						message: "شماره تلفن یافت نشد .",
					});
					setIsPending(false);
				}
			})
			.catch(error => {
				console.log(error);
				setError("root", {
					type: "validate",
					message: "خطایی رخ داده است",
				});
			});
	};

	return (
		<div className="authWrapper">
			<div className="loginFormWrapper">
				<div className="titleLogin">
					<h1 className="">
						خـــوش برگشتیــــد{" "}
						<img
							width="40"
							height="40"
							src={import.meta.env.BASE_URL + "images/face.png"}
							alt="saluting-face-emoji"
						/>
					</h1>
					<p>برای ورود اطلاعات خود را وارد کنید</p>
				</div>
				<form
					noValidate
					action=""
					className="loginForm"
					onSubmit={handleSubmit(onSubmitHandler)}>
					<div className="form-group">
						<label htmlFor="phone">
							<IoIosPhonePortrait className="labelIcon" size={30} />
						</label>
						<input
							tabIndex={1}
							type="text"
							className="form-control"
							id="phone"
							placeholder="شماره تلفن"
							{...register("phone", {
								required: "شماره تلفن الزامیست",
								pattern: {
									value:
										/^09(1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{7}$/,
									message: "شماره تلفن باید 11 رقم باشد و با 09 شروع شود",
								},
								maxLength: {
									value: 11,
									message: "شماره تلفن معتبر نیست",
								},
							})}
						/>
					</div>
					<div className="errorMsgForm">{errors.phone?.message}</div>
					<div className="form-group">
						<label htmlFor="password">
							<IoLockClosedOutline className="labelIcon" size={30} />
						</label>
						<input
							tabIndex={2}
							type="password"
							className="form-control"
							id="password"
							placeholder="کلمه عبور"
							autoComplete="off"
							{...register("password", {
								required: "کلمه عبور الزامیست",
							})}
						/>
					</div>
					<div className="errorMsgForm">{errors.password?.message}</div>
					<div className="form-group-btns">
						<button
							disabled={isPending}
							style={{
								backgroundColor: isPending ? "#ff8b00" : "#4CAF50",
								boxShadow: isPending ? "none" : "",
								cursor: isPending ? "progress" : "",
							}}>
							{isPending ? "لطفا صبر کنید ..." : " ورود به پنل"}
						</button>
					</div>
					<div>{errors.root?.message}</div>
				</form>
				{/* <DevTool control={control} /> */}
				<div className="linkWrapper">
					<Link>بازیابی کلمه عبور</Link>

					<Link to={"/register"}>ایجاد یک حساب جدید</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;

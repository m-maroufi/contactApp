import React from "react";
import "./auth.css";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { MdOutlineLockPerson } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { json, Link, Navigate, replace, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { AX_instance, sleep } from "../../api/API";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Register = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	if (user) {
		return <Navigate to={"/"} replace={true} />;
	}

	const [isPending, setIsPending] = useState(false);
	const [status, setStatus] = useState(false);

	const form = useForm();
	const {
		register,
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = form;

	const onSubmitHandler = async data => {
		const userData = {
			...data,
			role: "user",
			token: "",
			image: "",
			contacts: [],
			address: "",
			email: "",
		};
		setIsPending(true);
		AX_instance.get(`/users?phone=${userData.phone}`).then(res => {
			if (res.status == 200 && res.data.length) {
				setIsPending(false);
				console.log(res.data);

				setError("phone", {
					type: "validate",
					message: "شماره تلفن وارد شده قبلا ثبت نام شده است.",
				});
				return false;
			}
			if (res.status == 200 && !res.data.length) {
				AX_instance.post("/users", userData).then(res => {
					if (res.status == 201) {
						setStatus(true);
						setIsPending(false);
						setTimeout(() => {
							setStatus(false);
							navigate("/login", { replace: true });
						}, 3000);
					}
				});
			}
		});
	};

	return (
		<div className="authWrapper">
			<div className="loginFormWrapper">
				<div className="titleLogin">
					<h1 className="">پنل مدیریت مخاطبین</h1>
					<p>جهت ثبت نام اطلاعات خود را وارد کنید</p>
				</div>
				<form
					noValidate
					className="loginForm"
					onSubmit={handleSubmit(onSubmitHandler)}>
					<div className="form-group">
						<label htmlFor="first_name">
							<RiUserStarLine className="labelIcon" size={24} />
						</label>
						<input
							tabIndex={1}
							type="text"
							className="form-control"
							id="first_name"
							placeholder="نام شما"
							{...register("first_name", {
								required: "نام الزامی است",
								minLength: {
									value: 2,
									message: "نام حداقل 2 کارکتر دارد",
								},
								maxLength: {
									value: 32,
									message: "نام معتبر نیست",
								},
							})}
						/>
					</div>
					<div className="errorMsgForm">{errors.first_name?.message}</div>

					<div className="form-group">
						<label htmlFor="last_name">
							<MdOutlineFamilyRestroom className="labelIcon" size={24} />
						</label>
						<input
							tabIndex={2}
							type="last_name"
							className="form-control"
							id="last_name"
							placeholder="نام خانوادگی"
							{...register("last_name", {
								required: "نام خانوادگی الزامیست",
								minLength: {
									value: 2,
									message: "فامیلی حداقل 2 کارکتر دارد",
								},
								maxLength: {
									value: 32,
									message: "نام خانوادگی معتبر نیست",
								},
							})}
						/>
					</div>
					<div className="errorMsgForm">{errors.last_name?.message}</div>
					<div className="form-group">
						<label htmlFor="phone">
							<MdOutlinePhoneIphone className="labelIcon" size={24} />
						</label>
						<input
							tabIndex={2}
							type="text"
							className="form-control"
							id="phone"
							placeholder="شماره موبایل"
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
							<MdOutlineLockPerson className="labelIcon" size={24} />
						</label>
						<input
							tabIndex={2}
							type="password"
							className="form-control"
							id="password"
							placeholder="کلمه عبور"
							{...register("password", {
								required: "کلمه عبور الزامیست",
								minLength: {
									value: 5,
									message: "پسورد نمیتواند کمتر از 5 کارکتر باشد.",
								},
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
								fontSize: status ? "13px" : "",
							}}>
							{isPending
								? "لطفا صبر کنید ..."
								: status
								? "انجام شد ،انتقال به صفحه ورود..."
								: "ثبت نام در پنل"}
						</button>
					</div>
					<div>{errors.root?.message}</div>
				</form>
				{/* <DevTool control={control} /> set up the dev tool */}
				<div className="linkWrapper">
					<Link>بازیابی کلمه عبور</Link>
					<Link to={"/login"}>ورود به حساب</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;

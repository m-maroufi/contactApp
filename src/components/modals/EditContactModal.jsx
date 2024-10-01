import React, { useContext, useState, useEffect } from "react";
import { contactContext } from "../../context/ContactProvider";
import { getAvatars } from "../../api/API";
import { validateEmail, validatePhoneNumber } from "../../helper/function";
const EditContactModal = () => {
	const {
		editModal,
		editContact,
		avatars,
		setEditContact,
		setEditModal,
		updateContact,
		loading,
		SetLoading,
	} = useContext(contactContext);
	const [avatar, setAvater] = useState();
	const [editData, setEditData] = useState();
	const [showAvatarBox, setShowAvatarBox] = useState(false);
	const [err, setErr] = useState({
		errName: null,
		errEmail: null,
		errPhone: null,
		errJob: null,
		formErr: null,
	});

	// show avatar box handler
	const showAvatarBoxHandler = () => {
		setShowAvatarBox(!showAvatarBox);
	};
	// avatar handler

	const edithandleAvatarChange = e => {
		const src = e.target.src;
		setAvater(src);
		setShowAvatarBox(false);
	};

	const onchangEditHandler = e => {
		let { name, value } = e.target;
		switch (name) {
			case "fullName":
				if (value.trim().length > 5) {
					setEditData(prevState => ({
						...prevState,
						fullName: value,
					}));
					setErr({
						...err,
						errName: null,
					});
				} else {
					setErr({
						...err,
						errName: "نام و نام خانوادگی بزرگتر از 5 کارکتر باشد",
					});
					setEditData(prevState => ({ ...prevState, fullName: value }));
				}
				break;
			case "phone":
				if (validatePhoneNumber(value)) {
					setEditData(prevState => ({ ...prevState, phone: value }));
					setErr({
						...err,
						errPhone: null,
					});
				} else {
					setErr({
						...err,
						errPhone: "شماره تلفن 11 رقمی بصورت صحیح وارد کنید",
					});
					setEditData(prevState => ({ ...prevState, phone: value }));
				}
				break;
			case "job":
				if (value.length >= 2) {
					setEditData(prevState => ({ ...prevState, job: value }));
					setErr({
						...err,
						errJob: null,
					});
				} else {
					setErr({
						...err,
						errJob: "شغل / نسبت مخاطب را وارد کنید",
					});
					setEditData(prevState => ({ ...prevState, job: value }));
				}
				break;
			case "email":
				if (validateEmail(value)) {
					setEditData(prevState => ({ ...prevState, email: value }));
					setErr({
						...err,
						errEmail: null,
					});
				} else {
					setErr({
						...err,
						errEmail: "پست الکترونیکی را صحیح وارد کنید",
					});
					setEditData(prevState => ({ ...prevState, email: value }));
				}
				break;
			default:
				break;
		}
	};

	const onSubmitEditHandler = async e => {
		e.preventDefault();
		if (
			editContact.fullName == "" ||
			err.errName ||
			editContact.email == "" ||
			err.errEmail ||
			editContact.job == "" ||
			err.errJob ||
			editContact.phone == "" ||
			err.errPhone
		) {
			setErr({
				...err,
				formErr: " *** فیلد ها را پر و خطا ها را برطرف کنید  ***",
			});
		} else {
			setErr({
				...err,
				formErr: null,
			});
			SetLoading(true);
			const newData = {
				...editData,
				image: avatar,
			};
			e.target.reset();
			setAvater(editContact?.image);
			setEditContact({});
			setErr({
				errName: null,
				errEmail: null,
				errPhone: null,
				errJob: null,
				formErr: null,
			});
			const res = await updateContact(newData);
			SetLoading(false);
			setEditModal(false);
		}
	};

	const closeForm = e => {
		e.preventDefault();
		setEditModal(false);
	};

	useEffect(() => {
		if (editContact.id) {
			setEditData(editContact);
			setAvater(editContact?.image);
		}
	}, [editContact]);

	return (
		<div className={`addContactForm editForms ${editModal ? "show" : ""}`}>
			<div className={`formWrapper ${editModal ? "show" : ""}`}>
				<div className="formTitle">
					<h3>ویرایش مخاطب</h3>
					<p>جهت ویرایش مخاطب فیلد های مورد نظر را ویرایش کنید</p>
				</div>
				<form
					className={`addForm ${
						loading
							? "opacity-50 select-none pointer-events-none"
							: "opacity-100 select-auto pointer-events-auto "
					}`}
					onSubmit={e => onSubmitEditHandler(e)}>
					<div className="avatarField">
						<div className="avatar">
							<img
								alt="avatar"
								src={avatar}
								onClick={e => showAvatarBoxHandler(e)}
							/>
							<label onClick={e => showAvatarBoxHandler(e)}>تغییر آواتار</label>
						</div>
					</div>
					<div className="formField">
						<label htmlFor="fullNameEdit"> نام و نام خانوادگی</label>
						<input
							type="text"
							id="fullNameEdit"
							name="fullName"
							value={editData?.fullName}
							onChange={e => onchangEditHandler(e)}
						/>
						{err.errName && <span className="error">{err.errName}</span>}
					</div>
					<div className="formField">
						<label htmlFor="phoneEdit">شماره تلفن</label>
						<input
							type="text"
							id="phoneEdit"
							name="phone"
							maxLength={11}
							value={editData?.phone}
							onChange={e => onchangEditHandler(e)}
						/>
						{err.errPhone && <span className="error">{err.errPhone}</span>}
					</div>
					<div className="formField">
						<label htmlFor="jobEdit">شغل/ نسبت</label>
						<input
							type="text"
							id="jobEdit"
							name="job"
							value={editData?.job}
							onChange={e => onchangEditHandler(e)}
						/>
						{err.errJob && <span className="error">{err.errJob}</span>}
					</div>
					<div className="formField">
						<label htmlFor="emailEdit">پست الکترونیکی</label>
						<input
							type="text"
							id="emailEdit"
							name="email"
							value={editData?.email}
							onChange={e => onchangEditHandler(e)}
						/>
						{err.errEmail && <span className="error">{err.errEmail}</span>}
					</div>

					<div className="btnField">
						<div className="btns">
							<button
								type="submit"
								className={`btn  ${
									loading ? "!text-white !bg-slate-900" : "primary"
								}`}
								disabled={loading}>
								{loading ? "در حال پردازش ..." : "ویـــرایــش مخاطــــب"}
							</button>

							<button type="button" className="btn" onClick={e => closeForm(e)}>
								انـــصــرافـــ
							</button>
						</div>
						{err.formErr && <span className="error">{err.formErr}</span>}
					</div>
				</form>
				<div className={`avatarBox ${showAvatarBox ? "show" : ""}`}>
					{avatars.map((pic, index) => (
						<img
							src={pic.image}
							key={pic.id}
							onClick={e => edithandleAvatarChange(e)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default EditContactModal;

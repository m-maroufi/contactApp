import React, { useContext, useEffect, useState } from "react";
import { contactContext } from "../../context/ContactProvider";
import { createNewContact, getAllContact, getAvatars } from "../../api/API";
import { validateEmail, validatePhoneNumber } from "../../helper/function";
const CreateNewContactModal = () => {
	const { showForm, setShowForm, contacts, setContacts, SetLoading } =
		useContext(contactContext);
	const [avatars, setAvatars] = useState([]);
	const [avatar, setAvater] = useState("");
	const [showAvatarBox, setShowAvatarBox] = useState(false);

	const [newcontact, setNewContact] = useState({
		fullName: "",
		email: "",
		phone: "",
		job: "",
		image: "",
	});
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
	// input validetion and change event handler
	const onchangeHandler = e => {
		let { name, value } = e.target;
		switch (name) {
			case "fullName":
				if (value.length > 5) {
					setNewContact({ ...newcontact, fullName: value });
					setErr({
						...err,
						errName: null,
					});
				} else {
					setErr({
						...err,
						errName: "نام و نام خانوادگی بزرگتر از 5 کارکتر باشد",
					});
					setNewContact({ ...newcontact, fullName: value });
				}
				break;
			case "phone":
				value = value.trim();
				if (validatePhoneNumber(value)) {
					setNewContact({ ...newcontact, phone: value });
					setErr({
						...err,
						errPhone: null,
					});
				} else {
					setErr({
						...err,
						errPhone: "شماره تلفن 11 رقمی بصورت صحیح وارد کنید",
					});
					setNewContact({ ...newcontact, phone: value });
				}
				break;
			case "job":
				if (value.length >= 2) {
					setNewContact({ ...newcontact, job: value });
					setErr({
						...err,
						errJob: null,
					});
				} else {
					setErr({
						...err,
						errJob: "شغل / نسبت مخاطب را وارد کنید",
					});
					setNewContact({ ...newcontact, job: value });
				}
				break;
			case "email":
				value = value.trim();
				if (validateEmail(value)) {
					setNewContact({ ...newcontact, email: value });
					setErr({
						...err,
						errEmail: null,
					});
				} else {
					setErr({
						...err,
						errEmail: "پست الکترونیکی را صحیح وارد کنید",
					});
					setNewContact({ ...newcontact, email: value });
				}
				break;
			default:
				break;
		}
	};
	// on submiting form handler
	const onSubmitHandler = async e => {
		e.preventDefault();
		SetLoading(true);
		if (
			newcontact.fullName == "" ||
			err.errName ||
			newcontact.email == "" ||
			err.errEmail ||
			newcontact.job == "" ||
			err.errJob ||
			newcontact.phone == "" ||
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
			const dataNewContact = {
				...newcontact,
				image: avatar,
			};
			e.target.reset();
			setNewContact({ fullName: "", email: "", phone: "", job: "", image: "" });
			setAvater(avatars[0].image);
			setErr({
				errName: null,
				errEmail: null,
				errPhone: null,
				errJob: null,
				formErr: null,
			});
			setShowForm(false);
			const res = await createNewContact(dataNewContact);
			const respons = await getAllContact();
			const data = await respons;
			setContacts(data);
			SetLoading(false);
			// if (res.ok) {

			// }
		}
	};

	// avatar handler
	const handleAvatarChange = e => {
		const src = e.target.src;
		const arrPath = src.split("/");
		const srcindex = arrPath.indexOf("src");
		const newPath = arrPath.slice(srcindex).join("/");

		setAvater("/" + newPath);
		setShowAvatarBox(false);
	};
	const fetchAvatars = async () => {
		const data = await getAvatars();
		setAvatars(data);
		setAvater(data[0].image);
	};

	// close new contact form
	const closeForm = async e => {
		if (!e.target.closest(".formWrapper")) {
			setShowForm(false);
			setNewContact({ fullName: "", email: "", phone: "", job: "", image: "" });
			setErr({
				errName: null,
				errEmail: null,
				errPhone: null,
				errJob: null,
				formErr: null,
			});
		}
	};

	useEffect(() => {
		fetchAvatars();
	}, []);

	useEffect(() => {
		const addContactForm =
			document.documentElement.querySelector(".addContactForm");
		addContactForm.addEventListener("click", e => closeForm(e));
		// addContactForm.removeEventListener("cklick", e => closeForm(e));
	}, []);

	return (
		<div className={`addContactForm ${showForm ? "show" : ""}`}>
			<div className={`formWrapper ${showForm ? "show" : ""}`}>
				<div className="formTitle">
					<h3>ایجاد مخاطب جدید</h3>
					<p>جهت ایجاد مخاطب فیلد ها را پر کنید</p>
				</div>
				<form className="addForm" onSubmit={e => onSubmitHandler(e)}>
					<div className="avatarField">
						<div className="avatar">
							<img
								src={`${avatar}`}
								alt="avatar"
								onClick={e => showAvatarBoxHandler(e)}
							/>
							<label onClick={e => showAvatarBoxHandler(e)}>تغییر آواتار</label>
						</div>
					</div>
					<div className="formField">
						<label htmlFor="fullName"> نام و نام خانوادگی</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							value={newcontact.fullName}
							onChange={e => onchangeHandler(e)}
						/>

						{err.errName && <span className="error">{err.errName}</span>}
					</div>
					<div className="formField">
						<label htmlFor="phone">شماره تلفن</label>
						<input
							type="text"
							id="phone"
							name="phone"
							value={newcontact.phone}
							maxLength={11}
							onChange={e => onchangeHandler(e)}
						/>
						{err.errPhone && <span className="error">{err.errPhone}</span>}
					</div>
					<div className="formField">
						<label htmlFor="job">شغل/ نسبت</label>
						<input
							type="text"
							id="job"
							name="job"
							value={newcontact.job}
							onChange={e => onchangeHandler(e)}
						/>
						{err.errJob && <span className="error">{err.errJob}</span>}
					</div>
					<div className="formField">
						<label htmlFor="email">پست الکترونیکی</label>
						<input
							type="text"
							id="email"
							name="email"
							value={newcontact.email}
							onChange={e => onchangeHandler(e)}
						/>
						{err.errEmail && <span className="error">{err.errEmail}</span>}
					</div>

					<div className="btnField">
						<button type="submit" className="btn primary">
							ایجاد مخاطب
						</button>
						{err.formErr && <span className="error">{err.formErr}</span>}
					</div>
				</form>
				<div className={`avatarBox ${showAvatarBox ? "show" : ""}`}>
					{avatars.map(avatar => (
						<img
							src={avatar.image}
							key={avatar.id}
							onClick={e => handleAvatarChange(e)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default CreateNewContactModal;

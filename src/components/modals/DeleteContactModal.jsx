import React, { useContext } from "react";
import { contactContext } from "../../context/ContactProvider";

const DeleteContactModal = () => {
	const { modal, contactDeleting, closeModalHandler, successModalHandler } =
		useContext(contactContext);

	return (
		<div className={`modalWrapper ${modal ? "show" : ""}`}>
			<div className="modal">
				<div className="modalContent">
					<div>
						<span> شما در حال حذف </span>
						<span className="contactName">
							{contactDeleting && contactDeleting.fullName}
						</span>
						<span> از لیست مخاطبین هستید </span>
					</div>
					<h3>آیا از این کار اطمینان دارید؟</h3>
					<p>
						با <span className="text-success">تائید </span>این کار اطلاعات مخاطب
						از بین خواهد رفت
					</p>
				</div>
				<div className="modalActionBtns">
					<button
						className="success"
						value={contactDeleting.id}
						onClick={e => successModalHandler(e)}>
						تـــائـــیـــد
					</button>
					<button className="cancel" onClick={e => closeModalHandler(e)}>
						انـــصــرافـــ
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteContactModal;

import React, { useContext } from "react";
import { contactContext } from "../../context/ContactProvider";

const GroupDeleteContactsModal = () => {
	const {
		selectedContacts,
		groupDeleteModal,
		successDeleteContact,
		cancelDeleteContact,
	} = useContext(contactContext);

	return (
		<div className={`modalWrapper ${groupDeleteModal ? "show" : ""}`}>
			<div className="modal">
				<div className="modalContent">
					<div>
						<span> شما در حال حذف </span>
						<span className="contactName">
							{selectedContacts.length && selectedContacts.length} مخاطب
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
						value={true}
						onClick={e => successDeleteContact(e)}>
						تـــائـــیـــد
					</button>
					<button className="cancel" onClick={e => cancelDeleteContact(e)}>
						انـــصــرافـــ
					</button>
				</div>
			</div>
		</div>
	);
};

export default GroupDeleteContactsModal;

import React, { useContext } from "react";
import ContactCard from "./ContactCard";
import { contactContext } from "../../context/ContactProvider";

const Contacts = () => {
	const { contacts, search } = useContext(contactContext);
	return (
		<div className="contactContainer">
			{contacts
				?.filter(contact => {
					return (
						search === "" ||
						contact.fullName.includes(search) ||
						search === "" ||
						contact.phone.includes(search) ||
						search === "" ||
						contact.email.includes(search) ||
						search === "" ||
						contact.job.includes(search)
					);
				})
				.map(contact => (
					<ContactCard key={contact.id} contact={contact} />
				))}
		</div>
	);
};

export default Contacts;

import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
	getAllContact,
	deleteContect,
	deleteWithSelectContacts,
	getAvatars,
	updateContactWithId,
} from "../api/API";

export const contactContext = createContext();
const ContactProvider = ({ children }) => {
	const [loading, SetLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [contacts, setContacts] = useState();
	const [modal, setShowModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [editContact, setEditContact] = useState({});
	const [contactDeleting, setContactDeleteing] = useState({});
	const [checkReset, setCheckReset] = useState(false);
	const [search, setSearch] = useState("");
	const [selectedContacts, setSelectedContacts] = useState([]);
	const [groupDeleteModal, setGroupDeleteModal] = useState(false);
	const [avatars, setAvatars] = useState([]);
	// delete contact
	const deleteContactHandler = id => {
		const selectedContact = contacts.find(contact => contact.id == id);
		if (selectedContact) {
			setShowModal(true);
			setContactDeleteing(selectedContact);
		}
	};
	const successModalHandler = async e => {
		const contactId = e.target.value;
		const res = await deleteContect(contactId);
		console.log(res);

		const newContacts = contacts.filter(contact => contact.id != contactId);
		setContacts(newContacts);
		setShowModal(false);
	};
	// closeing modal for deleting contact
	const closeModalHandler = e => {
		setShowModal(false);
	};

	const onSelectedHandler = (e, id) => {
		if (e.target.checked) {
			const selectedContact = contacts.find(contact => contact.id == id);
			setSelectedContacts(prevStata => [...prevStata, selectedContact]);
		} else {
			const selectedContact = selectedContacts.findIndex(
				contact => contact.id == id,
			);
			selectedContacts.splice(selectedContact, 1);
			console.log(selectedContacts);
		}
	};

	const groupDeleteHandler = e => {
		console.log(e);
		console.log("deletes", selectedContacts);
		if (selectedContacts.length >= 1) {
			setGroupDeleteModal(true);
		}
	};
	const successDeleteContact = async e => {
		console.log(e.target.value);
		SetLoading(true);
		let delArray = selectedContacts.map(object => object.id);
		const res = await deleteWithSelectContacts(delArray);
		if (res) {
			fetcher();
		}
		setSelectedContacts([]);
		setGroupDeleteModal(false);
		SetLoading(false);
	};
	const cancelDeleteContact = () => {
		setSelectedContacts([]);
		setCheckReset(true);
		setGroupDeleteModal(false);
	};

	// edite contact
	const editContactHandler = id => {
		const contact = contacts.find(contact => contact.id == id);
		if (contact) {
			setEditContact(contact);
			setEditModal(true);
		}
	};

	// update contact
	const updateContact = async data => {
		SetLoading(true);
		const res = await updateContactWithId(data.id, data);
		if (res.id) {
			fetcher();
		}
		SetLoading(false);
	};

	const fetcher = async () => {
		SetLoading(true);
		const data = await getAllContact();
		const dataAvatars = await getAvatars();
		setAvatars(dataAvatars);
		setContacts(data);
		SetLoading(false);
	};
	useEffect(() => {
		fetcher();
	}, []);

	useEffect(() => {
		if (!editContact) {
			setEditModal(false);
		}
	}, [editContact]);

	return (
		<contactContext.Provider
			value={{
				avatars,
				contacts: contacts,
				setContacts,
				deleteContactHandler,
				modal,
				contactDeleting,
				setShowModal,
				closeModalHandler,
				successModalHandler,
				showForm,
				setShowForm,
				loading,
				SetLoading,
				search,
				setSearch,
				selectedContacts,
				onSelectedHandler,
				groupDeleteHandler,
				groupDeleteModal,
				successDeleteContact,
				cancelDeleteContact,
				checkReset,
				setCheckReset,
				editContactHandler,
				editModal,
				setEditModal,
				editContact,
				setEditContact,
				updateContact,
			}}>
			{children}
		</contactContext.Provider>
	);
};

export default ContactProvider;

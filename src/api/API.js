import axios from "axios";

const baseUrl = `https://contact-api-457v.onrender.com`;
// const token = `CbGwWqXH9xaAgzI9ZSj0Nayi8lHm0XJtKRP3`;
// const baseUrl = `https://api.cutejson.dev/db`;

export const getAllContact = async () => {
	try {
		const res = await fetch(`${baseUrl}/users/1`);
		const data = await res.json();
		if (data) {
			return data;
		} else {
			throw new Error("no data");
		}
	} catch (error) {
		console.log(error);
	}
};
export const getAvatars = async () => {
	try {
		const res = await fetch(`${baseUrl}/avatars`);
		const data = await res.json();
		if (data) {
			return data;
		} else {
			throw new Error("no avatars");
		}
	} catch (error) {
		console.log(error);
	}
};
export const deleteContect = async id => {
	const res = await fetch(`${baseUrl}/contacts/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
};
export const deleteWithSelectContacts = async ids => {
	const headers = {
		"Content-Type": "application/json",
	};
	try {
		const delFetch = ids.map(id => {
			return fetch(`${baseUrl}/contacts/${id}`, {
				method: "DELETE",
				headers: headers,
			});
		});

		const responses = await Promise.all(delFetch);
		let deletedSuccess = [];
		responses.forEach(async response => {
			if (response.ok) {
				const data = await response.json();
				deletedSuccess.push(data);
			} else {
				console.error(
					`Error deleting contact ${response.url}: ${response.statusText}`,
				);
			}
		});
		return deletedSuccess;
	} catch (error) {
		console.error(`Error deleting contacts: ${error}`);
	}
};

export const updateContactWithId = async (id, data) => {
	const res = await fetch(`${baseUrl}/contacts/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	console.log(res.json);

	return await res.json();
};
export const createNewContact = async data => {
	try {
		const res = await fetch(`${baseUrl}/contacts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return res;
	} catch (err) {
		console.log(err);
	}
};

// axios code
export const AX_instance = axios.create({
	baseURL: baseUrl,
	headers: {
		// "cute-json-token": token,
		"Content-Type": "application/json",
	},
});

// getAllContact
export const getContacts = async userId => {
	try {
		const res = await AX_instance.get(`/users?id=${userId}`);
		if (res.status == 200) {
			return res.data[0];
		}
		throw new Error("خطای سرور");
	} catch (error) {
		console.log(error);
	}
};
export const createContact = async (userId, data) => {
	console.log(userId, data);
	try {
		const res = await AX_instance.patch(`/users/${userId}`, data);
		if (res.status == 200) {
			console.log(res.data);
			return res.data;
		}
		throw new Error("خطای سرور");
	} catch (error) {
		console.log(error);
	}
};

export const removeContact = async (userId, idToRemove) => {
	try {
		const res = await AX_instance.get(`/users/${userId}`);
		if (res.status == 200) {
			const contactArr = res.data.contacts;
			const newArray = contactArr.filter(item => item.id !== idToRemove);
			const res2 = await AX_instance.patch(`/users/${userId}`, {
				contacts: newArray,
			});
			if (res2.status == 200) {
				return res2.data;
			}
		}
		throw new Error("خطای سرور");
	} catch (error) {
		console.log(error);
	}
};
export const removeContactSelection = async (userId, dataSelections) => {
	try {
		const res = await AX_instance.get(`/users/${userId}`);
		if (res.status == 200) {
			const contactArr = res.data.contacts;
			console.log(contactArr);

			const resultArray = contactArr.filter(
				item1 => !dataSelections.some(item2 => item2.id === item1.id),
			);

			const res2 = await AX_instance.patch(`/users/${userId}`, {
				contacts: resultArray,
			});
			if (res2.status == 200) {
				return res2.data;
			}
		}
		throw new Error("خطای سرور");
	} catch (error) {
		console.log(error);
	}
};

export const upContact = async (userId, data) => {
	try {
		const res = await AX_instance.patch(`/users/${userId}`, data);
		if (res.status == 200) {
			return res.data;
		}
	} catch (error) {
		console.log(error);
	}
};

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

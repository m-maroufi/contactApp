const baseUrl = `https://contact-api-457v.onrender.com`;

export const getAllContact = async () => {
	try {
		const res = await fetch(`${baseUrl}/contacts`);
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

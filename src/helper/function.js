// generate uniqueId
export async function generateUniqueId() {
	return `${Date.now().toString(36)}${Math.random().toString(36).substr(2, 9)}`;
}

//validete Phone number function
export function validatePhoneNumber(phoneNumber) {
	// تعریف الگوی شماره تلفن
	const pattern = /^0\d{10}$/;
	// بررسی تطابق شماره تلفن با الگو
	return pattern.test(phoneNumber);
}

//validate Email function
export function validateEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
}

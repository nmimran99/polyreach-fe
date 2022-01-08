export function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}

export function eraseCookie(name) {
	document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function setCookies(obj, days) {
	Object.entries(obj).forEach((entry) => {
		let [name, value] = entry;
		setCookie(name, value, days);
	});
}

export function getCookies(cookieList) {
	return cookieList.reduce(
		(total, ck) => ({ ...total, [ck]: getCookie(ck) }),
		{}
	);
}

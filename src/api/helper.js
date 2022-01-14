export const getFullName = (info) => {
	const { firstName, lastName } = info;
	return `${firstName} ${lastName}`;
};

export const getShortName = (info) => {
	const { firstName, lastName } = info;
	return `${firstName} ${lastName.slice(0, 1)}.`;
};

export const getColor = (sts) => {
	const statColors = {
		active: `active`,
		busy: `busy`,
		inactive: `inactive`,
	};
	console.log(statColors[sts]);
	return statColors[sts];
};

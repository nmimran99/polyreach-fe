import { differenceInDays, isToday, parseISO } from "date-fns";
import format from "date-fns/format";

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

export const addParticipantData = (conversation, userId) => {
	return {
		...conversation,
		participant: conversation.participants.find((cp) => cp._id !== userId),
	};
};

export const getDate = (date) => {
	let parsed = parseISO(date);
	if (isToday(parsed)) {
		return format(parsed, "hh:mm a");
	} else if (differenceInDays(new Date(), parsed) > 4) {
		return format(parsed, "yyyy-MM-dd");
	}
	return format(parsed, "cccc");
};

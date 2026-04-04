export interface INAVIGATION_BUTTONS {
	edit: { text: string }[];
	tabs: { text: string }[];
	profile: { text: string }[];
	creating: { text: string }[];
}

export const NAVIGATION_BUTTONS: INAVIGATION_BUTTONS = {
	edit: [{ text: "back" }, { text: "complete" }, { text: "delete" }],
	tabs: [{ text: "Today" }, { text: "Week" }, { text: "Month" }],
	profile: [{ text: "back" }],
	creating: [{ text: "back" }],
};

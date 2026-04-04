export const truncate = (options: { text: string; maxLength: number }) => {
	const { text, maxLength } = options;
	const lineBreakText = text.split("\n")[0];

	if (lineBreakText.length < maxLength) return lineBreakText;
	return lineBreakText.split(" ").reduce((acc, word) => {
		if (acc.length > maxLength) return acc;
		return acc += word + ' ';
	}, "");
	return lineBreakText.trim().substring(0, maxLength + 1) + "…";
};

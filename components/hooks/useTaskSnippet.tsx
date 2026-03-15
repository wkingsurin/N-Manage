import { useContext } from "react";
import { TaskSnippetContext } from "../contexts/task-snippet-context";

export function useTaskSnippet() {
	const context = useContext(TaskSnippetContext);

	if (!context) {
		throw new Error("useTaskSnipper must be used inside TaskSnippetProvider");
	}

	return context;
}

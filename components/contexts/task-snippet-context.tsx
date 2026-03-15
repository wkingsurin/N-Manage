import { ITaskSnippet } from "@/app/types/task-snippet.types";
import { createContext } from "react";

interface TaskSnippetContext {
	taskSnippet: ITaskSnippet | null;
	onChange: (text: string) => void;
	setTaskSnippetPeriod: (period: "today" | "week" | "month") => void;
	resetTaskSnippet: () => void;
}

export const TaskSnippetContext = createContext<TaskSnippetContext | null>(
	null
);

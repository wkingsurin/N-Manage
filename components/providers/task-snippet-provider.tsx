"use client";

import { ITaskSnippet } from "@/app/types/task-snippet.types";
import { ReactNode, useState } from "react";
import { TaskSnippetContext } from "../contexts/task-snippet-context";

const initialTaskSnippet: ITaskSnippet = {
	text: "",
	status: "add",
	period: "today",
};

interface ITaskSnippetProviderProps {
	children: ReactNode;
}

export function TaskSnippetProvider({ children }: ITaskSnippetProviderProps) {
	const [taskSnippet, setTaskSnippet] = useState(initialTaskSnippet);

	const onChange = (text: string) => {
		setTaskSnippet((prevSnippet) => {
			return { ...prevSnippet, text };
		});
	};

	const setTaskSnippetPeriod = (period: "today" | "week" | "month") => {
		setTaskSnippet((prevSnippet) => {
			return { ...prevSnippet, period };
		});
	};

	const resetTaskSnippet = () => {
		setTaskSnippet(() => {
			return initialTaskSnippet;
		});
	};

	const value = { taskSnippet, onChange, setTaskSnippetPeriod, resetTaskSnippet };

	return (
		<TaskSnippetContext.Provider value={value}>
			{children}
		</TaskSnippetContext.Provider>
	);
}

"use client";

import { NewTaskContext } from "../contexts/creatingContext";
import { useState } from "react";

interface INewTaskProviderProps {
	children: React.ReactNode;
}

export function NewTaskProvider({ children }: INewTaskProviderProps) {
	const [creatingTask, setCreatingTask] = useState<string | null>(null);

	return (
		<NewTaskContext.Provider value={{ creatingTask, setCreatingTask }}>
			{children}
		</NewTaskContext.Provider>
	);
}

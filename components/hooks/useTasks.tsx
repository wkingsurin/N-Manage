import { useContext } from "react";
import { TasksContext } from "@/components/contexts/tasksContext";

export function useTasks() {
	const context = useContext(TasksContext);

	if (context === null) {
		throw new Error("useTasks must be used within an TasksProvider");
	}

	return context;
}

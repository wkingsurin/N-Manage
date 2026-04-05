"use client";

import { ITask } from "@/app/types/task.types";
import { useTasksUIStore } from "./tasks.store";
import { useEffect } from "react";
import { useUIStore } from "./ui.store";

interface IProps {
	tasks: ITask[];
	isMobile: boolean;
}

export default function TasksHydrator({ tasks, isMobile }: IProps) {
	const setTasks = useTasksUIStore((s) => s.setTasks);
	const setIsMobile = useUIStore((s) => s.updateIsMobile);

	useEffect(() => {
		setTasks(tasks);
		setIsMobile(isMobile);
	}, [tasks, setTasks, isMobile, setIsMobile]);

	return null;
}

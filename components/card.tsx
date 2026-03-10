"use client";

import Task from "./task";
import NewTask from "./newTask";
import { useState } from "react";

import { useTasks } from "./hooks/useTasks";

interface ICardProps {
	title: string;
	period: string;
}

const initialNewTask = {
	id: "",
	text: "",
	edit: false,
	status: "add",
	period: "",
};

export default function Card({ title, period }: ICardProps) {
	const [newTask, setNewTask] = useState(initialNewTask);
	const { tasks, onClickEditTask, addNewTask } = useTasks();

	const handleEditTask = (id: string) => {
		resetNewTask()
		onClickEditTask(id)
	}

	// NewTask handlers
	const onCreateNewTask = () => {
		setNewTask(() => ({
			...newTask,
			status: "creating",
			id: `${Date.now()}`,
			period,
		}));
	};

	const onChangeTextNewTask = (text: string) => {
		console.log("typing...");
		setNewTask(() => ({ ...newTask, text: text })); // temp id filed
	};

	const onAddNewTask = () => {
		if (!newTask.id || !newTask.text) {
			resetNewTask();
			return null;
		}

		addNewTask(newTask);
		console.log(`add new task`);
		console.log(`[newTask]:`, newTask);
		console.log(`[tasks]:`, tasks);
		resetNewTask();
	};

	const onCloseNewTask = () => {
		resetNewTask();
	};

	function resetNewTask() {
		setNewTask(initialNewTask);
	}

	const getTasks = (period: string) => {
		const filtered = tasks.filter((task) => task.period === period);
		return filtered.map((task) => <Task key={task.id} data={task} onClickEdit={handleEditTask} />);
	};

	return (
		<div className="flex flex-col p-3 bg-pale-blue rounded-md border border-dark-50 gap-3 w-[33.333%]">
			<span className="font-poppins font-semibold text-base">{title}</span>
			<ul className="flex flex-col gap-2">
				{getTasks(period)}
				<NewTask
					status={newTask.status}
					onCreateNewTask={onCreateNewTask}
					onChangeText={onChangeTextNewTask}
					onAddNewTask={onAddNewTask}
					onCloseNewTask={onCloseNewTask}
				/>
			</ul>
		</div>
	);
}

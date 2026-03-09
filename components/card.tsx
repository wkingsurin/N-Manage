"use client";

import Task from "./task";
import AddTask from "./addTask";
import { useState } from "react";

interface ICardProps {
	title: string;
}

export default function Card({ title }: ICardProps) {
	const [tasks, setTasks] = useState([
		{
			id: "1",
			text: "Create Task component",
			edit: false,
			status: "in-progress",
		},
	]);

	const onClick = (id: string) => {
		setTasks((prevTasks) => {
			const newTasks = prevTasks.map((task) =>
				task.id === id ? { ...task, edit: !task.edit } : task
			);
			return newTasks;
		});
	};
	const onEdit = (text: string) => {
		setTasks((prevTasks) => {
			const newTasks = prevTasks.map((task) =>
				task.edit ? { ...task, text: text } : task
			);
			return newTasks;
		});
	};
	const onComplete = (id: string) => {
		setTasks((prevTasks) => {
			const newTasks = prevTasks.map((task) =>
				task.id === id ? { ...task, status: "completed", edit: false } : task
			);
			return newTasks;
		});
	};

	const getTasks = () =>
		tasks.map((task) => (
			<Task
				key={task.id}
				data={task}
				onClick={onClick}
				onEdit={onEdit}
				onComplete={onComplete}
			/>
		));

	return (
		<div className="flex flex-col p-3 bg-pale-blue rounded-md border border-dark-50 gap-3 w-[33.333%]">
			<span className="font-poppins font-semibold text-base">{title}</span>
			<ul className="flex flex-col gap-2">
				{getTasks()}
				<AddTask />
			</ul>
		</div>
	);
}

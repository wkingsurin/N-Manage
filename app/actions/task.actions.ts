"use server";

import { auth } from "@/auth";
import { CreateTaskDTO, createTaskSchema } from "../schemas/task.schema";
import {
	mapCompleteTask,
	mapCreateTask,
	mapSaveTask,
	mapTaskSnippetToCreateTask,
} from "../mappers/task.mapper";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ITask } from "../types/task.types";

export async function createTask(formData: CreateTaskDTO) {
	const session = await auth();

	if (!session?.user?.id) {
		return { success: false, error: "Unauthorized" };
	}

	try {
		const data = mapTaskSnippetToCreateTask(createTaskSchema.parse(formData));
		const taskData = mapCreateTask(data, session.user.id);

		await prisma.task.create({ data: taskData });
		revalidatePath("/dashboard");

		return { success: true };
	} catch (err) {
		console.error(err);

		return { success: false, error: "Failed to create task" };
	}
}

export async function getTasks() {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	const tasks = await prisma.task.findMany({
		where: {
			userId: session.user.id,
		},
	});

	return tasks;
}

export async function saveTask(data: ITask) {
	try {
		const task = mapSaveTask(data);

		await prisma.task.update({
			where: {
				id: task.id,
			},
			data: {
				title: task.title,
			},
		});
		return { success: true };
	} catch (err) {
		console.error(err);

		return { success: false, error: "Failed to save task" };
	}
}

export async function completeTask(data: ITask) {
	try {
		const task = mapCompleteTask(data);

		await prisma.task.update({
			where: {
				id: task.id,
			},
			data: {
				status: task.status,
			},
		});

		revalidatePath("/dashboard");
		return { success: true };
	} catch (err) {
		console.error(err);

		return { success: false, error: "Failed completion task" };
	}
}

// dev
export async function clearTasks() {
	await prisma.task.deleteMany();
	revalidatePath("/dashboard");
}

export async function clearCurrentUserTasks() {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	try {
		await prisma.task.deleteMany({
			where: {
				userId: session.user.id,
			},
		});
		revalidatePath("/dashboard");

		return { success: true };
	} catch (err) {
		console.error(err);

		return { success: false, error: "Failed to delete tasks" };
	}
}

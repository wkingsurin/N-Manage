"use server";

import { auth } from "@/auth";
import { CreateTaskDTO, createTaskSchema } from "../schemas/task.schema";
import { mapCreateTask } from "../mappers/task.mapper";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(formData: CreateTaskDTO) {
	const session = await auth();

	if (!session?.user?.id) {
		return { success: false, error: "Unauthorized" };
	}

	try {
		const data = createTaskSchema.parse(formData);

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

export async function saveTask(data: {id: string, title: string}) {
	await prisma.task.update({
		where: {
			id: data.id,
		},
		data: {
			title: data.title,
		},
	});

}

// dev
export async function clearTasks() {
	await prisma.task.deleteMany();
	revalidatePath("/dashboard");
}

import { Task } from "@/lib/generated/prisma/client";
import { CreateTaskDTO } from "../schemas/task.schema";
import { ITask } from "../types/task.types";
import { getDueDate, getPeriodFromDate } from "../utils/date";
import { ITaskSnippet } from "../types/task-snippet.types";

export function mapCreateTask(dto: CreateTaskDTO, userId: string) {
	return {
		title: dto.text,
		status: dto.status,
		edit: false,
		dueDate: getDueDate(dto.period),
		userId,
	};
}

export function mapTaskFromDB(task: Task): ITask {
	return {
		id: task.id,
		text: task.title,
		edit: task.edit,
		status: task.status,
		period: getPeriodFromDate(task.dueDate),
	};
}

export function mapTaskSnippetToCreateTask(snippet: ITaskSnippet) {
	return {
		text: snippet.text,
		status: snippet.status,
		period: snippet.period,
	};
}

import { z } from "zod";

export const createTaskSchema = z.object({
	text: z.string().min(1, "Text is required"),
	status: z.string(),
	period: z.enum(["today", "week", "month"]),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

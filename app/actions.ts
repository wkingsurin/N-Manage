"use server";

import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";

interface IFormData {
	email: string | null;
	password: string | null;
	confirmPassword: string | null;
}

type ActionResult = { success: true } | { success: false; error: string };

export default async function createAccount(
	formData: IFormData
): Promise<ActionResult> {
	const email = formData.email;
	const password = formData.password;
	const confirmPassword = formData.confirmPassword;

	try {
		if (!email || !password || !confirmPassword) {
			throw new Error("Email and password are required");
		}

		const existingUser = await prisma.user.findUnique({
			where: { email: email },
		});

		if (existingUser) {
			throw new Error("User with this email already exists");
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		await prisma.user.create({
			data: {
				email: email,
				password: hashedPassword,
			},
		});

		return {
			success: true,
		};
	} catch (err) {
		console.error("Error creating user:", err);

		return {
			success: false,
			error: "Somethin went wrong",
		};
	}
}

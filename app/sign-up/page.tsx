"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function SignUp() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassowrd: "",
	});

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
		e.preventDefault()
		console.log("submit");
		console.log(formData);
	};

	const onTypeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData(() => ({ ...formData, email: e.target.value }));
	};

	const onTypePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData(() => ({ ...formData, password: e.target.value }));
	};

	const onTypeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData(() => ({ ...formData, confirmPassowrd: e.target.value }));
	};

	return (
		<div className="mt-40 w-full">
			<div className="container box-border px-4 max-w-sm mx-auto flex flex-col gap-5">
				<Link href="/">
					<Button className="w-full h-10 bg-transparent text-dark-500 hover:bg-primary hover:text-white">
						<ArrowLeft />
						<p>Back to App</p>
					</Button>
				</Link>
				<div className="flex flex-col gap-12 items-center px-7 py-4 rounded-md shadow-md border border-dark-100">
					<h2 className="font-medium text-3xl">Sign up</h2>
					<form
						action=""
						className="flex flex-col gap-3 w-full"
						onSubmit={onSubmit}
					>
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">Email:</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="john@example.com"
								required
								className="h-10"
								onChange={onTypeEmail}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="password">Password:</Label>
							<Input
								id="password"
								type="password"
								name="password"
								placeholder="password"
								minLength={8}
								required
								className="h-10"
								onChange={onTypePassword}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="confirm-password">Confirm password:</Label>
							<Input
								id="confirm-password"
								type="password"
								name="confirm-password"
								placeholder="password"
								minLength={8}
								required
								className="h-10"
								onChange={onTypeConfirmPassword}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<Button type="submit" className="h-10">
								Sign up
							</Button>
							<div className="flex items-center justify-between gap-4">
								<p className="text-dark-500 text-sm">
									Already have an account?
								</p>
								<Link href="/sign-in" className="flex">
									<Button className="text-sm text-dark-500 hover:text-dark bg-transparent hover:bg-transparent w-auto h-auto p-0">
										Sign in
									</Button>
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";

export default function CreateTask() {
	return (
		<li className="flex flex-col gap-[10px] items-end justify-between">
			<textarea
				name="textarea"
				id="textarea"
				placeholder="Typing your task..."
				className="w-full bg-white hover:shadow-md rounded-md py-[10px] px-3 outline-none resize-none field-sizing-content min-h-[57px] max-h-[92]"
			></textarea>
			<div className="flex gap-2">
				<Button className="border-md py-[10px] px-4">Create</Button>
				<Button className="bg-dark-300 hover:bg-dark-500 border-md">
					<X size={16} />
				</Button>
			</div>
		</li>
	);
}

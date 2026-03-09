"use client";

import { Plus } from "lucide-react";

export default function AddTask() {
	return (
		<li className="flex gap-1 items-center text-dark-500 bg-dark-50 hover:bg-dark-100 hover:text-dark-700 rounded-md py-[10px] px-3">
			<Plus size={16} />
			<span>Add new task</span>
		</li>
	);
}

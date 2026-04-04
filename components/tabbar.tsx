"use client";

import { Plus, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUIStore } from "@/lib/ui.store";
import { useTasksUIStore } from "@/lib/tasks.store";

export default function Tabbar() {
	const activeTab = useUIStore((s) => s.creatingTaskTab);
	// 1. Закрыть редактирование задач
	// 2. Вернуть исходный текст (если не сохранена)

	const onClick = () => {
		if (!activeTab) return;
		useTasksUIStore.getState().startCreatingTask(activeTab);
	};

	// draft Отвечает за редактирование задач (CardsList)
	//

	return (
		<div
			className="wrapper fixed bottom-6 flex justify-center z-1101"
		>
			<div className="flex rounded-[50px] bg-dark dark:bg-surface-800 p-[6px] gap-9 sm:hidden">
				<Link href="profile">
					<Button className="w-12 h-12 rounded-[50px] bg-white dark:bg-gloomy">
						<User className="stroke-dark dark:stroke-surface-800" size={36} />
					</Button>
				</Link>
				<Button className="w-12 h-12 rounded-[50px] bg-white dark:bg-gloomy" onClick={onClick}>
					<Plus className="stroke-dark dark:stroke-surface-800" size={36} />
				</Button>
			</div>
		</div>
	);
}

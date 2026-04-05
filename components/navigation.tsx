"use client";

import { Button } from "./ui/button";
import { Period } from "@/app/types/shared.types";
import { ArrowLeftToLine, Check, Trash2 } from "lucide-react";
import { useUIStore } from "@/lib/ui.store";
import { useTasksUIStore } from "@/lib/tasks.store";
import { useTaskSnippetUIStore } from "@/lib/task-snippet.store";
import { useDraftTaskUIStore } from "@/lib/draft-ui.store";
import { usePathname, useRouter } from "next/navigation";
import { INAVIGATION_BUTTONS, NAVIGATION_BUTTONS } from "@/app/utils/config";

interface Props {
	buttons: IButton[];
}

interface IButton {
	text: string;
}

export default function MobileNavigation({ buttons, ...rest }: Props) {
	const activeTab = useUIStore((s) => s.creatingTaskTab);
	const activeTaskId = useUIStore((s) => s.activeTaskId);
	const draftTask = useDraftTaskUIStore((s) =>
		activeTaskId ? s.draftsById[activeTaskId] : null
	);
	const isOpenedCreating = useUIStore((s) => s.isOpened);

	const pathname = usePathname();
	const router = useRouter();

	function getIcon(text: string) {
		if (text === "back")
			return (
				<ArrowLeftToLine className="size-5 stroke-dark dark:stroke-surface-800" />
			);
		if (text === "complete")
			return <Check className="size-5 stroke-dark dark:stroke-surface-800" />;
		if (text === "delete")
			return <Trash2 className="size-5 stroke-dark dark:stroke-surface-800" />;
	}

	function getTabsMenu() {
		return buttons.map((button) => {
			const text = button.text.toLowerCase();

			return (
				<Button
					key={text}
					data-id={text}
					className={`px-3 py-2 h-12 text-[18px] font-medium bg-transparent ${
						activeTab === text
							? "text-dark dark:text-surface-800"
							: "text-dark-300 dark:text-surface-300"
					} hover:bg-transparent z-1100`}
					onClick={() => {
						if (activeTaskId) {
							useTasksUIStore.getState().saveTask(activeTaskId);
						}
						if (activeTab === text) {
							return;
						}
						useUIStore.getState().updateCreatingTab(text as Period);
						router.push(`?tab=${text}`);
					}}
					{...rest}
				>
					{button.text}
				</Button>
			);
		});
	}
	function getEditMenu() {
		const normalizedMenu = splitButtons(NAVIGATION_BUTTONS.edit);

		return normalizedMenu.map((item) => {
			return Array.isArray(item) ? (
				<div className="flex items-center" key="menu">
					{item.map((el) => {
						const text = el.text;
						const icon = getIcon(text);

						const onClick = () => {
							if (text === "complete" && activeTaskId !== null) {
								if (
									draftTask?.text !==
									useTasksUIStore.getState().tasksById[activeTaskId].text
								) {
									console.log(`Текст сохранен`);
									useTasksUIStore.getState().saveTask(activeTaskId);
								} else {
									console.log(`Текст не сохранен`);
									useUIStore.getState().updateIsOpenedOverlay(true);
									useUIStore
										.getState()
										.updateConfirmModal({ isOpened: true, type: "completion" });
								}
							}
							if (text === "delete" && activeTaskId !== null) {
								useUIStore.getState().updateIsOpenedOverlay(true);
								useUIStore
									.getState()
									.updateConfirmModal({ isOpened: true, type: "deletion" });
							}
							router.push(`?tab=${text}`);
						};

						return (
							<Button
								key={text}
								data-id={text}
								className={`px-3 py-2 h-12 text-[18px] font-medium bg-transparent text-dark dark:text-surface-800 hover:bg-transparent z-1100`}
								onClick={onClick}
							>
								{icon}
							</Button>
						);
					})}
				</div>
			) : (
				<Button
					key={item.text}
					data-id={item.text}
					className={`px-3 py-2 h-12 text-[18px] font-medium bg-transparent text-dark dark:text-surface-800 hover:bg-transparent z-1100`}
					onClick={() => {
						if (activeTaskId !== null) {
							if (activeTaskId) {
								if (
									draftTask?.text !==
									useTasksUIStore.getState().tasksById[activeTaskId].text
								) {
									console.log(`Текст сохранен`);
									useTasksUIStore.getState().saveTask(activeTaskId);
								} else {
									console.log(`Текст не сохранен`);
								}
								useDraftTaskUIStore.getState().clearDraft(activeTaskId);
								useUIStore.getState().updateActiveTask(null);
							}

							if (isOpenedCreating) {
								useTasksUIStore.getState().submitTask(activeTab);
								useUIStore.getState().updateIsOpened(false);
							}
							useUIStore.getState().updateCreatingTab(activeTab);
						}
						router.push(`?tab=${item.text}`);
					}}
				>
					{getIcon(item.text)}
				</Button>
			);
		});
	}
	function getMenu(key: keyof INAVIGATION_BUTTONS) {
		return NAVIGATION_BUTTONS[key].map((item) => (
			<Button
				key={item.text}
				data-id={item.text}
				className={`px-3 py-2 h-12 text-[18px] font-medium bg-transparent text-dark hover:bg-transparent z-1100`}
				onClick={() => {
					console.log(`[back]:`, item.text);

					if (useTaskSnippetUIStore.getState().taskSnippet.text.length < 1) {
						useUIStore.getState().updateIsOpened(false);
					} else {
						useTasksUIStore.getState().submitTask(activeTab);
						useUIStore.getState().updateIsOpened(false);
						return;
					}

					if (activeTaskId !== null) {
						if (activeTaskId) {
							if (
								draftTask?.text !==
								useTasksUIStore.getState().tasksById[activeTaskId].text
							) {
								console.log(`Текст сохранен`);
								useTasksUIStore.getState().saveTask(activeTaskId);
							} else {
								console.log(`Текст не сохранен`);
							}
							useDraftTaskUIStore.getState().clearDraft(activeTaskId);
							useUIStore.getState().updateActiveTask(null);
						}

						if (isOpenedCreating) {
							useTasksUIStore.getState().submitTask(activeTab);
							useUIStore.getState().updateIsOpened(false);
						}
						useUIStore.getState().updateCreatingTab(activeTab);
					}
					if (key === "profile") {
						router.back();
						return;
					}
					router.push(`?tab=${item.text}`);
				}}
			>
				{getIcon(item.text)}
			</Button>
		));
	}

	function splitButtons(buttons: IButton[]) {
		const backButton = buttons.slice(0, 1);
		const restButtons = buttons.slice(1, buttons.length);

		return [...backButton, restButtons];
	}

	return (
		<nav className="relative flex flex-row justify-between w-full px-3 h-[50px] text-dark bg-dark-100 dark:text-surface dark:bg-gloomy border-b-[0.5px] border-surface-50">
			{pathname === "/dashboard" &&
				!draftTask &&
				!isOpenedCreating &&
				getTabsMenu()}
			{isOpenedCreating && getMenu("creating")}
			{pathname === "/dashboard" && draftTask && getEditMenu()}
			{pathname === "/profile" && (
				<>
					{getMenu("profile")}
					<div className="absolute left-0 w-full h-full dark:bg-inherit flex items-center justify-center">
						<span className="text-inherit font-medium text-[18px] tracking-wider">
							Profile
						</span>
					</div>
				</>
			)}
			{/* {pathname === "/profile" && (
				<div className="absolute left-0 w-full h-full flex items-center justify-center">
					<span className="text-dark-400">Loading...</span>
				</div>
			)} */}
		</nav>
	);
}

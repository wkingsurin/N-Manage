import { useUIStore } from "@/lib/ui.store";
import Task from "./task";
import { useDraftTaskUIStore } from "@/lib/draft-ui.store";
import CreateTask from "./createTask";

interface IProps {
	ids: string[];
	isMobile?: boolean;
	children?: React.ReactNode;
}

export default function TasksList({ ids, isMobile, children }: IProps) {
	const draftTask = useDraftTaskUIStore((s) =>
		ids ? ids.find((id) => s.draftsById[id]) : null
	);
	const isOpenedCreating = useUIStore((s) => s.isOpened);

	function getTasksById() {
		if (!ids) return [];

		return ids.map((id) => {
			return <Task key={id} id={id} isMobile={isMobile} />;
		});
	}

	function getTaskById() {
		if (!ids) return [];

		return ids
			.filter((id) => id === useDraftTaskUIStore.getState().draftsById[id]?.id)
			.map((id) => {
				return <Task key={id} id={id} isMobile={isMobile} />;
			});
	}

	return (
		<ul
			className={`flex flex-col gap-[1px] sm:gap-2 h-full sm:h-auto b-3 overflow-y-auto ${
				draftTask && "overflow-y-hidden"
			} sm:overflow-visible scrollbar-hide desktop-scrollbar`}
		>
			{!isMobile && ids && getTasksById()}
			{!isMobile && !ids && (
				<h1 className="flex items-center justify-center text-center text-dark-300 dark:text-surface-300 w-full rounded-md min-h-10 bg-dark-50 dark:bg-dark">
					List is empty
				</h1>
			)}
			{/* {!isMobile && getTasksById()} */}
			{isMobile && !draftTask && ids && !isOpenedCreating && getTasksById()}
			{isMobile && !draftTask && !ids && !isOpenedCreating && (
				<h1 className="flex items-center justify-center h-[54px] text-dark-200 dark:text-surface-200">
					{useUIStore.getState().creatingTaskTab[0].toUpperCase() +
						useUIStore.getState().creatingTaskTab.substring(1)}
					`s list is empty
				</h1>
			)}
			{/* {isMobile && !draftTask && getTasksById()} */}
			{isMobile && draftTask && ids && !isOpenedCreating && getTaskById()}
			{isMobile && draftTask && !ids && !isOpenedCreating && (
				<h1 className="text-center text-dark-200 dark:text-surface-200">
					{useUIStore.getState().creatingTaskTab[0].toUpperCase() +
						useUIStore.getState().creatingTaskTab.substring(1)}
					`s list is empty
				</h1>
			)}
			{isMobile && isOpenedCreating && (
				<CreateTask period={useUIStore.getState().creatingTaskTab} isMobile />
			)}
			{/* {isMobile && draftTask && getTaskById()} */}
			{children}
		</ul>
	);
}

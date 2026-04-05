"use client";

import NewTask from "./newTask";
import { useRef, useEffect, memo } from "react";

import { ICardProps } from "@/app/types/card.types";

import { useUIStore } from "@/lib/ui.store";
import { useDraftTaskUIStore } from "@/lib/draft-ui.store";
import TasksList from "./tasksList";
import { useTasksUIStore } from "@/lib/tasks.store";

export default memo(Card);

function Card({ isActive, title, period, isMobile }: ICardProps) {
	const ids = useTasksUIStore((s) => s.taskIdsByPeriod[period]);

	const isOpened = useUIStore((s) => s.isOpened);
	const draftTask = useDraftTaskUIStore((s) =>
		ids ? ids.find((id) => s.draftsById[id]) : null
	);

	const anchorStartRef = useRef<HTMLDivElement | null>(null);
	const anchorEndRef = useRef<HTMLDivElement | null>(null);

	function preventScroll() {
		const anchorStart = anchorStartRef.current;

		if (!anchorStart) return;

		anchorStart.scrollIntoView({ behavior: "auto" });
	}

	function scrollToBottom() {
		const anchorEnd = anchorEndRef.current;

		if (!anchorEnd) return;

		anchorEnd.scrollIntoView({ behavior: "auto" });
	}

	useEffect(() => {
		// mobile: set default scroll
		if (isMobile && draftTask) {
			console.log(`prevent scroll`);
			preventScroll();
		}

		if (isMobile) {
			preventScroll();
		}

		if (!isMobile && isActive && isOpened) {
			console.log(`scroll to bottom`);
			scrollToBottom();
		}
	}, [isActive, isOpened, isMobile, draftTask]);

	return (
		<>
			<div
				data-id={period}
				className={`transition flex flex-col w-full shrink-0 w-[100dvw] sm:max-h-[100%] bg-pale-blue dark:bg-gloomy dark:sm:border-surface-50 sm:rounded-md sm:border-dark-50 sm:w-[33.333%] sm:shrink overflow-hidden`}
			>
				{title && (
					<span className="font-poppins font-semibold text-base p-3 bg-dark-100 dark:bg-gloomy dark:border-b-[0.5px] dark:border-surface-200 dark:text-surface-800 rounded-t-[6px]">
						{title}
					</span>
				)}

				<div
					className={`sm:overflow-y-auto sm:p-3 relative h-full sm:h-auto desktop-scrollbar`}
				>
					{!isMobile ? (
						<>
							<div ref={anchorStartRef}></div>
							<TasksList ids={ids} isMobile={isMobile}>
								<NewTask isOpened={isOpened && isActive} period={period} />
							</TasksList>
							<div ref={anchorEndRef}></div>
						</>
					) : (
						isMobile && (
							<>
								<div ref={anchorStartRef}></div>
								<TasksList ids={ids} isMobile={isMobile}></TasksList>
								<div ref={anchorEndRef}></div>
							</>
						)
					)}
				</div>
			</div>
		</>
	);
}

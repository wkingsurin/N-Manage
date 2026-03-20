"use client";

import {
	ICardsListProps,
	ICardsType,
	IDraftTask,
} from "@/app/types/cards-list.types";
import Card from "./card";
import { useState } from "react";

export default function CardsList({ tasksUI }: ICardsListProps) {
	const [draftTask, setDraftTask] = useState<IDraftTask | null>(null);

	const cards: ICardsType[] = [
		{ title: "Today", period: "today" },
		{ title: "This week", period: "week" },
		{ title: "This month", period: "month" },
	];

	function getTasksByPeriod(period: string) {
		return tasksUI.filter((task) => task.period === period);
	}

	function getCards() {
		return cards.map((card) => (
			<Card
				key={card.title}
				title={card.title}
				period={card.period}
				tasksFromDB={getTasksByPeriod(card.period)}
				draftTask={draftTask}
				setDraftTask={setDraftTask}
			/>
		));
	}

	return (
		<div
			className={`flex flex-row w-full py-3 gap-4 items-start overflow-x-auto scrollbar-hide px-3 sm:overflow-hidden scroll-smooth snap-mandatory snap-x touch-pan-x`}
		>
			{getCards()}
		</div>
	);
}

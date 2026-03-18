"use client";

import { ICardsListProps, ICardsType } from "@/app/types/cards-list.types";
import Card from "./card";
import { useState } from "react";

export default function CardsList({ tasksUI }: ICardsListProps) {
	const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

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
				editingTaskId={editingTaskId}
				setEditingTaskId={setEditingTaskId}
			/>
		));
	}

	return <>{getCards()}</>;
}

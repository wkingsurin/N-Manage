"use client";

import { ICardsListProps, ICardsType } from "@/app/types/cards-list.types";
import Card from "./card";
import { memo } from "react";
import { useUIStore } from "@/lib/ui.store";

export default memo(CardsList);

function CardsList({ isMobile }: ICardsListProps) {
	const activeTab = useUIStore((s) => s.creatingTaskTab);

	const cards: ICardsType[] = [
		{ title: "Today", period: "today" },
		{ title: "This week", period: "week" },
		{ title: "This month", period: "month" },
	];

	function getCards() {
		return cards.map((card) => {
			const isActive = activeTab === card.period;

			return (
				<Card
					key={card.period}
					isMobile={isMobile}
					isActive={isActive}
					title={card.title}
					period={card.period}
				/>
			);
		});
	}

	return <>{getCards()}</>;
}

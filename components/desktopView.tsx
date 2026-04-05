"use client";

import CardsList from "@/components/cardsList";

export default function DesktopView() {
	return (
		<div className="desktop relative flex flex-row w-full gap-3">
			<CardsList />
		</div>
	);
}

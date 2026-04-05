import { ID, Period } from "./shared.types";

export interface ICardsListProps {
	isMobile?: boolean
}

export interface ICardsType {
	title: string;
	period: Period;
}

export interface IDraftTask {
	id: ID;
	text: string;
}

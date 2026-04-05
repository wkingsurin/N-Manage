import { Period } from "./shared.types";

export interface ICardProps {
	isActive: boolean;
	title?: string;
	period: Period;
	isMobile?: boolean;
}

export interface ICreatingCardProps {
	title: string;
	period: Period;
}

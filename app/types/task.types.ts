export interface ITask {
	id: string | undefined;
	text: string | undefined;
	edit: boolean;
	status: string;
	period: 'today' | 'week' | 'month' | undefined;
}

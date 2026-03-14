export interface ITask {
	id: string | undefined;
	text: string | undefined;
	edit: boolean;
	status: string | undefined;
	period: 'today' | 'week' | 'month' | undefined;
}

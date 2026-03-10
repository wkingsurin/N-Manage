export interface ITaskProps {
	data: {
		id: string;
		text: string;
		edit: boolean;
		status: string;
		period: string;
	};
	onClickEdit: (id: string) => void;
}

"use client";

import { useUIStore } from "@/lib/ui.store";
import EditModal from "./editModal";
import ConfirmModal from "./confirmModal";

interface IProps {
	children?: React.ReactNode;
}

export default function Overlay({ children }: IProps) {
	const isOpened = useUIStore((s) => s.isOpenedOverlay);
	const isEditing = useUIStore((s) => s.editModal.isOpened);
	const isConfirm = useUIStore((s) => s.confirmModal.isOpened);

	if (!isOpened) return null;

	return (
		<div className="overlay absolute w-full h-full flex items-center justify-center z-1200 bg-dark-700 dark:bg-gloomy-700">
			{isEditing && !isConfirm && <EditModal />}
			{isConfirm && !isEditing && (
				<ConfirmModal
					type={useUIStore.getState().confirmModal.type}
					title="Confirm"
					description={
						useUIStore.getState().confirmModal.type === "deletion"
							? "Delete task?"
							: "Complete task?"
					}
					deleteText={
						useUIStore.getState().confirmModal.type === "deletion"
							? "Delete"
							: "Complete"
					}
					cancelText="Cancel"
				/>
			)}
			{children}
		</div>
	);
}

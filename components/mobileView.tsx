"use client";

import Card from "./card";
import { useUIStore } from "@/lib/ui.store";
import Toast from "./shared/toast";
// import Undo from "./undo";

export default function MobileView() {
	const isMobile = useUIStore((s) => s.isMobile);
	const activeTab = useUIStore((s) => s.creatingTaskTab);
	// const undo = useUIStore((s) => s.undo);

	return (
		<div className="mobile relative flex w-full overflow-hidden justify-center">
			<Card isActive period={activeTab} isMobile={isMobile} />
			{useUIStore.getState().isOpenedToast && (
				<Toast text="Task saved" isMobile />
			)}
			{/* {undo.isActual && <Undo description="Undo deletion" cancelText="Undo" />} */}
		</div>
	);
}

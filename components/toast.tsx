import { useUIStore } from "@/lib/ui.store";
import { useEffect } from "react";

interface IProps {
	text: string;
	isMobile: boolean;
}

export default function Toast({ text, isMobile = false }: IProps) {
  const isOpened = useUIStore((s) => s.isOpenedToast)

  useEffect(() => {
		const DELAY = 1500;
		const timer = setTimeout(() => {
			useUIStore.getState().updateIsOpenedToast(false);
			clearTimeout(timer);
		}, DELAY);
	}, [isOpened]);

	return (
		<div
			className={`absolute bottom-30 p-3 flex items-center border-[0.5px] border-gloomy-100 text-dark bg-white dark:text-surface-800 dark:border-surface-50 dark:bg-dark rounded-[12px] max-h-10  ${
				!useUIStore.getState().isOpenedToast && "hidden"
			}`}
		>
			<p className="text-base">{text}</p>
		</div>
	);
}

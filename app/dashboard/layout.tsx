import { auth } from "@/auth";
import MobileNavigation from "@/components/navigation";
import Tabbar from "@/components/tabbar";
import { redirect, RedirectType } from "next/navigation";
import isMobileDevice from "@/components/hooks/isMobileDevice";
import { NAVIGATION_BUTTONS } from "../utils/config";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session) {
		redirect("/sign-in", RedirectType.replace);
	}

	const isMobile = await isMobileDevice();

	return (
		<div
			className="w-full relative flex flex-col items-center"
			style={{ height: "calc(100dvh - 60px - 10px)" }}
		>
			<div
				className="max-w-[1280px] w-full mx-auto h-[100%] box-border sm:px-4 sm:pb-[10px]"
				style={{ height: `calc(100dvh - 50px - 76px)` }}
			>
				<div className="flex flex-col items-start text-dark bg-white dark:bg-dark border-b-[0.5px] border-dark-50 sm:shadow-md sm:rounded-md h-[100%]">
					{isMobile ? (
						<MobileNavigation buttons={NAVIGATION_BUTTONS.tabs} />
					) : (
						<>
							<h1 className="font-poppins font-semibold text-dark dark:text-surface-800 text-xl py-4 px-5">
								My Board
							</h1>
							<hr className="w-full h-1 bg-dark-300 dark:bg-gloomy-300 sm:bg-dark-50" />
						</>
					)}

					<div
						className={`flex flex-row flex-1 w-full md:gap-3 md:p-3 overflow-hidden`}
					>
						{children}
					</div>
				</div>
			</div>
			<Tabbar />
		</div>
	);
}

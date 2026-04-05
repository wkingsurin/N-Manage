"use client";

import MobileNavigation from "@/components/navigation";
import { NAVIGATION_BUTTONS } from "../utils/config";
import { Button } from "@/components/ui/button";
import { Globe, KeyRound, LogOut, Mail, Palette } from "lucide-react";
import { setTheme } from "../actions/theme";
import { useUIStore } from "@/lib/ui.store";
import SignOutButton from "@/components/shared/signOutButton";

export default function Profile() {
	const onChagneTheme = async () => {
		const theme = useUIStore.getState().theme;
		const nextTheme = theme === "dark" ? "light" : "dark";
		useUIStore.getState().updateTheme(nextTheme);
		await setTheme(nextTheme);
	};

	return (
		<div className="flex flex-col size-full">
			<MobileNavigation buttons={NAVIGATION_BUTTONS.profile} />
			<div className="flex flex-col gap-6 p-3">
				<div className="flex flex-col gap-[6px] items-start">
					<span className="font-medium text-[18px]">Account</span>
					<div className="flex flex-col gap-[6px] items-start">
						<div className="flex gap-[10px] items-center bg-dark-100 dark:bg-surface-100 hover:dark:bg-surface-400 rounded-md px-3 py-[10px] h-10">
							<Mail className="size-5 stroke-dark dark:stroke-surface-800" />
							<div className="flex gap-1 text-dark dark:text-surface-800 text-base font-medium">
								<span>Emall:</span>
								<p className="font-normal">john@example.com</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-[6px] items-start">
					<span className="font-medium text-[18px]">Settings</span>
					<div className="flex flex-col gap-[6px] items-start">
						<Button
							className="flex gap-[10px] items-center bg-dark-100 hover:bg-dark-400 dark:bg-surface-100 hover:dark:bg-surface-400 rounded-md px-3 py-[10px] h-10"
							onClick={onChagneTheme}
						>
							<Palette className="size-5 stroke-dark dark:stroke-surface-800" />
							<div className="flex gap-1 text-dark dark:text-surface-800 text-base font-medium">
								<span>Theme:</span>
								<p className="font-normal">{useUIStore.getState().theme}</p>
							</div>
						</Button>
						<Button className="flex gap-[10px] justify-start items-center bg-dark-100 hover:bg-dark-400 dark:bg-surface-100 hover:dark:bg-surface-400 rounded-md px-3 py-[10px] h-10">
							<Globe className="size-5 stroke-dark dark:stroke-surface-800" />
							<div className="flex gap-1 text-dark dark:text-surface-800 text-base font-medium">
								<span>Language</span>
							</div>
						</Button>
					</div>
				</div>
				<div className="flex flex-col gap-[6px] items-start">
					<span className="font-medium text-[18px]">Security</span>
					<div className="flex flex-col gap-[6px] items-start">
						<Button className="flex gap-[10px] items-center bg-dark-100 hover:bg-dark-400 dark:bg-surface-100 hover:dark:bg-surface-400 rounded-md px-3 py-[10px] h-10">
							<KeyRound className="size-5 stroke-dark dark:stroke-surface-800" />
							<div className="flex gap-1 text-dark dark:text-surface-800 text-base font-medium">
								<span>Change password</span>
							</div>
						</Button>
						<SignOutButton className="flex gap-[10px] justify-start items-center bg-overdue-200 hover:bg-overdue-400 rounded-md px-3 py-[10px] h-10 text-overdue text-base font-medium">
							<LogOut className="size-5 stroke-overdue" />
							Log out
						</SignOutButton>
					</div>
				</div>
				<div></div>
			</div>
		</div>
	);
}

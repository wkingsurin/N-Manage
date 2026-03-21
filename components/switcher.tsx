"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { MouseEvent, useState } from "react";

type Tab = "today" | "week" | "month";

export default function Switcher() {
	const [activeTab, setActiveTab] = useState<"today" | "week" | "month">(
		"today"
	);

	const onClick = (e: MouseEvent<HTMLButtonElement>) => {
		const id = e.currentTarget.dataset.id as Tab | undefined;

		if (id === undefined) return;

		setActiveTab(id);
	};

	return (
		<div className="w-full px-3 mt-3 sm:hidden">
			<div className="flex justify-between p-2 border rounded-[12px] gap-3 border-dark-300">
				<Link href="#today" className="flex flex-1">
					<Button
						data-id="today"
						className={`h-11 w-full ${
							activeTab === "today"
								? "bg-dark hover:bg-dark"
								: "bg-dark-200  hover:bg-dark-300"
						} rounded-[12px]`}
						onClick={onClick}
					>
						Today
					</Button>
				</Link>
				<Link href="#week" className="flex flex-1">
					<Button
						data-id="week"
						className={`h-11 w-full ${
							activeTab === "week"
								? "bg-dark hover:bg-dark"
								: "bg-dark-200 hover:bg-dark-300"
						} rounded-[12px]`}
						onClick={onClick}
					>
						Week
					</Button>
				</Link>
				<Link href="#month" className="flex flex-1">
					<Button
						data-id="month"
						className={`h-11 w-full ${
							activeTab === "month"
								? "bg-dark hover:bg-dark"
								: "bg-dark-200 hover:bg-dark-300"
						} rounded-[12px]`}
						onClick={onClick}
					>
						Month
					</Button>
				</Link>
			</div>
		</div>
	);
}

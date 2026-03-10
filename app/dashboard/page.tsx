import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

import Card from "@/components/card";

export default async function Dashboard() {
	const session = await auth();

	if (!session) {
		redirect("/sign-in", RedirectType.replace);
	}

	return (
		<div className="w-full" style={{height: "calc(100vh - 60px - 10px)"}}>
			<div className="container mx-auto h-[100%] pb-[10px] box-border px-4">
				<div className="flex flex-col items-start text-dark bg-white broder border-dark-50 shadow-md rounded-md h-[100%]">
					<h1 className="font-poppins font-semibold text-xl py-4 px-5">
						My Board
					</h1>
					<hr className="w-full h-1 bg-dark-50" />
					<div className="flex w-full p-3 gap-4 items-start">
						<Card title="Today" period="today" />
						<Card title="This week" period="week" />
						<Card title="This month" period="month" />
						{/* <div className="flex flex-col p-3 bg-pale-blue rounded-md border border-dark-50 gap-3 w-[33.333%]">
							<span className="font-poppins font-semibold text-base">
								Today
							</span>
							<ul className="flex flex-col gap-2">
								<li className="flex gap-[10px] items-center justify-between bg-white hover:shadow-md rounded-md py-[10px] px-3">
									<div className="flex gap-1 items-center">
										<input
											type="text"
											value="Create Header Component"
											contentEditable="false"
										/>
										<span>
											<Pencil size={16} />
										</span>
									</div>
									<span>
										<Check size={16} className="hover:stroke-completed" />
									</span>
								</li>
								<li className="flex gap-1 items-center text-dark-500 bg-dark-50 hover:bg-dark-100 hover:text-dark-700 rounded-md py-[10px] px-3">
									<Plus size={16} />
									<span>Add new task</span>
								</li>
							</ul>
						</div>
						<div className="flex flex-col p-3 bg-pale-blue rounded-md border border-dark-50 gap-3 w-[33.333%]">
							<span className="font-poppins font-semibold text-base">
								Today
							</span>
							<ul className="flex flex-col gap-2">
								<li className="flex gap-1 items-center text-dark-500 bg-dark-50 hover:bg-dark-100 hover:text-dark-700 rounded-md py-[10px] px-3">
									<Plus size={16} />
									<span>Add new task</span>
								</li>
							</ul>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}

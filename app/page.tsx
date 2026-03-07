import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="w-full">
			<div className="container box-border px-4 mx-auto flex flex-col gap-4 max-w-3xl text-center mt-40">
				<h1 className="font-poppins text-5xl/18 text-dark font-bold">
					Manage your tasks and organize processes
				</h1>
				<div className="flex flex-col gap-1 items-center">
					<Link href="/sign-up">
						<Button className="bg-primary text-white px-4 py-3 rounded-md">
							Start for free
						</Button>
					</Link>
					<p className="text-dark-500">Free forever. No credit card required</p>
				</div>
			</div>
		</div>
	);
}

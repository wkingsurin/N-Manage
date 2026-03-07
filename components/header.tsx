import { CalendarClock } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
	return (
		<header className="h-15 shadow-md">
			<div className="container box-border px-4 mx-auto h-full flex justify-between items-center">
				<Link href="/" className="flex gap-1 items-center">
					<CalendarClock className="stroke-dark" />
          <p className="text-dark">N Manage</p>
				</Link>
        <div className="flex gap-4">
          <Link href='/sign-in'>
            <Button className="bg-primary text-white px-4 py-3 rounded-md">Sign in</Button>
          </Link>
          <Link href='/sign-up'>
            <Button className="bg-secondary text-white px-4 py-3 rounded-md">Sign up</Button>
          </Link>
        </div>
			</div>
		</header>
	);
}

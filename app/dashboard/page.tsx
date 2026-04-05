import isMobileDevice from "@/components/hooks/isMobileDevice";
import { getTasks } from "../actions/task.actions";
import { mapTaskFromDB } from "../mappers/task.mapper";
import MobileView from "@/components/mobileView";
import DesktopView from "@/components/desktopView";
import TasksHydrator from "@/lib/tasks-hydrator";

export default async function Dashboard() {
	const tasksFromDB = await getTasks();
	const tasksUI = tasksFromDB.map(mapTaskFromDB);

	const isMobile = await isMobileDevice();

	return (
		<>
			<TasksHydrator tasks={tasksUI} isMobile={isMobile} />
			{isMobile ? <MobileView /> : <DesktopView />}
		</>
	);
}

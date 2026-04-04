import { headers } from "next/headers";
import { userAgent } from "next/server";

export default async function isMobileDevice() {
	const { device } = userAgent({ headers: await headers() });
	console.log(`[isMobile]:`, device.type === "mobile");
	return device.type === "mobile";
}

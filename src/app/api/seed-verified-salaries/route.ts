import { NextRequest, NextResponse } from "next/server";
import { seedVerifiedSalaries } from "./seed-verified-salaries";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  if (code !== "seedDat") {
    return new NextResponse("Forbidden", { status: 403 });
  }
  try {
    await seedVerifiedSalaries();
  } catch (e) {
    console.error("Firebase write error", e);
    throw new Error("Firebase write error", { cause: e });
  }
  return NextResponse.json({ success: true });
};

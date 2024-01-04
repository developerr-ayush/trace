import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  let id = parseInt(request.nextUrl.pathname.split("/")[3]);
  let issue = await prisma.issues.findUnique({
    where: {
      id: id,
    },
  });
  if (issue == null)
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  console.log(issue);
  return NextResponse.json(issue);
}

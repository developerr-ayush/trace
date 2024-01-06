import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/createIssueSchema";

export async function GET(request: NextRequest) {
  let id = parseInt(request.nextUrl.pathname.split("/")[3]);
  let issue = await prisma.issues.findUnique({
    where: {
      id: id,
    },
  });
  if (issue == null)
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  return NextResponse.json(issue);
}
export async function PATCH(request: NextRequest) {
  let body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  console.log(validation);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  let id = parseInt(request.nextUrl.pathname.split("/")[3]);
  try {
    let issue = await prisma.issues.update({
      where: { id: id },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
      },
    });
    if (issue == null)
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    return NextResponse.json(issue);
  } catch (e: any) {
    return NextResponse.json({ error: e }, { status: 404 });
  }
}
export async function DELETE(request: NextRequest) {
  let id = parseInt(request.nextUrl.pathname.split("/")[3]);
  let issue = await prisma.issues.delete({
    where: {
      id: id,
    },
  });
  if (issue == null)
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  return NextResponse.json(issue);
}
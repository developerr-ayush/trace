import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../createIssueSchema";
export async function POST(request: NextRequest) {
  const body: any = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const newIssue = await prisma.issues.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
export async function GET(request: NextRequest) {
  let allIssues = await prisma.issues.findMany();
  return NextResponse.json(allIssues);
}

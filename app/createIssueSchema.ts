import { z } from "zod";

export let createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  status: z
    .literal("OPEN")
    .or(z.literal("IN_PROGRESS"))
    .or(z.literal("CLOSED")),
});

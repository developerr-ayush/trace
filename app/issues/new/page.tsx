"use client"
import React from 'react'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';
interface IssueForm {
    title: String,
    description: String
}
const NewissuePage = () => {
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const router = useRouter();
    return (
        <form className='max-w-xl'
            onSubmit={handleSubmit(async (data) => {
                axios.post("/api/issues", data);
                router.push("/issues")
            })}
        >
            <TextField.Root>
                <TextField.Input placeholder="Search the docs…" {...register("title")} />
            </TextField.Root>
            <Controller name="description"
                control={control}
                render={({ field }) => <SimpleMDE className="my-4" placeholder="Reply to comment…" {...field} />}
            />
            <Button>
                Create Issue
            </Button>


        </form>
    )
}

export default NewissuePage
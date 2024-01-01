"use client"
import React, { useState } from 'react'
import { Button, Callout, CalloutIcon, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/createIssueSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>

const NewissuePage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const router = useRouter();
    const [error, setError] = useState("")
    return (
        <div className='max-w-xl'>
            {error &&
                <Callout.Root color="red" className='mb-5'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>}

            <form
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post("/api/issues", data);
                        router.push("/issues")
                    } catch (e) {
                        setError("Something went wrong")
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input placeholder="Search the docs…" {...register("title")} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE className="my-4" placeholder="Reply to comment…" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>
                    Create Issue
                </Button>


            </form>
        </div>
    )
}

export default NewissuePage
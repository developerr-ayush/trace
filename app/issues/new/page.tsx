"use client"
import React, { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/createIssueSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { useRouter } from 'next/navigation';
type IssueForm = z.infer<typeof createIssueSchema>

const NewissuePage = () => {
    const { push } = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const onSubmit = async (data: any) => {
        try {
            setIsSubmitting(true)
            await axios.post("/api/issues", data);
            push("/issues")
        } catch (e) {
            setError("Something went wrong")
            setIsSubmitting(false)
        }
    }
    return (
        <div className='max-w-xl'>
            {error &&
                <Callout.Root color="red" className='mb-5'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>}

            <form
                onSubmit={handleSubmit(onSubmit)}
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
                <Button disabled={isSubmitting}>
                    Create Issue
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default NewissuePage
"use client"
import React, { useState } from 'react'
import { Button, Callout, CalloutIcon, TextField } from '@radix-ui/themes'
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
                <Controller name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE className="my-4" placeholder="Reply to comment…" {...field} />}
                />
                <Button>
                    Create Issue
                </Button>


            </form>
        </div>
    )
}

export default NewissuePage
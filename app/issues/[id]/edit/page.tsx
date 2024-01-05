"use client"
import React, { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/createIssueSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { useRouter } from 'next/navigation';
import { Alert } from '@mui/material'
import { getRequest } from '@/app/FactoryFunction';
type IssueForm = z.infer<typeof createIssueSchema>
interface dataType {
    id: number,
    title: string,
    description: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
}
interface pageProps {
    params: { id: number }
}
const EditissuePage: FC<pageProps> = ({ params }) => {
    const [issue, setIssue] = useState<any>(null)
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
    useEffect(() => {
        getRequest(`/api/issues/${params.id}`).then(res => {
            if (!res.error)
                setIssue(res)
        })
    }, [])
    return (
        <div className='max-w-xl'>
            {error &&
                <Alert severity="error" className='mb-4'>{error}</Alert>
            }
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                noValidate
                autoComplete="off"
            >
                <div className="mb-4">
                    <TextField helperText={errors.title?.message} error={!!errors.title?.message} id="outlined-basic" label="Title" variant="outlined" className='w-full' {...register("title")} />
                </div>
                <Controller name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE className="my-4" placeholder="Description..." {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    Create Issue
                    {isSubmitting && <Spinner />}
                </Button>
            </Box>
        </div>
    )
}

export default EditissuePage
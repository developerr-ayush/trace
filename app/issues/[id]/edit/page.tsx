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
import { Alert, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { formatDate, getRequest } from '@/app/FactoryFunction';
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
const initialValues = {
    title: "",
    description: "",
    status: "string",
}
const EditissuePage: FC<pageProps> = ({ params }) => {
    const { push } = useRouter();

    const [issue, setIssue] = useState<any>(null)
    const [error, setError] = useState<any>("")
    const [errors, setErrors] = useState<any>(initialValues)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    console.log(issue)
    const handleSubmit = async (data: any) => {
        data.preventDefault()
        try {
            setIsSubmitting(true)
            await axios.patch(`/api/issues/${params.id}`, issue);
            push("/issues")
        } catch (e) {
            setError("Something went wrong")
            setIsSubmitting(false)
        }
    }
    const handleChange = (data: string, value: string) => {
        setIssue({ ...issue, [data]: value })
    }
    useEffect(() => {
        getRequest(`/api/issues/${params.id}`).then(res => {
            if (!res.error)
                setIssue(res)
        })
    }, [])
    return issue ? (
        <div className='max-w-xl'>
            {error &&
                <Alert severity="error" className='mb-4'>{error}</Alert>
            }
            <Box
                onSubmit={handleSubmit}
                component="form"
                noValidate
                autoComplete="off"
            >
                <div className="mb-4 md:flex">
                    <div className="w-[70%]">Last updated at {formatDate(issue.updatedAt)}</div>
                    <div className="w-[30%]">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={issue.status}
                                label="Status"
                                onChange={(e: any) => handleChange("status", e.target.value)}
                            >
                                <MenuItem value="OPEN">Open</MenuItem>
                                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                                <MenuItem value="CLOSED">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="mb-4">
                    <TextField helperText={errors.title} error={!!errors.title} id="outlined-basic" label="Title" variant="outlined" className='w-full' name="title" value={issue.title} onChange={(e) => handleChange("title", e.target.value)} />
                </div>
                <div className="mb-4">
                    <SimpleMDE value={issue.description} onChange={(e) => { handleChange("description", e) }} />
                </div>
                <div>
                    <Button disabled={isSubmitting}>
                        Edit Issue
                        {isSubmitting && <Spinner />}
                    </Button>
                </div>
            </Box>
        </div>
    ) : (<div>
        <h3 className="text-xl">Page Not Found</h3>
    </div>)

}

export default EditissuePage
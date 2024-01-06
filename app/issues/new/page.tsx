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
    status: "OPEN"
}
const EditissuePage: FC<pageProps> = ({ params }) => {
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [issue, setIssue] = useState<any>(initialValues)
    const [error, setError] = useState<any>("")
    const [errors, setErrors] = useState<any>(initialValues)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const handleSubmit = async (data: any) => {
        data.preventDefault()
        try {
            setIsSubmitting(true)
            await axios.post(`/api/issues`, issue);
            push("/issues")
        } catch (e) {
            setError("Something went wrong")
            setIsSubmitting(false)
        }
    }
    const handleChange = (data: string, value: string) => {
        setIssue({ ...issue, [data]: value })
    }
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
                <div className="mb-4">
                    <TextField helperText={errors.title} error={!!errors.title} id="outlined-basic" label="Title" variant="outlined" className='w-full' name="title" value={issue.title} onChange={(e) => handleChange("title", e.target.value)} />
                </div>
                <div className="mb-4">
                    <SimpleMDE value={issue.description} onChange={(e) => { handleChange("description", e) }} />
                </div>
                <div>
                    <Button disabled={isSubmitting}>
                        Create Issue
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
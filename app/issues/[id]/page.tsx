"use client"
import { formatDate, getRequest } from "@/app/FactoryFunction"
import Status from "@/app/components/Status"
import { Delete, Edit } from "@mui/icons-material"
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import Link from "next/link"
import { FC, useEffect, useState } from "react"
import React from 'react'

interface pageProps {
    params: { id: number }
}
interface dataType {
    id: number,
    title: string,
    description: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
}
const IssueDetail: FC<pageProps> = ({ params }) => {
    const [issue, setIssue] = useState<any>(null)
    const [asssignee, setAssignee] = useState("Ayush")
    const handleAssignee = (e: SelectChangeEvent) => {
        setAssignee(e.target.value)
    }
    const handleEdit = () => {

    }
    useEffect(() => {
        getRequest(`/api/issues/${params.id}`).then(res => {
            if (!res.error)
                setIssue(res)
        })
    }, [])
    return issue ? (

        <div className="md:flex gap-4">
            <div className="w-[70%] content">

                <h2 className="text-sm">{issue.id}</h2>
                <h2 className="text-xl my-3 font-bold">{issue.title}</h2>
                <div className="flex gap-3">

                    <Status status={issue.status} />
                    <p>{formatDate(issue.createdAt)}</p>
                </div>
                <div className="border rounded-md border-solid border-black my-4 p-3">
                    <p>{issue.description}</p>
                </div>
            </div>
            <div className="action flex flex-col gap-2 flex-1">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={asssignee}
                        label="Age"
                        onChange={handleAssignee}
                    >
                        <MenuItem value={10}>Ayush</MenuItem>
                        <MenuItem value={20}>Neha</MenuItem>
                        <MenuItem value={30}>Someone You Dont Know</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" className="w-full" onClick={handleEdit}>
                    <Link href={`/issues/${params.id}/edit`}>
                        <Edit />
                        EDIT
                    </Link>
                </Button>

                <Button variant="outlined" className="w-full" color="error">
                    <Delete />
                    DELETE
                </Button>

            </div>
        </div>
    ) : (<div>
        <h3 className="text-xl">Page Not Found</h3>
    </div>)


}

export default IssueDetail
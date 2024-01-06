"use client"
import { formatDate, getRequest } from "@/app/FactoryFunction"
import Spinner from "@/app/components/Spinner"
import Status from "@/app/components/Status"
import { Delete, Edit } from "@mui/icons-material"
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import axios from "axios"
import Link from "next/link"
import { FC, useEffect, useState } from "react"
import React from 'react'
import { useRouter } from 'next/navigation';

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
    const { push } = useRouter();

    const [issue, setIssue] = useState<any>(null)
    const [asssignee, setAssignee] = useState("Ayush")
    const [isDeleting, setIsDeleting] = useState(false)
    const handleAssignee = (e: SelectChangeEvent) => {
        setAssignee(e.target.value)
    }
    let handleDelete = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`/api/issues/${params.id}`)
            push("/issues")

        } catch (e) {
            setIsDeleting(false);
        }
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
                {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={asssignee}
                        label="Assignee"
                        onChange={handleAssignee}
                    >
                        <MenuItem value="Ayush">Ayush</MenuItem>
                        <MenuItem value="Neha">Neha</MenuItem>
                        <MenuItem value="No-idea">Someone You Dont Know</MenuItem>
                    </Select>
                </FormControl> */}
                <Button variant="outlined" className="w-full">
                    <Link href={`/issues/${params.id}/edit`}>
                        <Edit />
                        EDIT
                    </Link>
                </Button>

                <Button variant="outlined" className="w-full" color="error" onClick={handleDelete} disabled={isDeleting}>
                    <Delete />
                    DELETE
                    {isDeleting && <Spinner />}

                </Button>

            </div>
        </div>
    ) : (<div>
        <h3 className="text-xl">Page Not Found</h3>
    </div>)


}

export default IssueDetail
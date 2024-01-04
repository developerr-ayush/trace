"use client"
import { formatDate, getRequest } from "@/app/FactoryFunction"
import Status from "@/app/components/Status"
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
    useEffect(() => {
        getRequest(`/api/issues/${params.id}`).then(res => {
            if (!res.error)
                setIssue(res)
        })
    }, [])
    return issue ? (
        <div>
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
    ) : (<div>
        <h3 className="text-xl">Page Not Found</h3>
    </div>)


}

export default IssueDetail
"use client"
import { FC } from "react"
import React from 'react'

interface pageProps {
    params: { id: number }
}
const IssueDetail: FC<pageProps> = ({ params }) => {
    return (
        <div>{params.id}</div>
    )
}

export default IssueDetail
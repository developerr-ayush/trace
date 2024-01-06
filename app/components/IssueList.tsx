"use client"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import Status from './Status'
import Link from 'next/link'
import { formatDate } from '../FactoryFunction'
interface issuelistType {
    rows: any
}
const IssueList = ({ rows }: issuelistType) => {
    return (
        <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Issue Name</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!!rows && rows.map((row: any) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell scope="row">
                                <Link href={`/issues/${row.id}`}>
                                    {row.id}. {row.title}
                                </Link>
                            </TableCell>
                            <TableCell align="right"><Status status={row.status} /></TableCell>
                            <TableCell align="right">{formatDate(row.createdAt)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default IssueList
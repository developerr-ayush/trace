"use client"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import Status from './Status'
interface issuelistType {
    rows: any
}
const IssueList = ({ rows }: issuelistType) => {
    return (
        <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Issue Id</TableCell>
                        <TableCell align="right">Issue Name</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows ? rows.map((row: any) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.title}</TableCell>
                            <TableCell align="right">{Status(row.status)}</TableCell>
                            <TableCell align="right">{row.createdAt}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    )) : <div className="Error">Something went wrong</div>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default IssueList
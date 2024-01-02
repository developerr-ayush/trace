"use client"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react'
let issuelist = [
    "OPEN",
    "IN_PROGRESS",
    "COMPLETED",
]
const DropDown = () => {
    const [currentIssue, setCurrentIssue] = useState(0)
    const handleChange = (event: SelectChangeEvent) => {
        setCurrentIssue(event.target.value);
    };
    return (
        <>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="issueList">Age</InputLabel>
                    <Select
                        labelId="issueList"
                        id="issueList"
                        value={issuelist[currentIssue]}
                        label="Age"
                        onChange={handleChange}
                    >
                        {issuelist.map((issue, i) => {
                            return <MenuItem key={i} value={i}>value={issue}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
        </>

    )
}

export default Select
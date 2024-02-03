"use client"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

interface dropdownType {
    issueList: any,
    dbIssueList: any,
    selected: any
}
const DropDown = ({ issueList, dbIssueList, selected }: dropdownType) => {
    const { push } = useRouter();
    const [active, setActive] = useState(dbIssueList.indexOf(selected) ?? 0)
    const handleChange = (event: any) => {
        setActive(event.target.value);
        push(event.target.value == 0 ? "/issues" : `?status=${dbIssueList[event.target.value]}`);
    };
    return (
        <>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={active ?? 0}
                        label="Status"
                        onChange={handleChange}
                    >
                        {issueList.map((iss: any, i: any) => {
                            return <MenuItem key={i} value={i}>{iss}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
        </>

    )
}

export default DropDown
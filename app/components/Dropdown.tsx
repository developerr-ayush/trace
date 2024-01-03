"use client"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react'
interface dropdownType {
    issueList: any,
    filter: any,
    setFilter: any
}
const DropDown = ({ issueList, filter, setFilter }: dropdownType) => {
    const handleChange = (event: any) => {
        setFilter(event.target.value);
    };
    return (
        <>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
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
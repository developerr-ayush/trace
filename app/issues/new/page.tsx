"use client"
import React from 'react'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
const NewissuePage = () => {
    return (
        <div className='max-w-xl'>
            <TextField.Root>
                <TextField.Input placeholder="Search the docs…" />
            </TextField.Root>
            <SimpleMDE className="my-4" placeholder="Reply to comment…" />
            <Button>
                Create Issue
            </Button>


        </div>
    )
}

export default NewissuePage
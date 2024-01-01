"use client"
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewissuePage = () => {
    return (
        <div className='max-w-xl'>
            <TextField.Root>
                <TextField.Input placeholder="Search the docs…" />
            </TextField.Root>
            <TextArea className="my-4" placeholder="Reply to comment…" />
            <Button>
                Create Issue
            </Button>


        </div>
    )
}

export default NewissuePage
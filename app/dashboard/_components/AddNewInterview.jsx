"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';



const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center' >
                    + Add New
                </h2>

            </div>
            <Dialog open={openDialog}>

                <DialogContent className='max-w-2xl'>
                    <DialogHeader >
                        <DialogTitle className='text-2xl'>
                            Tell us more about Job you are interviewing
                            <p className='text-gray-500 text-sm'>Add Details about job position, Your skills and Years of exprerience</p>

                        </DialogTitle>
                        <DialogDescription>
                            <div>
                                <label htmlFor="job-role">Job Role/Job Position</label>
                                <Input id='job-role' />
                            </div>

                        </DialogDescription>
                        <div className='flex gap-5 justify-end'>
                            <Button variant={'ghost'} onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button>Start Interview</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview
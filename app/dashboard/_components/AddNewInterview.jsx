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
import { Button, Input, Textarea } from '@/components/ui';




const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobRole, setJobRole] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobExperience, setJobExperience] = useState(0)

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(jobRole, jobDescription, jobExperience);

    }

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


                        </DialogTitle>
                        <DialogDescription className='text-gray-500 text-sm'>
                            Add Details about job position, Your skills and Years of exprerience
                        </DialogDescription>

                        <form action="" onSubmit={onSubmit}>

                            <div>
                                <label htmlFor="job-role">Job Role/Job Position</label>
                                <Input placeholder='Ex. Full Stack Developer' id='job-role' required
                                    onChange={(e) => setJobRole(e.target.value)}
                                />
                            </div>
                            <div className='my-3'>
                                <label htmlFor="job-desc">Job Discription/ Tech Stack (In Short)</label>
                                <Textarea placeholder='Ex. React, Angular, NodeJs, MySql etc' id='job-desc' required
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="Year-Of-Exp">Years of exprerience</label>
                                <Input placeholder='Ex. 2' id='Year-Of-Exp' type={'number'} max='30' min='0' required
                                    onChange={(e) => setJobExperience(e.target.value)}
                                />
                            </div>

                            <div className='flex gap-5 justify-end mt-3'>
                                <Button type='button' variant={'ghost'} onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button type='Submit'>Start Interview</Button>
                            </div>
                        </form>


                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview
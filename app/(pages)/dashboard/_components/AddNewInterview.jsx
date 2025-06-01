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
import GeminiPrompt from "@/utils/GeminiAiModel";
import { LoaderCircle, PlusIcon } from 'lucide-react';
import { db } from "@/utils/db";
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';




const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobRole, setJobRole] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobExperience, setJobExperience] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [JsonResponse, setJsonResponse] = useState([])
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const InputPrompt = `Job position: ${jobRole}, Job Description: ${jobDescription} , Years of Experience:${jobExperience} , using this info give me ${process.env.NEXT_PUBLIC_QUESTION_COUNT} general not so hard interview questions with answers in JSON format give question answers as fields in JSON`

        try {
            const result = await GeminiPrompt(InputPrompt)
            if (result) {
                setJsonResponse(result)
                const dbRes = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: result,
                        jobDesc: jobDescription,
                        jobExperience: jobExperience,
                        jobPosition: jobRole,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-YYYY'),

                    })
                    .returning({
                        mockID: MockInterview.mockId
                    })

                console.log("Inserted Successfully", dbRes);
                if (dbRes) {
                    setOpenDialog(false)
                    router.push(`/dashboard/interview/${dbRes[0].mockID}`)
                }
            }

        } catch (error) {
            console.log(error);

        } finally { setIsLoading(false) }


    }
    isLoading && <LoaderCircle className='text-primary' />

    return (
        <div>
            <div className='p-5 w-56 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all flex items-center justify-center gap-2'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center flex items-center gap-2' >
                    <PlusIcon className='w-5 h-5' /> Add New
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
                                <Button type='Submit' disabled={isLoading}>
                                    {isLoading ? <div className='flex items-center'><LoaderCircle className='animate-spin' /><p>&nbsp;Generating Questions</p></div> : 'Start Interview'}
                                </Button>
                            </div>
                        </form>


                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div >
    )
}

export default AddNewInterview
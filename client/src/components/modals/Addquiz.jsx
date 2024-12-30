import { Add, Close } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../config';

export default function Addquiz({ setModalClose, items, isHidden }) {
    const user = useSelector((s) => s.auth.user);
    const [formData, setFormData] = useState({
        title: '',
        creator: user._id,
        duration: '',
        questions: [],
        marks: null,
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const newQuiz = { ...formData };
        axios.post(`${BASE_URL}/api/v1/quiz/add/`, newQuiz)
            .then(() => {

            })
            .catch(() => {

            })
            .finally(() => {
                setModalClose(false);
                window.location.reload();
            })
    }
    return (
        <div className='h-screen w-screen bg-opacity-25 px-36 py-24 bg-black fixed top-0 left-0 z-[2099]'>
            <div className={`${!isHidden ? 'w-0 h-0' : ''} rounded-md h-full w-full transition-all ease-linear duration-300 bg-white`}>
                <div className="flex justify-end">
                    <IconButton onClick={() => { setModalClose(false) }} >
                        <Close />
                    </IconButton>
                </div>
                <form onSubmit={submitHandler} className='px-5' >
                    <div className='mb-5 grid grid-cols-3 gap-5' >
                        <TextField required variant='standard' label="Creator" disabled value={user._id} />
                        <TextField required variant='standard' value={formData.title} name='title' onChange={changeHandler} label="Quiz Title" />
                        <TextField required variant='standard' value={formData.questions} name='questions' disabled onChange={changeHandler} label="Questions" />


                        <TextField required variant='standard' type='number' value={formData.marks} name='marks' onChange={changeHandler} label="Quiz Marks" />
                        <TextField required variant='standard' type='number' value={formData.duration} name='duration' onChange={changeHandler} label="Quiz Duration (in minutes)" />

                    </div>
                    <Button type='submit' variant="contained" color="primary"
                        sx={{ color: "#f1f1f1", fontWeight: "bold" }} >Add Quiz <Add /></Button>
                </form>
            </div>
        </div>
    )
}

import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { DayPicker } from 'react-day-picker';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebase.init';
import { toast } from 'react-toastify';

const EditTodos = () => {

    const [date, setDate] = useState(new Date());
    const { id } = useParams();
    const [task, setTask] = useState({});
    const [user] = useAuthState(auth);

    // fetching a single tasks' data 
    useEffect(() => {
        fetch(`http://localhost:5000/edit-task/${id}`)
            .then(res => res.json())
            .then(data => setTask(data))
    }, [id])

    const nameRef = useRef('');
    const desRef = useRef('');
    const dateRef = useRef('');
    const timeRef = useRef('');

    // handling edit task button
    const handleEditTask = event => {
        event.preventDefault();
        const name = nameRef.current.value;
        const des = desRef.current.value;
        const date = dateRef.current.value;
        const time = timeRef.current.value;
        const email = user?.email;
        const allData = {
            name, des, date, time, email
        };

        // editing task with put method 
        if (name && des && date && time && email) {

            fetch(`http://localhost:5000/edit-task/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(allData),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    toast.success("Task updated successfully", {
                        position: "top-center",
                        theme: "colored"
                    });
                });
        }
        else {
            toast.error("Don't leave an input field empty", {
                position: "top-center",
                theme: "colored"
            });
        }

    }

    return (
        <div className="hero py-10 min-h-fit bg-slate-400">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div 
                    className="text-center lg:text-left text-base-100 font-semibold">
                    <h1 className='font-semibold text-center text-base-100 text-3xl mb-5'>Pick a date</h1>
                    <DayPicker className=''
                        mode="single"
                        selected={format(date, "yyyy-MM-dd")}
                        onSelect={setDate}
                    />
                </div>
                <div className="card flex-shrink-0 w-full lg:mr-8 max-w-sm shadow-2xl bg-base-100">
                    <div
                    className="card-body">
                        <h1 className='text-primary text-3xl text-center'>Edit Your Todo</h1>
                        <p className='text-sm text-center'>Current todo is {task.name}</p>
                        <form onSubmit={handleEditTask}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task</span>
                                </label>
                                <input ref={nameRef} placeholder="Edit Task Name" type="text" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input ref={desRef} type="text" placeholder="Edit your description" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task Date</span>
                                </label>
                                <input ref={dateRef} value={format(date, "yyyy-MM-dd")} type="date" placeholder="" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task Time</span>
                                </label>
                                <input ref={timeRef} type="time" placeholder="" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Edit Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTodos;
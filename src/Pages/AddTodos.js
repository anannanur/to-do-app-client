import { format } from 'date-fns';
import React, { useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebase.init';
import { toast } from 'react-toastify';

const AddTodos = () => {

    const [date, setDate] = useState(new Date());
    const [user] = useAuthState(auth);

    const email = user?.email;

    const nameRef = useRef('');
    const desRef = useRef('');
    const dateRef = useRef('');
    const timeRef = useRef('');

    const handleAddTask = event => {
        event.preventDefault();
        const name = nameRef.current.value;
        const des = desRef.current.value;
        const date = dateRef.current.value;
        const time = timeRef.current.value;
        // console.log(name, des, date, time);
        const allData = {
            name, des, date, time, email
        };
        if (email && name && des && date && time) {
            fetch(`http://localhost:5000/tasks`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(allData),
                
            })
                .then((response) => response.json())
                .then((data) => {
                    toast.success("data added successfully",{
                        position: "top-center",
                        theme: "colored"
                    });
                });
        }
        else {
            toast.error("Don't leave an input field empty",{
                position: "top-center",
                theme: "colored"
            });
        }
    }



    return (
        <div className="hero py-10 bg-slate-400">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left text-base-100 font-semibold">
                    <h1 className='font-semibold text-center text-base-100 text-3xl mb-5'>Pick a date</h1>
                    <DayPicker className=''
                        mode="single"
                        selected={format(date, "yyyy-MM-dd")}
                        onSelect={setDate}
                    />
                </div>
                <div className="card flex-shrink-0 w-full lg:mr-8 max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className='text-primary text-3xl text-center'>Add New Todo</h1>
                        <form onSubmit={handleAddTask}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task</span>
                                </label>
                                <input ref={nameRef} type="text" placeholder="Task name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input ref={desRef} type="text" placeholder="Task Description" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task Date</span>
                                </label>
                                <input ref={dateRef} readOnly value={format(date, "yyyy-MM-dd")} type="date" placeholder="" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task Time</span>
                                </label>
                                <input ref={timeRef} type="time" placeholder="" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTodos;
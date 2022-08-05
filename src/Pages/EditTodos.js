import { format } from 'date-fns';
import React, { useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';

const EditTodos = () => {

    const [date, setDate] = useState(new Date());
    const [task, setTask] = useState({})

    const nameRef = useRef('');
    const desRef = useRef('');
    const dateRef = useRef('');
    const timeRef = useRef('');

    // const handleEditTask = event =>{
    //     event.preventDefault();

    // }

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
                        <h1 className='text-primary text-3xl text-center'>Edit Your Todo</h1>
                        <form >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task</span>
                                </label>
                                <input ref={nameRef} type="text"  className="input input-bordered" />
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
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebase.init';
import {useNavigate} from "react-router-dom";

const YourTodos = () => {

    const [user] = useAuthState(auth);
    const email = user?.email;
    const [tasks,setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/your-tasks?email=${email}`)
            .then((response) => response.json())
            .then((data) => setTasks(data));
    }, [email,tasks])

    return (
        <div className='pb-24 px-16 bg-base-100' style={{ height: '100vh' }}>
            <h1 className="text-3xl my-7 font-semibold text-primary text-center">
                These tasks are waiting for you!
            </h1>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Task Description</th>
                            <th>Task Date</th>
                            <th>Task Time</th>
                            <th>Check Completed</th>
                            <th>Edit Task</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {tasks.map(task => <tr className="hover" key={task._id}>
                            <td>{task.name}</td>
                            <td>{task.des}</td>
                            <td>{task.date}</td>
                            <td>{task.time}</td>
                            <td> 
                                <label>
                                    <input type="checkbox" className="checkbox checkbox-primary" />
                                </label>
                            </td>
                            <td>
                                <button tasks={tasks} onClick={() => navigate(`/${task._id}`)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default YourTodos;
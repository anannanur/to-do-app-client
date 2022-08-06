import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebase.init';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const YourTodos = () => {

    const [user] = useAuthState(auth);
    const email = user?.email;
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    // fetching all added todos 
    useEffect(() => {
        fetch(`http://localhost:5000/your-tasks?email=${email}`)
            .then((response) => response.json())
            .then((data) => setTasks(data));
    }, [email, tasks])

    // handling remove button 
    const handleRemoving = (id) => {
        // deleting single data using delete method 
        fetch(`http://localhost:5000/task/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                const remainedTasks = tasks.filter(task => task._id !== id);
                setTasks(remainedTasks);
                toast.success("Task deleted successfully", {
                    position: "top-center",
                    theme: "dark"
                });
            });
    };

    return (
        <div className='pt-20 pb-48 px-16 min-h-fit bg-accent'>
            {tasks?.length !== 0 ?
                <>
                    {tasks?.length > 1 ?
                        <h1  className="text-3xl mt-5 mb-10 font-semibold text-primary text-center">
                            These tasks are waiting for you!
                        </h1>
                        :
                        <h1 className="text-3xl mt-5 mb-10 font-semibold text-primary text-center">
                            One task is waiting for you!
                        </h1>
                    }
                    <div className="overflow-x-auto">
                        <table className="table w-full">
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
                                            <input type="checkbox" onClick={() => handleRemoving(task._id)} className="checkbox checkbox-primary" />
                                        </label>
                                    </td>
                                    <td>
                                        <button onClick={() => navigate(`/edit/${task._id}`)}>
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
                </>
                :
                <div className='flex justify-center items-center h-full'>
                    <h1 className="text-3xl font-semibold text-primary text-center">
                        No task is available for you right now!!
                    </h1>
                </div>
            }
        </div>
    );
};

export default YourTodos;
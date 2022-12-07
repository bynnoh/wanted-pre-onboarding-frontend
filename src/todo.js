import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
    const navigate = useNavigate();
    const [todo, setTodo] = useState('');
    const [data, setData] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [message, setMessage] = useState('');

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        if (token) {
            axios.get('https://pre-onboarding-selection-task.shop/todos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setData(response.data);
                setIsUpdated(false);
            })
            .catch((err) => {
                setMessage(err.response.data.message);
            });
        } else {
            navigate("/");
        }
    }, [isUpdated])

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('https://pre-onboarding-selection-task.shop/todos', 
        {
            todo
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            setIsUpdated(true);
        })
        .catch((err) => {
            setMessage(err.response.data.message);
        });
    }

    const ATodo = ({todo}) => {
        const [nTodo, setNTodo] = useState(todo.todo);
        const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
        const [mod, setMod] = useState(false);

        const comp = () => {
            return todo.isCompleted ? '완료' : '미완료'
        }

        const handleModifyClick = e => {
            setMod(true);
        }

        const handleDeleteClick = e => {
            axios.delete('https://pre-onboarding-selection-task.shop/todos/' + todo.id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setIsUpdated(true);
            })
            .catch((err) => {
                setMessage(err.response.data.message);
            })
        }

        const handleTodoChange = e => {
            setNTodo(e.target.value);
        }

        const handleCompleteChange = e => {
            setIsCompleted(e.target.checked)
        }

        const handleSubmit = e => {
            e.preventDefault();

            axios.put('https://pre-onboarding-selection-task.shop/todos/' + todo.id, 
            {
                todo: nTodo,
                isCompleted: isCompleted
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                setIsUpdated(true);
            })
            .catch((err) => {
                setMessage(err.response.data.message);
            });
        }

        return(
            <div>
                {!mod && 
                <div>
                    {todo.todo} {comp(todo)}
                    <button onClick={handleModifyClick}>
                        수정
                    </button>
                    <button onClick={handleDeleteClick}>
                        삭제
                    </button>
                </div>}
                {mod &&
                <div>
                    <form onSubmit={handleSubmit}>
                        <input value={nTodo} onChange={handleTodoChange}>
                        </input>
                        <input type="checkbox" checked={isCompleted} onChange={handleCompleteChange}>
                        </input>
                        <button type="submit">
                            제출
                        </button>
                    </form>
                </div>}
                {message}
            </div>
        )
    }

    return (
        <div>
            {data.map(todo => (
                <ATodo todo={todo} key={todo.id}></ATodo>
            ))}
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="text" 
                        name="todo" 
                        value={todo}
                        onChange={e => setTodo(e.target.value)}>
                    </input>
                    <button type="submit">
                        추가
                    </button>
                </label>
            </form>
        </div>
    )
}

export default Todo
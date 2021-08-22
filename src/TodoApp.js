import React, { useState, useCallback, useRef } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoApp() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: 'TDD 배우기',
            done: true
        },
        {
            id: 2,
            text: 'react-testing-library 사용하기',
            done: true
        }
    ])
    const nextId = useRef(3);
    const onInsert = useCallback((text) => {
        setTodos(todos.concat({
            id: nextId.current,
            text,
            done: false
        }));
        nextId.current += 1;
    }, [todos]);
    const onToggle = useCallback((id) => {
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    done: !todo.done
                }
            }
            return todo;
        }));
    });
    const onRemove = useCallback((id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }, [todos]);
    return (
        <div>
            <TodoForm onInsert={onInsert} />
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
        </div>
    );
}

export default TodoApp;
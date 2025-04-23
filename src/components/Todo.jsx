import { useCallback, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import TodoStats from './TodoStats';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    const generateId = () => Math.floor(Math.random() * 10000);

    const handleAdd = useCallback((text) => {
        const newTodo = {
            id: generateId(),
            text,
            completed: false,
            createdAt: new Date(),
        };

        setTodos((prev) => [...prev, newTodo]);
    }, []);

    const handleToggle = useCallback((id) => {
        setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    }, []);

    const handleDelete = useCallback((id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }, []);

    const handleEdit = useCallback((id, newText) => {
        setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
    }, []);

    const handleFilterChange = useCallback((newFilter) => {
        setFilter(newFilter);
    }, []);

    const getFilteredTodos = useCallback(() => {
        switch (
            filter // filter 값에 따라 완료 미완료 목록 반환
        ) {
            case 'active':
                return todos.filter((todo) => !todo.completed);
            case 'completed':
                return todos.filter((todo) => todo.completed);
            default:
                return todos;
        }
    }, [filter, todos]);

    const filteredTodos = getFilteredTodos();

    return (
        <div className="max-w-xl mx-auto p-5">
            <h1 className="text-2xl font-bold text-center mb-5">할 일 관리 앱</h1>
            <TodoForm onAdd={handleAdd} />
            <TodoFilter filter={filter} onFilterChange={handleFilterChange} />
            <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
            <TodoStats todos={todos} />
        </div>
    );
};

export default Todo;

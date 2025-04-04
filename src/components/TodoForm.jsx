import { useState } from 'react';

const TodoForm = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex mb-5">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="새로운 할 일을 입력하세요"
                className="flex-1 p-2.5 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="px-4 py-2.5 bg-blue-500 text-white border-none rounded-r-md cursor-pointer hover:bg-blue-600"
            >
                추가
            </button>
        </form>
    );
};

export default TodoForm;

import { memo, useRef, useState } from 'react';

const TodoItem = memo(({ id, text, completed, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef();

    const handleEdit = () => {
        console.log(id);
        // inputRef.current.value = todo.text
        onEdit(id, inputRef.current.value);
        setIsEditing(false);
    };

    return (
        <div className={`flex items-center p-2.5 border-b border-gray-200 ${completed ? 'bg-gray-50' : ''}`}>
            <input type="checkbox" checked={completed} onChange={() => onToggle(id)} className="mr-2" />

            {isEditing ? (
                <div className="flex flex-1">
                    <input ref={inputRef} type="text" className="flex-1 mr-2 p-1.5 border border-gray-300 rounded" />
                    <button onClick={handleEdit} className="px-2 py-1 bg-blue-500 text-white rounded mr-1">
                        저장
                    </button>
                    <button onClick={() => setIsEditing(false)} className="px-2 py-1 bg-gray-300 rounded">
                        취소
                    </button>
                </div>
            ) : (
                <>
                    <span className={`flex-1 ml-2.5 ${completed ? 'line-through text-gray-500' : ''}`}>{text}</span>
                    <button
                        onClick={() => {
                            setTimeout(() => {
                                inputRef.current.value = text;
                            }, 1);
                            setIsEditing(true);
                        }}
                        className="px-2 py-1 bg-yellow-500 text-white rounded mr-1"
                    >
                        수정
                    </button>
                    <button onClick={() => onDelete(id)} className="px-2 py-1 bg-red-500 text-white rounded">
                        삭제
                    </button>
                </>
            )}
        </div>
    );
});

export default TodoItem;

import { FC, useState } from "react";
import { addTodo, removeTodo, editTodo, toggleCompleted } from "@/redux/slices/todoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import { shallowEqual } from "react-redux";
import { Button } from '@/components/ui/button';
import { useTheme } from "next-themes";

const Todos:FC = () => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        deadline: ""
    });
    const [isAddingTodo, setIsAddingTodo] = useState(false);
    const [newTodoForm, setNewTodoForm] = useState({
        title: "",
        description: "",
        deadline: ""
    });
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'overdue' | 'completed'>('all');

    const todos= useAppSelector((state) => {
        const val =state.todo.todos;
        return val;
    }, shallowEqual);
   
    const dispatch = useAppDispatch();
    const { theme, setTheme } = useTheme();

    // Filter logic
    const currentDate = new Date().toISOString().split('T')[0];
    
    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case 'completed':
                return todo.completed;
            case 'upcoming':
                return !todo.completed && todo.deadline >= currentDate;
            case 'overdue':
                return !todo.completed && todo.deadline < currentDate;
            default:
                return true;
        }
    });

    const handleEdit = (todo: any) => {
        setEditingId(todo.id);
        setEditForm({
            title: todo.title,
            description: todo.description,
            deadline: todo.deadline
        });
    };

    const handleSaveEdit = () => {
        if (editingId) {
            dispatch(editTodo({
                id: editingId,
                ...editForm
            }));
            setEditingId(null);
            setEditForm({ title: "", description: "", deadline: "" });
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({ title: "", description: "", deadline: "" });
    };

    const handleAddTodo = () => {
        if (newTodoForm.title.trim()) {
            dispatch(addTodo(newTodoForm));
            setNewTodoForm({ title: "", description: "", deadline: "" });
            setIsAddingTodo(false);
        }
    };

    const handleCancelAdd = () => {
        setIsAddingTodo(false);
        setNewTodoForm({ title: "", description: "", deadline: "" });
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center justify-between w-full max-w-md mb-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                Todos Component
            </h1>
            <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title="Toggle theme"
            >
                <span className="text-xl">
                    {theme === "light" ? "🌙" : "☀️"}
                </span>
            </button>
        </div>
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Todo List
            </h2>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
                {(['all', 'upcoming', 'overdue', 'completed'] as const).map((filterType) => (
                    <button
                        key={filterType}
                        onClick={() => setFilter(filterType)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            filter === filterType
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                        <span className="ml-1 text-xs">
                            {filterType === 'all' ? todos.length :
                             filterType === 'completed' ? todos.filter(t => t.completed).length :
                             filterType === 'upcoming' ? todos.filter(t => !t.completed && t.deadline >= currentDate).length :
                             todos.filter(t => !t.completed && t.deadline < currentDate).length}
                        </span>
                    </button>
                ))}
            </div>
            
            
            {isAddingTodo && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-sm mb-4 space-y-2">
                    <input
                        type="text"
                        value={newTodoForm.title}
                        onChange={(e) => setNewTodoForm({...newTodoForm, title: e.target.value})}
                        className="w-full p-2 border rounded text-gray-800 dark:text-white"
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={newTodoForm.description}
                        onChange={(e) => setNewTodoForm({...newTodoForm, description: e.target.value})}
                        className="w-full p-2 border rounded text-gray-800 dark:text-white"
                        placeholder="Description"
                    />
                    <input
                        type="date"
                        value={newTodoForm.deadline}
                        onChange={(e) => setNewTodoForm({...newTodoForm, deadline: e.target.value})}
                        className="w-full p-2 border rounded text-gray-800 dark:text-white"
                    />
                    <div className="flex space-x-2">
                        <button
                            onClick={handleAddTodo}
                            disabled={!newTodoForm.title.trim()}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            Add Todo
                        </button>
                        <button
                            onClick={handleCancelAdd}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <ul className="space-y-4">
                {filteredTodos.map((todo, index) => (
                    <li key={index} className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
                        todo.completed 
                            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                            : 'bg-gray-50 dark:bg-gray-700'
                    }`}>
                        {editingId === todo.id ? (
                            <div className="flex-1 space-y-2">
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                    className="w-full p-2 border rounded text-gray-800"
                                    placeholder="Title"
                                />
                                <input
                                    type="text"
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                    className="w-full p-2 border rounded text-gray-800"
                                    placeholder="Description"
                                />
                                <input
                                    type="date"
                                    value={editForm.deadline}
                                    onChange={(e) => setEditForm({...editForm, deadline: e.target.value})}
                                    className="w-full p-2 border rounded text-gray-800"
                                />
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleSaveEdit}
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <h3 className={`text-lg font-medium ${
                                        todo.completed 
                                            ? 'text-green-800 dark:text-green-200 line-through' 
                                            : 'text-gray-800 dark:text-gray-200'
                                    }`}>{todo.title}</h3>
                                    <p className={`text-sm ${
                                        todo.completed 
                                            ? 'text-green-600 dark:text-green-400 line-through' 
                                            : 'text-gray-600 dark:text-gray-400'
                                    }`}>{todo.description}</p>
                                    <div className="mt-2">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full border ${
                                            todo.completed 
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700'
                                                : todo.deadline < currentDate
                                                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700'
                                                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700'
                                        }`}>
                                            📅 {todo.deadline}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <span 
                                        className="text-xl cursor-pointer hover:scale-110 transition-transform" 
                                        onClick={() => handleEdit(todo)}
                                        title="Edit todo"
                                    >
                                        ✏️
                                    </span>
                                    <span 
                                        className="text-xl cursor-pointer hover:scale-110 transition-transform" 
                                        onClick={() => dispatch(removeTodo({id:todo.id}))}
                                        title="Delete todo"
                                    >
                                        🗑️
                                    </span>
                                    <span 
                                        className="text-2xl cursor-pointer hover:scale-110 transition-transform" 
                                        onClick={() => dispatch(toggleCompleted({id:todo.id}))}
                                        title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                                    >
                                        {todo.completed ? "↩️" : "✅"}
                                    </span>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        <button
            onClick={() => setIsAddingTodo(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Add Todo
        </button>
            </div>
    );
}
export default Todos;
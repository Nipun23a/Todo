import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import {  AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import DarkModeToggle from '../components/DarkModeToggle';
import TodoItem from "../components/ToDoItem";
import TodoModal from "../components/ToDoModal";

const DashboardPage = () => {
    const { darkMode, logout } = useContext(AppContext);
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isAddingTodo, setIsAddingTodo] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        setTodos([{ id: Date.now(), ...todo, completed: false }, ...todos]);
        setIsAddingTodo(false);
    };

    const updateTodo = (id, updatedTodo) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo));
        setEditingTodo(null);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const handleLogout = () => {
        logout();
        history('/');
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <div className="container mx-auto p-4">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Todo Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <DarkModeToggle />
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <section className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Active Todos</h2>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className={`p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <ul className="space-y-4">
                            <AnimatePresence>
                                {filteredTodos.map(todo => (
                                    <TodoItem
                                        key={todo.id}
                                        todo={todo}
                                        onToggle={toggleTodo}
                                        onDelete={deleteTodo}
                                        onEdit={setEditingTodo}
                                        darkMode={darkMode}
                                    />
                                ))}
                            </AnimatePresence>
                        </ul>
                        <button
                            onClick={() => setIsAddingTodo(true)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                        >
                            <Plus size={20} className="inline mr-2" /> Add Todo
                        </button>
                    </section>

                    <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
                        <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
                        <div className="bg-blue-500 bg-opacity-10 rounded-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold text-blue-500">Completed Tasks</h3>
                            <p className="text-3xl font-bold">{todos.filter(todo => todo.completed).length}</p>
                        </div>
                        <div className="bg-green-500 bg-opacity-10 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-green-500">Pending Tasks</h3>
                            <p className="text-3xl font-bold">{todos.filter(todo => !todo.completed).length}</p>
                        </div>
                    </section>
                </main>
            </div>

            <AnimatePresence>
                {isAddingTodo && (
                    <TodoModal
                        onSubmit={addTodo}
                        onClose={() => setIsAddingTodo(false)}
                        darkMode={darkMode}
                    />
                )}
                {editingTodo && (
                    <TodoModal
                        todo={editingTodo}
                        onSubmit={(updatedTodo) => updateTodo(editingTodo.id, updatedTodo)}
                        onClose={() => setEditingTodo(null)}
                        darkMode={darkMode}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardPage;
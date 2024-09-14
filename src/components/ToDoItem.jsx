import React from 'react';
import { Edit2, Trash2, CheckSquare, Square } from 'lucide-react';
import { motion } from 'framer-motion';

const TodoItem = ({ todo, onToggle, onDelete, onEdit, darkMode }) => (
    <motion.li
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
        <div className="flex items-center space-x-4">
            <button onClick={() => onToggle(todo.id)} className="focus:outline-none">
                {todo.completed ?
                    <CheckSquare size={24} className="text-green-500" /> :
                    <Square size={24} className="text-gray-400" />
                }
            </button>
            <div>
                <h3 className={`font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{todo.description}</p>
            </div>
        </div>
        <div className="flex space-x-2">
            <button onClick={() => onEdit(todo)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                <Edit2 size={18} className="text-blue-500" />
            </button>
            <button onClick={() => onDelete(todo.id)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                <Trash2 size={18} className="text-red-500" />
            </button>
        </div>
    </motion.li>
);

export default TodoItem;
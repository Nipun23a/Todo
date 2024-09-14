import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const DarkModeToggle = () => {
    const { darkMode, toggleDarkMode } = useContext(AppContext);

    return (
        <motion.button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${darkMode
                ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
                : 'bg-yellow-100 text-gray-800 hover:bg-yellow-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
    );
};

export default DarkModeToggle;
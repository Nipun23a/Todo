import React, { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';

import { AppContext } from '../context/AppContext';
import DarkModeToggle from '../components/DarkModeToggle';


const RegisterPage = () => {
    const { darkMode, login } = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const history = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    return (
        <div className={`min-h-screen flex flex-col justify-center items-center p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <div className="absolute top-4 right-4">
                <DarkModeToggle />
            </div>
            <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg`}>
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Register</h2>
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        login(values);
                        setSubmitting(false);
                        history('/dashboard');
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    className={`w-full p-3 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.name && touched.name && <div className="text-red-500 mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className={`w-full p-3 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.email && touched.email && <div className="text-red-500 mt-1">{errors.email}</div>}
                            </div>
                            <div className="relative">
                                <Field
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className={`w-full p-3 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                {errors.password && touched.password && <div className="text-red-500 mt-1">{errors.password}</div>}
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>
                        </Form>
                    )}
                </Formik>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
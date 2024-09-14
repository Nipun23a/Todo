import React, {useContext} from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { AppProvider,AppContext } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AppContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
};

export default App;
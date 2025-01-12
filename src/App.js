import React from 'react';
import { useRoutes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Main from './pages/Main';

const App = () => {
    const routes = useRoutes([
        { path: "/", element: <StartPage /> },
        { path: "/todo", element: <Main /> },
    ]);

    return routes;
};

export default App;

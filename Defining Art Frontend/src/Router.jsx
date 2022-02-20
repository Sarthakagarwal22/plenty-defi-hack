import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.js';
import ImagesComponent from './Components/ImagesComponent/index';
import Vote from './Components/Vote/vote.jsx';

const routesArray = [
    {
        path: '/',
        component: <App />
    },
    {
        path: '/image',
        component: <ImagesComponent />
    },
   { path: '/vote',
    component: <Vote />}
]

const RouterComponent = () => {

    return (
        <Router>
            <Routes>
                {routesArray.map((route, index) => (
                    <Route key={`${route.path}-${index}`} path={route.path} element={route.component} />
                ))}
            </Routes>
        </Router>
    )

}

export default RouterComponent;
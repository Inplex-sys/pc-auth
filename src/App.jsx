import React from 'react';
import { HashRouter as Router, Routes , Route } from 'react-router-dom';

import Auth from './pages/Auth';
import Manager from './pages/Manager';
import Reset from './pages/Reset';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Auth/>} />
                <Route path='/manager' element={<Manager/>} />
                <Route path='/reset' element={<Reset/>} />
            </Routes>
        </Router>
    );
}

export default App;
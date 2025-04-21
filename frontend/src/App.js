import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/upload">Send File</Link>
                        </li>
                        <li>
                            <Link to="/files">Raffles List</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/upload" element={<UploadFile />} />
                    <Route path="/files" element={<FileList />} />
                    <Route path="/" element={<h1>Welcome to the Raffles App</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_API_URL

const FileList = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [responseObject, setResponseObject] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(backendUrl);
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    const fetchResponseObject = async () => {
        try {
            const response = await axios.get(`${backendUrl}/drawn`);
            setResponseObject(response.data);
            await fetchFiles();
        } catch (error) {
            alert(error.response.data.message.toString());
            navigate('/upload');
        }
    };

    return (
        <div>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
            <button onClick={fetchResponseObject}>Get Winner</button>
            {responseObject && (
                <div>
                    <h3>Winner:</h3>
                    <p>{responseObject.name}</p>
                </div>
            )}
        </div>
    );
};

export default FileList;
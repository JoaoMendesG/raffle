import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const backendUrl = process.env.REACT_APP_API_URL

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'text/plain') {
            setFile(selectedFile);
        } else {
            alert('Please select a .txt file');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('raffles_file', file);

        try {
            await axios.post(backendUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('File sent successfully!');
            navigate('/files');
        } catch (error) {
            console.error('Error sending file:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            <button type="submit">Send</button>
        </form>
    );
};

export default UploadFile;
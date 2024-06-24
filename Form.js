// src/Component/Form.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// Styled components with background image
const Background = styled.div`
    background-image: url('https://cdn5.vectorstock.com/i/1000x1000/17/74/blur-vector-5991774.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    max-width: 1000px;
    max-height: 1000px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.9); // Semi-transparent white background
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const LandingButton = styled.button`
    padding: 20px;
    border: none;
    border-radius: 10px;
    background: violet;
    color: white;
    font-size: 24px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background: purple;
    }
`;

const StyledForm = styled.form`
    margin-bottom: 50px;
    animation: ${fadeIn} 0.5s ease;
    width: 800px;
    height: 400px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 70%;
    padding: 10px;
    border: 3px solid ${(props) => (props.isValid ? 'purple' : 'red')};
    border-radius: 5px;
    font-size: 16px;
    background-color: lavender;
    transition: border-color 0.3s ease;
    &:focus {
        border-color: darkblue;
    }
`;

const Button = styled.button`
    width: 75%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: violet;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background: purple;
    }
`;

const ShowDataButton = styled.button`
    width: 75%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: violet;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;
    &:hover {
        background: lightcyan;
    }
`;

const TableContainer = styled.div`
    margin-top: 50px;
    display: ${(props) => (props.show ? 'block' : 'none')};
    animation: ${fadeIn} 0.5s ease;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #f2f2f2;
`;

const TableData = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
`;

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [data, setData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/forms');
                setData(response.data);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = true;
        if (!formData.email) formErrors.email = true;
        if (!formData.password) formErrors.password = true;
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:8081/form', formData);
            console.log('Response:', response.data);
            setFormData({ name: '', email: '', password: '' });
            // Fetch the updated data
            const updatedData = await axios.get('http://localhost:8081/forms');
            setData(updatedData.data);
            window.alert('Form submitted!');
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleTable = (e) => {
        if (e.key === 'Enter') {
            setShowTable(!showTable);
        }
    };

    if (!showForm) {
        return (
            <Background>
                <Container>
                    <LandingButton onClick={() => setShowForm(true)}>
                        Enter Your Details
                    </LandingButton>
                </Container>
            </Background>
        );
    }

    return (
        <Background>
            <Container>
                <StyledForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Name:</Label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            isValid={!errors.name}
                            placeholder="Enter your name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email:</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isValid={!errors.email}
                            placeholder="Enter your email address"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password:</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isValid={!errors.password}
                            placeholder="Enter your password"
                        />
                    </FormGroup>
                    <Button type="submit">
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                    <ShowDataButton
                        tabIndex="0"
                        onKeyDown={handleToggleTable}
                        onClick={() => setShowTable(!showTable)}
                    >
                        Click me to Show data!! (Press Enter)
                    </ShowDataButton>
                    <br />
                    <label>Not a member?</label><a href="#">Sign up</a>
                </StyledForm>
                <TableContainer show={showTable}>
                    <h2>Registered Users</h2>
                    <StyledTable>
                        <thead>
                            <tr>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Email</TableHeader>
                                <TableHeader>Password</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <TableData>{item.name}</TableData>
                                    <TableData>{item.email}</TableData>
                                    <TableData>{item.password}</TableData>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </TableContainer>
            </Container>
        </Background>
    );
};

export default Form;

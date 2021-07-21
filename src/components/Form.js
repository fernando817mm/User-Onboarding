import axios from 'axios';
import React, { useEffect, useState } from 'react';
import schema from '../validation/formSchema';
import { reach } from 'yup';
import User from './User';

const initialFormValues = {
    name: '',
    email: '',
    password: '',
    tos: false
}

const initialFormErrors = {
    name: '',
    email: '',
    password: '',
    tos: false
}

const initialDisabled = true;

const Form = (props) => {

    const [ formValue, setFormValue ] = useState(initialFormValues);
    const [ users, setUsers ] = useState([]);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ disabled, setDisabled ] = useState(initialDisabled);

    const getUsers = () => {
        axios.get('https://reqres.in/api/users')
            .then(res => {
                setUsers(res.data.data);
            })
            .catch(err => {
                alert(err);
            })
    }

    useEffect(() => {
        getUsers()
    }, [])

    const change = (e) => {
        const { name, value, type, checked } = e.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormValue({ ...formValue, [name]: value});
        setFormValue({ ...formValue, [name]: valueToUse})

        const validate = (name, value) => {
            reach(schema, name)
                .validate(value)
                .then(() => setFormErrors({ ...formErrors, [name]: ''}))
                .catch(err => setFormErrors({ formErrors, [name]: err.errors[0] }))
        }
        validate(name, value);
    }

    useEffect(() => {
        schema.isValid(formValue).then(valid => setDisabled(!valid))
    }, [formValue])

    const submit = (e) => {
        e.preventDefault();
        const newUser = {
            name: formValue.name.trim(),
            email: formValue.email.trim(),
            password: formValue.password.trim(),
            tos: formValue.tos
        }
        // setUsers([ ...users, newUser ]);
        axios.post('https://reqres.in/api/users', newUser)
            .then(res => {
                setUsers([res.data, ...users])
                console.log(res.data)
            })
            .catch(err => {
                alert(err)
            })
            .finally(() => {
                setFormValue(initialFormValues);
            })
    }

    return (
        <div>
            <form onSubmit = {submit}>
                <div>
                    <label>Name:&nbsp;
                        <input
                            type = 'text'
                            name = 'name'
                            value = {formValue.name}
                            onChange = {change}
                        />
                    </label>
                </div>
                <div>
                    <label>Email:&nbsp;
                        <input
                            type = 'email'
                            name = 'email'
                            value = {formValue.email}
                            onChange = {change}
                        />
                    </label>
                </div>
                <div>
                    <label>Password:&nbsp;
                        <input
                            type = 'password'
                            name = 'password'
                            value = {formValue.password}
                            onChange = {change}
                        />
                    </label>
                </div>
                <div>
                    <label>Terms of Service:&nbsp;
                        <input
                            type = 'checkbox'
                            name = 'tos'
                            onChange = {change}
                            checked = {formValue.tos}
                        />
                    </label>
                </div>
                <div>
                    <button type = 'submit' disabled = {disabled}>Submit</button>
                </div>
            </form>
            {
                users.map((e, idx) => {
                    console.log(e);
                    return <User name = {e.name} first_name = {e.first_name} key = {idx} />
                })
            }
        </div>
    )
}

export default Form;
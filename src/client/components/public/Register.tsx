import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, SetAccessToken, User, ClearAccessToken } from '../../utils/api';
import console = require('console');



export interface RegisterProps { }

const Register: React.SFC<RegisterProps> = () => {

    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        let data = {
            firstName, email, password
        }
        try {
            let result = await json('auth/register', 'POST', data)
            console.log('result', result)
        } catch (e) {
            throw e
        }


    }

    return (
        <main className="container">
            <section className="row justify-content-center">
                <div className="col-md-8">
                    <form
                        className="form-group font-open bck-gradient border border-primary rounded shadow-lg mb-0 p-3"
                    onSubmit={(e) => handleRegister(e)}
                    >
                        <label htmlFor="firstName">First Name</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                            type="text" name="firstName" className="form-control" value={firstName} />
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            type="email" name="email" className="form-control" value={email} />
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            type="text" name="password" className="form-control" value={password} />
                        <button
                            type="submit"
                            className="btn btn-primary btn-outline-light mt-3">Login</button>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Register;
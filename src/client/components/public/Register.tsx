import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, SetAccessToken, User, ClearAccessToken } from '../../utils/api';
import console = require('console');



export interface RegisterProps extends RouteComponentProps { }

const Register: React.SFC<RegisterProps> = ({ history }) => {

    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(null)


    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let body = {
            firstname, email, password
        }
        try {
            let result = await json('auth/register', 'POST', body)
            if (result) {
                try {
                    let result2 = await json('auth/login', 'POST', body)
                    if (result2) {
                        SetAccessToken(result2.token, { userid: result2.userid, role: result2.role })
                    }
                    history.push('/');
                } catch (e) {
                    throw e
                }
            } else {
                setRegistered(false)
            }
        } catch (e) {
            throw e
        }
    };

    const registerError = () => {
        if (registered === false) {
            return <div className="alert alert-danger p-1 m-3">There was a problem regestering! Please try again</div>
        }
    };

    return (
        <main className="container">
            <section className="row justify-content-center">
                <div className="col-md-8">
                    <form
                        className="form-group font-open bck-gradient border border-primary rounded shadow-lg mb-0 p-3"
                        onSubmit={(e) => handleRegister(e)}
                    >
                        <label htmlFor="firstname">First Name</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value)}
                            type="text" name="firstname" className="form-control" value={firstname} />
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
                        {registerError()}
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Register;
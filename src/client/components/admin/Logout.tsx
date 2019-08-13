import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, SetAccessToken, User, ClearAccessToken } from '../../utils/api';
import console = require('console');

export interface LogoutProps extends RouteComponentProps { }

const Logout: React.SFC<LogoutProps> = ({ history }) => {

    const isLoggedOut = async () => {
        if (logoutStatus === true) {
            history.push('/')
        }
    }
    useEffect(() => { isLoggedOut() }, []);

    const [logoutStatus, setLogoutStatus] = useState(false);

    const handleLogout = 


    return (
        <>
            
        </>
    );
}

export default Logout;





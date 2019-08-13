import console = require('console');

// import * as fetch from 'isomorphic-fetch';

export let AccessToken: string = localStorage.getItem('token') || null;
export let User: any = {
    // userid and role generated from localStorage to confirm the user has logged in and set a value for it
    userid: localStorage.getItem('userid') || null,
    role: localStorage.getItem('role') || null
};

// json helper function - extends the fetch call. Its async bc using fetch returning a Promise
// body? is optional argument (used if changed method to i.e. 'POST')
// method is given a default value, if not specified it will default to 'GET'
export const json = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {

    let headers: any = {
        // can add more to the header as needed, i.e. authorization, etc
        'Content-type': 'application/json'
    };
    // ** if accesstoken exists add a new key to headers object, note the syntax (not an array) makes headers {} = 
    // ** let headers: any = {
    // ** 'Content-type': 'application/json',
    // ** 'Authorization': `Bearer ${AccessToken}`
    // ** };
    if (AccessToken) {
        headers['Authorization'] = `Bearer ${AccessToken}`;
    }
    try {
        let result = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        // if result has result.ok property i.e res.json({ message: 'Blogged' }) - even if message is empty
        if (result.ok) {
            // this is what is return from this json function. Now can write ...
            return <T>(await result.json());
        } else {
            return false;
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
};

// User object given default values that will be overridden when the actual user object is passed in at login attempt
export const SetAccessToken = (token: string, user: {} = { userid: undefined, role: 'guest' }) => {
    AccessToken = token;
    User = user;
    
    localStorage.setItem('token', token);
    localStorage.setItem('userid', User.userid);
    localStorage.setItem('role', User.role);

};

export const ClearAccessToken = () => {
    AccessToken = '';
    if (localStorage) {
        localStorage.clear()
        console.log('localstorage', User.userid)
    }

}
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { __RouterContext } from 'react-router';
import { Link } from 'react-router-dom';
import { Tag } from '../public/OneBlog';
import { User, ClearAccessToken } from '../../utils/api';
import console = require('console');

export interface NavbarProps { }

const Navbar: React.SFC<NavbarProps> = () => {

    const { history } = useContext(__RouterContext);
    const [tags, setTags] = useState<Tag[]>([]);
    const [login, setLogin] = useState(false);
    const [id, setId] = useState(undefined);

    const getTags = async () => {
        try {
            let r = await fetch('/api/tags')
            let tags = await r.json()
            setTags(tags)
        } catch (err) {
            console.log(err)
        }
    };

    const renderLogout = () => {
        if (User.userid !== null) {
            return <button className="btn text-white" onClick={() => log()}>Logout</button>
        } 
    }

    const log = () => {
        ClearAccessToken();
        setLogin(false);
        location.reload()
        
    }

    const handleLogStatus = () => {
        if (login === true) {
            return renderLogout()
        } else if (login === false) {
            return <Link className="text-white mr-3" to="/login">Admin</Link>
        }
    }

    const renderAddBlog = () => {
        if (User && User.role === 'admin') {
            return <Link className="text-white mr-3" to="/add">Add Blog</Link>
        }
    };

    useEffect(() => { getTags(); renderAddBlog() }, []);

    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setId(e.target.value)
        if (e.target.value === "0") {
            return;
        } else {
            history.push(`/showTags/${e.target.value}`)
        }
    };

    return (
        <div className="card text-white sticky-top border-dark rounded my-5 bg-info shadow-lg">
            <nav className="navbar navbar-expand-md d-flex">
                <div className="navbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {handleLogStatus()}
                        </li>
                        <li className="nav-item">
                            <Link className="text-white mr-3" to="/">All Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-white mr-3" to="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown mr-3">
                            <select
                                onChange={handleSelect} value={id}
                                className="dropdown-item bg-info text-white">
                                <option className="dropdown-item text-white bg-dark">Select Tag</option>
                                {tags.map(tag => {
                                    return (
                                        <option className="bg-dark" key={tag.id} value={tag.id}>{tag.name}</option>
                                    )
                                })}
                            </select>
                        </li>
                        <li className="nav-item">
                            {renderAddBlog()}
                        </li>
                    </ul>
                </div>
                <div className="ml-auto">
                    <Link className="text-white mr-3" to="/email">Contact</Link>
                </div>
                {renderLogout()}
            </nav>
            <div className="row justify-content-md-center">
                <div className="header font-wick col-md-12 p-2">
                    <p className="text-center  mb-4">Our Crazy Life!</p>
                </div>
                <div className="col-md-12 px-5">
                    <p className="d-flex justify-content-end">If you like my blog, please consider donating!!
                    <Link className="btn btn-primary shadow text-white ml-5" to="/donate">Donate</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
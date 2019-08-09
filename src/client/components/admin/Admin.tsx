import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, User } from '../../utils/api';

export interface AdminProps extends RouteComponentProps<{ id: string }> { }

const Admin: React.SFC<AdminProps> = ({ history, match }) => {

    let id = match.params.id

    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [isAllowed, setIsAllowed] = useState(false);

    const getBlog = async () => {
        let blog = await json(`/api/blogs/${id}`);
        setBlogTitle(blog.title);
        setBlogContent(blog.content);
        if (User.userid == blog.userid) {
            setIsAllowed(true);
        }
    }

    useEffect(() => { getBlog() }, []);

    const renderEdit = () => {
        if (isAllowed) {
            return <button onClick={handleEdit} className="btn btn-info m-2">Edit</button>
        } else {
            return <button onClick={() => history.replace('/')} className="btn btn-info m-2">Go Back</button>
        }
    };

    const handleEdit = async () => {
        let data = {
            title: blogTitle,
            content: blogContent,
        }
        try {
            await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json"
                }
            })
            history.replace('/')
        } catch (err) {
            console.log(err)
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`/api/blogs/${id}`, {
                method: 'DELETE'
            });
            await fetch(`/api/tags/${id}`, {
                method: 'DELETE'
            });
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="card-deck row justify-content-center">
            <div className="card col-md-8 border bck-gradient border-dark p-3 m-3">
                <div className="card-body">
                    <label htmlFor="blogTitle m-0">Title</label>
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBlogTitle(e.target.value)}
                        className="form-control mb-3" type="text" value={blogTitle} />
                    <label htmlFor="blogContent m-0">Content</label>
                    <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBlogContent(e.target.value)}
                        className="form-control mb-3" value={blogContent} rows={8} />
                    <div>
                        {renderEdit()}
                        <button
                            onClick={handleDelete}
                            className="btn btn-info m-2">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;

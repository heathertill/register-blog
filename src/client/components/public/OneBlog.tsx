import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { Blog } from './AllBlogs';
import { json, User } from '../../utils/api';

export interface OneBlogProps extends RouteComponentProps<{ id: string }> { }

export interface Tag {
    id: number, name: string
}

const OneBlog: React.FC<OneBlogProps> = ({ history, match: { params: { id } } }) => {

    const [blog, setBlog] = useState<Blog>({
        id: null,
        firstname: null,
        title: null,
        content: null,
        _created: null,
        userid: null,
    });

    const [tag, setTag] = useState<Tag>({
        id: null,
        name: ''
    });

    const getBlog = async () => {
        try {
            let blog = await json(`/api/blogs/${id}`); 
            setBlog(blog);
            let tag = await json(`/api/tags/${id}`);
            setTag(tag);
            console.log('tag', tag)
        } catch (err) {
            console.log(err)
        }
    };
    
    const renderEdit = () => {
        if (User && User.role === 'admin') {
            return <Link className="btn btn-warning shadow btn-block mx-auto" to={`/${id}/admin`}>Options</Link>
        }
    };

    useEffect(() => { getBlog() }, [id]);

    return (
        <div className="row justify-content-center">
            <div className="col-md-10 mx-5">
                <div className="card border border-dark rounded">
                    <div className="card-body font-open" key={blog.id}>
                        <h2 className="card-title text-center mb-3">{blog.title}</h2>
                        <div className="mx-4">
                            <p className="card-text  ml-2">{blog.content}</p>
                        <div className="card-text  ml-2 ">by {blog.firstname}</div>
                        <p className="card-text  ml-2">{moment(blog._created).format('MMMM Do, YYYY')}</p>
                            <h4><span className="badge badge-info">{tag.name}</span></h4>
                            </div>
                        <div className="card-footer">
                            {renderEdit()}
                            <button onClick={() => history.goBack()} className="btn btn-warning shadow btn-block mx-auto">Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OneBlog;
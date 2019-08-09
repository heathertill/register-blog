import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { json } from '../../utils/api'

export interface AllBlogsProps { }

export interface Blog {
    id: number,
    firstname: string,
    title: string,
    content: string,
    _created: Date,
    userid: string
}

const AllBlogs: React.SFC<AllBlogsProps> = () => {

    const [blogs, setBlogs] = useState<Blog[]>([]);

    const getBlogs = async () => {
        try {
            let blogs = await json('api/blogs');
            setBlogs(blogs);
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => { getBlogs() }, []);

    return (
        <>
            <div className="row mx-3">
                {blogs.map(blog => {
                    return (
                        <article className="col-md-4 p-2" key={blog.id}>
                            <div className="card m-2 p-1 border-dark rounded">
                                <div className="font-open card-img-wrapper">
                                        <p className="card-text h-50 pt-2 blog-title-img">{blog.title}</p>
                                    <img src="images/clipboard.jpg" alt="clipboard" className="card-img-top" />
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{blog.firstname}</p>
                                    <p className="card-text">{moment(blog._created).format('MMMM Do, YYYY')}</p>
                                    <Link to={`/blogs/${blog.id}`} className="btn btn-warning shadow btn-block mx-auto" >View Blog</Link>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </>
    );
}

export default AllBlogs;
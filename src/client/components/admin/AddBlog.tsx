import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, User } from '../../utils/api';
// User object from localStorage - determines if user has something in localStorage(browser)
// is it a token, is it a role, is it a userid validated from our backend authentication

export interface AddBlogProps extends RouteComponentProps { }

export interface AddBlogState {
    title: string,
    content: string,
    tags: { id: number, name: string }[],
    tagid: string,
    blogid: number,
    saveStatus: string
}

class AddBlog extends React.Component<AddBlogProps, AddBlogState> {
    constructor(props: AddBlogProps) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: [],
            tagid: '',
            blogid: null,
            saveStatus: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createBlogTags = this.createBlogTags.bind(this);
    }

    private alert: JSX.Element = null;
    private saving: boolean = false;

    async componentWillMount() {
        if (!User || User.userid === null || User.role !== 'admin') {
            this.props.history.replace('/login');
        } else {
            let tags = await json('/api/tags');
            this.setState({ tags });
        }
    };

    renderTags() {
        return this.state.tags.map(tag => {
            return <option value={tag.id} key={tag.id}>{tag.name}</option>
        })
    };

    async handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (this.saving) return;

        let data = {
            title: this.state.title,
            content: this.state.content,
            userid: User.userid
        };
        try {
            this.saving = true;
            
            if (data.title && data.content) {
                let info = await json('/api/blogs', 'POST', data);
                this.setState({ blogid: info[0] });
                this.setState({
                    title: '',
                    content: '',
                    saveStatus: 'success'
                });
                this.createBlogTags();
                // this.props.history.push('/');
            } else {
                this.setState({ saveStatus: 'error' });
                // this.props.history.replace('/')
            }
        } catch (err) {
            this.setState({ saveStatus: 'error' });
            throw err;
        } finally {
            this.saving = false;
        }
    };

    async createBlogTags() {
        let data = { blogid: this.state.blogid, tagid: this.state.tagid }
        try {
            await json('/api/tags', 'POST', data);
        } catch (err) {
            console.log(err)
        }
    };

    render() {
        if (this.state.saveStatus === 'success') {
            return <button onClick={() => this.props.history.replace('/')} className="btn btn-info d-flex justify-content-center m-2">Blog Added!!! Back to All Blogs</button>
        } else if (this.state.saveStatus === 'error') {
            this.alert = <div className="alert alert-danger p-1 m-3">Oops! Something went wrong.  Please check all fields!</div>
        }
        return (
            <div className="row justify-content-center">
                <div className="chirpInput card col-md-8 border p-3 mt-3">
                    <div className="card-body font-open">
                        <form className="form-group mb-0 p-3">
                            <label className="mt-2" htmlFor="title">Title</label>
                            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })}
                                type="text" name="title" className="form-control" placeholder="What is your blog about?" value={this.state.title} />
                            <label className="mt-2" htmlFor="content">Content</label>
                            <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })}
                                name="content" className="form-control" placeholder="What do you have to say?" value={this.state.content} rows={5} />
                            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ tagid: e.target.value })}
                                className="form-control my-4" value={this.state.tagid} >
                                <option>Select Tag</option>
                                {this.renderTags()}
                            </select>
                            <div>
                                <button onClick={this.handleSubmit}
                                    className="btn btn-primary btn-outline-light"
                                >Submit</button>
                                {this.alert}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddBlog;
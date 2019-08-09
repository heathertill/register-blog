import * as React from 'react';
import { email } from '../../utils/mailgun';

class Email extends React.Component<IEmailProps, IEmailState> {

    constructor(props: IEmailProps) {
        super(props);
        this.state = {
            email: '',
            subject: '',
            message: '',
            sentEmail: false
        }
    }

    onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let body = { email: this.state.email, subject: this.state.subject, message: this.state.message }
            email(body);
            this.setState({ email: '', subject: '', message: '' })
            this.setState({ sentEmail: true });
        } catch (err) {
            throw err;
        }
    };

    handleEmail = () => {
        if (this.state.sentEmail === true) {
            return < div className = "alert alert-danger p-1 m-3" > Message sent!!!</div >
        }
    }

    render() {
        return (
            <main className="container">
                <form className="form-group mt-5 border border-primary rounded p-3 shadow-lg bg-info"
                    onSubmit={this.onSubmit}
                >
                    <label className="text-white mt-2 mb-0">Email</label>
                    <input type="text" value={this.state.email} className="input-group my-1 p-1"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })} />
                    <label className="text-white mt-2 mb-0">Subject</label>
                    <input type="text" value={this.state.subject} className="input-group my-1 p-1"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ subject: e.target.value })} />
                    <label className="text-white mt-2 mb-0">Message</label>
                    <textarea rows={5} value={this.state.message} className="input-group mt-1 mb-3 p-1"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ message: e.target.value })} />
                    <button className="btn btn-block btn-warning mx-auto my-3 shadow">Email Me!</button>
                    {this.handleEmail()}
                </form>
            </main>

        );
    }
};

export interface IEmailProps { }

export interface IEmailState {
    email: string,
    subject: string,
    message: string
    sentEmail: boolean
}

export default Email;
import * as React from 'react';
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';


class Form extends React.Component<IFormProps, IFormState>  {

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            name: '',
            amount: '',
            charged: false,
        }
    }

    handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let { token } = await this.props.stripe.createToken({ name: this.state.name });
            let amount = this.state.amount;
            await fetch('/payment/charge', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ token, amount })
            });
            this.setState({ charged: true });
            this.setState({ amount: '' });
        } catch (err) {
            throw err;
        }
    }

    handleDonate = () => {
        if (this.state.charged === true) {
            return <div className="alert alert-danger p-1 m-3">Thanks for the donation!!!</div>
        } 
    }

    render() {
        return (
            <section className="container">
                <form
                    className="from-group bck-gradient mt-3 border border-primary rounded shadow-lg p-3"
                    onSubmit={this.handleSubmit}
                >
                    <label>Name</label>
                    <input
                        type="text"
                        className="input-group my-1 p-1 border border-dark"
                        value={this.state.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
                    />
                    <label>Amount</label>
                    <input
                        type="text"
                        className="input-group my-1 p-1 border border-dark"
                        value={this.state.amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ amount: e.target.value })}
                    />
                    <label>Card Number</label>
                    <CardNumberElement  className="p-2 bg-white border border-dark" />
                    <div className="d-flex">
                        <div className="flex-fill mr-2">
                            <label>Expiration date</label>
                            <CardExpiryElement className="p-2 bg-white border border-dark" />
                        </div>
                        <div className="flex-fill ml-2">
                            <label>CVC</label>
                            <CardCVCElement className="p-2 bg-white border border-dark" />
                        </div>
                    </div>
                    <button className="btn btn-primary border border-dark mt-3 shadow">Charge It!</button>
                    {this.handleDonate()}
                </form>
            </section>
        );
    }
};

interface IFormProps extends ReactStripeElements.InjectedStripeProps { }

interface IFormState {
    name: string,
    amount: string,
    charged: boolean,
    // _element: any
}

export default injectStripe(Form);
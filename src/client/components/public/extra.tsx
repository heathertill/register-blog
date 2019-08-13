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

    private alert: JSX.Element = null
    private donating: boolean = false;

    handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.donating) return;
        try {
            this.donating = true;
            let { token } = await this.props.stripe.createToken({ name: this.state.name });
            let amount = this.state.amount;
            let result = await fetch('/payment/charge', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ token, amount })
            });
            if (result) {
                this.setState({ charged: true, amount: '', name: '' });
            } else {
                this.setState({charged: false})
            }
            
        } catch (err) {
            this.setState({ charged: false})
            throw err;
        } finally {
            this.donating = false;
        }
    }

   
    render() {

        if (this.state.charged === true) {
            this.alert = <div className="alert alert-danger p-1 m-3">Thanks for the donation!!!</div>
        } else if(this.state.charged === false) {
            <div className="alert alert-danger p-1 m-3">Error processing the donation!</div>
        }
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
                    {this.alert}
                </form>
            </section>
        );
    }
};

interface IFormProps extends ReactStripeElements.InjectedStripeProps { }

interface IFormState {
    name: string,
    amount: string,
    charged: boolean
}

export default injectStripe(Form);
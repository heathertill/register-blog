import * as React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import Form from './Form';

interface IDonateProps  { }

interface IDonateState { }

export default class Donate extends React.Component<IDonateProps, IDonateState> {

    constructor(props: IDonateProps) {
        super(props);
    }

    render() {
        return (
            <main className="container">
                <StripeProvider apiKey="pk_test_aY4tBDlLDE9vshY5LMZqV2gv00ifjC92sB">
                    <Elements>
                        <Form />
                    </Elements>
                </StripeProvider>
            </main>
        );
    }
};


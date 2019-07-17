import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
class Paypal extends Component {
    render() {

        const onSuccess = (payment) => {
			// 1, 2, and ... Poof! You made it, everything's fine and dandy!
            		this.props.onSuccess(payment);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }
        
        const onCancel = (data) => {
			// The user pressed "cancel" or closed the PayPal popup
			console.log('Payment cancelled!',JSON.stringify( data));
			// You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
		}

		const onError = (err) => {
			// The main Paypal script could not be loaded or something blocked the script from loading
			console.log("Error!", JSON.stringify(err));
			// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
			// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }

        let env = 'sandbox';
        let currency ='USD';
        let total = this.props.toPay;

        const client ={
            sandbox:'',
            production: ''
        }

        return (
            <div>
                <PaypalExpressBtn
                env ={env} 
                client = {client}
                currency ={currency}
                total = {total}
                onError = {onError}
                onSuccess = {onSuccess}
                onCancel = {onCancel}
                style={{
                    size:'large',
                    color:'blue',
                    shape:'rect',
                    label:'checkout'
                }}                
                />
            </div>
        );
    }
}

export default Paypal;
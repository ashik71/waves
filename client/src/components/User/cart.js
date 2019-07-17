import React, { Component } from 'react';
import UserLayout from '../../hoc/userLayout';
import UserProductBlock from '../utils/User/product_block';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import { connect } from 'react-redux';
import { getCartItems, removeCartItem,onSuccessBuy} from '../../actions/user_actions';
import Paypal from '../utils/paypal';

// 

class UserCart extends Component {

    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false,
    }

    componentDidMount() {
        let cartItems = [];
        let user = this.props.user;
        let userCart = user.userData.cart;

        if (userCart) {
            if (userCart.length > 0) {
                userCart.forEach(element => {
                    cartItems.push(element.id)
                });
                this.props.dispatch(getCartItems(cartItems, userCart))
                    .then(() => {
                        if (this.props.user.cartDetail.length > 0) {
                            this.calculateGrandTotal(this.props.user.cartDetail);
                        }
                    })

            }
        }
    }

    calculateGrandTotal = (cartDetail) => {
        let total = 0;
        cartDetail.forEach(item => {
            total += parseInt(item.price, 10) * item.quantity;
        });
        this.setState({
            total,
            showTotal: true
        });
    }
    showNoItem = () => (
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown} />
            <div>
                You have no items
            </div>
        </div>
    )
    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id))
        .then(()=>{
            if(this.props.user.cartDetail.length <=0){
                this.setState({showTotal:false});
            }else{
                this.calculateGrandTotal(this.props.user.cartDetail);
            }
        })
    }
    transactionError = ()=>{

    }
    transactionCanceled = ()=>{

    }
    transactionSuccess = (data)=>{

        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.user.cartDetail,
            paymentData:data
        })).then(()=>{            
            if(this.props.user.successBuy){
                this.setState({
                    showTotal: false,
                    showSuccess:true
                });            
            }
        })
        
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <UserProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id) => this.removeFromCart(id)}
                        />
                        {
                            this.state.showTotal ?
                                <div>
                                    <div className="user_cart_sum">
                                        <div>
                                            Total amount: $ {this.state.total}
                                        </div>
                                    </div>
                                </div>
                                :
                                this.state.showSuccess ?
                                    <div className="cart_success">
                                        <FontAwesomeIcon icon={faSmile} />
                                        <div>
                                            THANK YOU
                                        </div>
                                        <div>
                                            YOUR ORDER IS NOW COMPLETED
                                        </div>

                                    </div>

                                    :
                                    this.showNoItem()
                        }
                    </div>
                    {
                        this.state.showTotal ?

                            <div className="papal_button_container">
                                <Paypal
                                    toPay ={this.state.total}
                                    transactionError = {(data)=>this.transactionError(data)}
                                    transactionCanceled = {(data)=>this.transactionCanceled(data)}
                                    onSuccess ={(data)=>this.transactionSuccess(data)}
                                />
                            </div>
                        :null
                    }
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserCart);
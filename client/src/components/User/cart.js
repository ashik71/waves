import React, { Component } from 'react';
import UserLayout from '../../hoc/userLayout';
import UserProductBlock from '../utils/User/product_block';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import {connect} from 'react-redux';
import {getCartItems} from '../../actions/user_actions';

class UserCart extends Component {

    state={
        loading:true,
        total:0,
        showTotal: false,
        ShowSuccess:false,
    }

    componentDidMount(){
        let cartItems = [];
        let user = this.props.user;
        let userCart = user.userData.cart;

        if(userCart){
            if(userCart.length > 0){
                userCart.forEach(element => {
                    cartItems.push(element.id)
                });
            this.props.dispatch(getCartItems(cartItems,userCart))
            .then(()=>{

            })

            }
        }
    }


    removeFromCart = ()=>{

    }
    render() {
        return (
            <UserLayout>
            <div>
                <h1>My cart</h1>
                <div className="user_cart">
                    <UserProductBlock
                        products ={this.props.user}
                        type="cart"
                        removeItem = {(id)=>this.removeFromCart(id)}
                    />

                </div>
            </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps) (UserCart);
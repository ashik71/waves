import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import {connect} from 'react-redux';
import {getProductDetail, clearProductDetail} from '../../actions/product_action';

import ProductInfo from './productInfo';
import ProductImage from './productImage';
import {addToCart} from '../../actions/user_actions';


class ProductDetail extends Component {

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(response=>{
            if(!this.props.products.productDetail)
            {
                this.props.history.push('/not_found');
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearProductDetail());

    }
    addToCartHandler = (id)=>{
        console.log(id);
        this.props.dispatch(addToCart(id))
    }
    render() {
        return (
            <div>
                <PageTop
                title="product detail"
                />
                <div className="container">
                    {
                        this.props.products.productDetail ?
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div style={{width:'500px'}}>
                                <ProductImage
                                    detail = {this.props.products.productDetail}
                                />
                                </div>
                            </div>
                            <div className="right"> 
                                <ProductInfo
                                    addToCart = {(id)=>this.addToCartHandler(id)}
                                    detail = {this.props.products.productDetail}
                                />
                            </div>
                        </div>
                        :'Loading'
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductDetail);

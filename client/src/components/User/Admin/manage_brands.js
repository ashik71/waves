import React, { Component } from 'react';
import FormField from '../../utils/Forms/formfield';
import { update, generateData, isFormValid, resetFields } from '../../utils/Forms/formactions';
import { connect } from 'react-redux';
import { getBrands,addBrand } from '../../../actions/product_action';

class ManageBrands extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'brand_input',
                    type: 'text',
                    placeholder: 'Enter the brand name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }
    showBrands = () => (
        this.props.products.brands ?
            this.props.products.brands.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
            : null
    )

    componentDidMount() {
        this.props.dispatch(getBrands());
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'brand');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formdata, 'brand');
        const isValid = isFormValid(this.state.formdata, 'brand');
        if (isValid) {
          this.props.dispatch(addBrand(dataToSubmit,this.props.products.brands))
          .then(response=>{
              if(response.payload.success){
                this.resetFieldHandler()
              }
              else{
                this.setState({formError:true})
              }
          })
        }
        else {
            this.setState({
                formError: true
            })
        }
    }

    resetFieldHandler =()=>{
        const newFormdata = resetFields(this.state.formdata, 'brand')
        this.setState(
            {
                formdata: newFormdata,
                formSuccess: true
            }
        );
    }
    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Brands</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showBrands()}
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />
                                                        
                            {this.state.formError ?
                                <div className="error_label">
                                    Please check input data
                                        </div>
                                : null}
                            <button onClick={(event) => this.submitForm(event)}>
                                Add brand
                                    </button>
                        </form>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ManageBrands);
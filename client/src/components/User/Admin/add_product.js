import React, { Component } from 'react';
import UserLayout from '../../../hoc/userLayout';
import FormField from '../../utils/Forms/formfield';
import { update, generateData, isFormValid, populateOptions, resetFields } from '../../utils/Forms/formactions';
import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct,clearProduct } from '../../../actions/product_action';
import FileUpload from '../../utils/Forms/fileupload';

class AddProduct extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter product name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter your description'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter your price'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Brand',
                    name: 'brands_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shipping_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available, in stock',
                    name: 'available_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Wood material',
                    name: 'wood_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frets',
                    name: 'frets_input',
                    options: [
                        { key: 20, value: 20 },
                        { key: 21, value: 21 },
                        { key: 22, value: 22 },
                        { key: 23, value: 23 },
                        { key: 24, value: 24 }

                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish',
                    name: 'publish_input',
                    options: [
                        { key: true, value: 'Public' },
                        { key: false, value: 'Hidden' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            images :{
                value: [],
                validation:{
                    required :false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: false
            }
        }
    }

    updateFields = (newFormFata) => {
        this.setState({
            formdata: newFormFata
        })
    }
    componentDidMount() {
        const formdata = this.state.formdata;

        this.props.dispatch(getBrands()).then(response => {
            const updatedFormdata = populateOptions(formdata, this.props.products.brands, 'brand');
            this.updateFields(updatedFormdata);
        });
        this.props.dispatch(getWoods()).then(response => {
            const updatedFormdata = populateOptions(formdata, this.props.products.woods, 'wood');
            this.updateFields(updatedFormdata);
        });
    }


    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'product');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }
    resetFieldHandler = () => {
        const newFormdata = resetFields(this.state.formdata, 'product')
        this.setState(
            {
                formdata: newFormdata,
                formSuccess: true
            }
        );
        setTimeout(() => {
            this.setState({
                formSuccess: false
            },()=>{
                this.props.dispatch(clearProduct())
            })
        }, (3000));
    }
    submitForm = (event) => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formdata, 'product');
        const isValid = isFormValid(this.state.formdata, 'product');
        if (isValid) {
            this.props.dispatch(addProduct(dataToSubmit)).then(() => {
                if (this.props.products.addProduct.success) {
                    this.resetFieldHandler();
                } else {
                    this.setState({ formError: true })
                }
            })

        }
        else {
            this.setState({
                formError: true
            })
        }
    }

    imagesHandler = (images) => {
        const newFormData = {
            ...this.state.formdata
        }
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({
            formdata:  newFormData
        })
    }
    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add product</h1>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        
                        <FileUpload
                            imagesHandler = {(images)=> this.imagesHandler(images)}
                            reset= {this.state.formSuccess}
                        />
                        
                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'description'}
                            formdata={this.state.formdata.description}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'price'}
                            formdata={this.state.formdata.price}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="from_devider">
                            <FormField
                                id={'brand'}
                                formdata={this.state.formdata.brand}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'shipping'}
                                formdata={this.state.formdata.shipping}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'available'}
                                formdata={this.state.formdata.available}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="from_devider">
                            <FormField
                                id={'wood'}
                                formdata={this.state.formdata.wood}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'frets'}
                                formdata={this.state.formdata.frets}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="from_devider">
                            <FormField
                                id={'publish'}
                                formdata={this.state.formdata.publish}
                                change={(element) => this.updateForm(element)}
                            />
                            {this.state.formSuccess ?
                                <div className="form_success">
                                    Success..
                            </div>
                                : null
                            }
                            {this.state.formError ?
                                <div className="error_label">
                                    Please check input data
                                        </div>
                                : null}
                            <button onClick={(event) => this.submitForm(event)}>
                                Add product
                                    </button>
                        </div>
                    </form>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProduct);
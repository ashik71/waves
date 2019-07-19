import React, { Component } from 'react';
import FormField from '../utils/Forms/formfield';
import { update, generateData, isFormValid } from '../utils/Forms/formactions';
import { registerUser } from '../../actions/user_actions';
import Dialog from '@material-ui/core/Dialog';

import { connect } from 'react-redux';
class Register extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your lastname'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            confirmpassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirmpassword_input',
                    type: 'password',
                    placeholder: 'Confirm your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'register');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formdata, 'register');
        const isValid = isFormValid(this.state.formdata, 'register');
        if (isValid) {
            this.props.dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        this.setState({
                            formError: false,
                            formSuccess: true
                        });
                        setTimeout(() => {
                            this.props.history.push('/register_login');
                        }, 3000);
                    }
                    else {
                        this.setState({
                            formError: true
                        })
                    }
                }).catch(e => {
                    this.setState({
                        formError: true
                    })
                })
        }
        else {
            this.setState({
                formError: true
            })
        }
    }
    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submitform(event)}>
                                <h2>Personal Information</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'name'}
                                            formdata={this.state.formdata.name}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'lastname'}
                                            formdata={this.state.formdata.lastname}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div >
                                    <FormField
                                        id={'email'}
                                        formdata={this.state.formdata.email}
                                        change={(element) => this.updateForm(element)}
                                    />
                                </div>
                                <h2>Account Information</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'password'}
                                            formdata={this.state.formdata.password}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'confirmpassword'}
                                            formdata={this.state.formdata.confirmpassword}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {this.state.formError ?
                                        <div className="error_label">
                                            Please check input data
                                        </div>
                                        : null}
                                    <button onClick={(event) => this.submitForm(event)}>
                                        Create and account
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div>Congratulations !!!</div>
                        <div class="loader">
                            <svg class="circular" viewBox="25 25 50 50">
                                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
                            </svg>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default connect()(Register);
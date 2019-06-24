import React, { Component } from 'react';
import FormField from '../utils/Forms/formfield';
import { update, generateData, isFormValid } from '../utils/Forms/formactions';
import { loginUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
class Login extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formdata: {
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
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        const loginData = generateData(this.state.formdata, 'login');
        const isValid = isFormValid(this.state.formdata, 'login');
        if (isValid) {
            this.props.dispatch(loginUser(loginData)).then(response => {
                if (response.payload.loginSuccess) {
                    console.log(response.payload);
                    this.props.history.push('/user/dashboard');
                } else {
                    this.setState({
                        formError: true
                    })
                }
            });
        }
        else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event) => this.submitForm(event)}>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element) => this.updateForm(element)}
                    />
                    {this.state.formError ?
                        <div className="error_label">
                            Please check input data
                    </div>
                        : null}
                    <button onClick={(event) => this.submitForm(event)}>
                        Log In
                    </button>
                </form>

            </div>
        );
    }
}

export default connect()(withRouter(Login));
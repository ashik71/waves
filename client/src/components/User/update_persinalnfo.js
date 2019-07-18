import React, { Component } from 'react';
import FormField from '../utils/Forms/formfield';
import { update, generateData, isFormValid, populateFields } from '../utils/Forms/formactions';
import {updateUserInfo,clearUpdateUserInfo} from '../../actions/user_actions';

import { connect } from 'react-redux';

class UpdatePersonalInfo extends Component {

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
            }
        }
    }
    componentDidMount(){
        const newFormdata = populateFields(this.state.formdata,this.props.user.userData);
        this.setState({
            formdata: newFormdata
        })
    }
    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'update_user_info');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }
    submitForm = (event) => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formdata, 'update_user_info');
        const isValid = isFormValid(this.state.formdata, 'update_user_info');
        if (isValid) {
            this.props.dispatch(updateUserInfo(dataToSubmit)).then(()=>{
                if(this.props.user.updateUser.success){
                    this.setState({
                        formSuccess:true
                    },()=>{
                        setTimeout(() => {
                            this.props.dispatch(clearUpdateUserInfo());
                            this.setState({
                                formSuccess:false
                            })
                        }, 2000);
                    })
                }
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
            <div>
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
                    <div>
                        {
                            this.state.formSuccess ?
                                <div className="form_success">Success</div>
                            :null
                        }
                        {this.state.formError ?
                            <div className="error_label">
                                Please check input data
                                        </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Update personal info
                                    </button>
                    </div>
                </form>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UpdatePersonalInfo);
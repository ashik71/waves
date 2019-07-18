import React, { Component } from 'react';
import FormField from '../../utils/Forms/formfield';
import { update, generateData, isFormValid, populateFields } from '../../utils/Forms/formactions';
import { getSiteData ,updateSiteData} from '../../../actions/site_action';
import { connect } from 'react-redux';

class UpdateSiteInfo extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter shop address'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Working hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter shop working hours'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter shop phone'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter shop email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(getSiteData()).then(() => {
            console.log('Site Data=> ', this.props.site);
            const newFormdata = populateFields(this.state.formdata, this.props.site.siteData[0]);
            this.setState({
                formdata: newFormdata
            })
        })
    }
    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'site_info');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formdata, 'site_info');
        const isValid = isFormValid(this.state.formdata, 'site_info');
        if (isValid) {
            this.props.dispatch(updateSiteData(dataToSubmit)).then(()=>{
                this.setState({
                    formSuccess:true
                },()=>{
                    setTimeout(() => {
                        this.setState({
                            formSuccess:false
                        })
                    }, 2000);
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
            <div>
                <form onSubmit={(event) => this.submitform(event)}>
                    <h1>Site info</h1>
                    <FormField
                        id={'address'}
                        formdata={this.state.formdata.address}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'hours'}
                        formdata={this.state.formdata.hours}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'phone'}
                        formdata={this.state.formdata.phone}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />
                    <div>
                        {
                            this.state.formSuccess ?
                                <div className="form_success">Success</div>
                                : null
                        }
                        {this.state.formError ?
                            <div className="error_label">
                                Please check input data
                                        </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Update
                         </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}
export default connect(mapStateToProps)(UpdateSiteInfo);
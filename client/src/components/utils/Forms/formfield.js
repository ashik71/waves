import React from 'react';

const Formfield = ({ formdata, change, id }) => {

const showError = ()=>{
        let errorMessage = '';
        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className ="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }

    const getTemplate = () => {
        let formTemplate = '';

        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div className="formBlock">
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                        />
                        {showError()}
                    </div>
                )
                break;

            default:
                formTemplate = '';
        }
        return formTemplate;
    }


    return (
        <div>            
            {getTemplate()}
        </div>
    );
};

export default Formfield;
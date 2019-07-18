
export const validate = (element, formdata = []) => {
    let error = [true, ''];

    if (element.validation.email) {

        var regeX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = regeX.test(String(element.value));
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.confirm) {

        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Password does not match' : ''}`;
        error = !valid ? [valid, message] : error;
    }


    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;

        error = !valid ? [valid, message] : error;
    }

    return error
}

export const update = (element, formdata, formname) => {
    const newFormdata = {
        ...formdata
    }

    const newElement = {
        ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;

    if (element.blur) {
        let validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;

    newFormdata[element.id] = newElement;

    return newFormdata;

}



export const generateData = (formdata, formname) => {
    let dataToSubmit = {};

    for (let key in formdata) {
        if (key !== 'confirmpassword') {
            dataToSubmit[key] = formdata[key].value;
        }
    }
    return dataToSubmit;
}

export const isFormValid = (formdata, formname) => {
    let isValid = true;

    for (let key in formdata) {
        isValid = formdata[key].valid && isValid;
    }
    return isValid;
}

export const populateOptions = (formdata, array = [], field) => {
    const newArray = [];
    const newFormdata = { ...formdata };
    array.forEach(item => {
        newArray.push(
            {
                key: item._id,
                value: item.name
            }
        );
    });

    newFormdata[field].config.options = newArray;

    return newFormdata;

}


export const resetFields = (formdata, formname) => {
    const newFormdata = { ...formdata };
    for (let key in newFormdata) {
        if (key === 'images') {
            newFormdata[key].value = [];
        } else {
            newFormdata[key].value = '';
        }        
        newFormdata[key].valid = false;
        newFormdata[key].touched = false;
        newFormdata[key].validationMessage = '';
    }
    return newFormdata;
}

export const populateUserData =(formdata,userData)=>{
    
    for(let key in formdata){
        formdata[key].value = userData[key];
        formdata[key].valid = true;
        formdata[key].touched = true;
        formdata[key].validationMessage='';
    }
    return formdata;
}
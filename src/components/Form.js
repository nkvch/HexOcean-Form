import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';

const required = value => value ? undefined : 'Required';

const WarningMessage = (warning) => (
    <div class="alert alert-warning" role="alert">
        <strong>Holy guacamole!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
)

const ErrorMessage = (error) => (
    <div class="alert alert-danger p-2 mt-2" role="alert">
        <strong>Required field!</strong>
    </div>
)

const renderInputField = ({ input, id, label, type, placeholder, meta: { touched, error, warning } }) => (
      <div className="form-floating">
        <input {...input} id={id} placeholder={placeholder} type={type} className="form-control"/>
        <label htmlFor={id}>{label}</label>
        {touched && ((error && ErrorMessage()) || (warning && WarningMessage()))}
      </div>
)

const renderNumberField = ({ input, id, type, label, min, step, max, placeholder, disabled, meta: { touched, error, warning } }) => (
    <div className="form-floating">
        <input {...input} id={id} type={type} className="form-control" min={min} step={step} max={max} placeholder={placeholder} disabled={disabled}></input>
        <label htmlFor={id}>{label}</label>
        {touched && ((error && ErrorMessage()) || (warning && WarningMessage()))}
    </div>
)

const renderRangeField = function({ input, name, id, type, min, max, placeholder, label}) {

    const getSpicinessColor = (value) => {
        let spiciness;
        if (value > 9) { spiciness = 'extremely-spicy'; }
        else if (value > 7) { spiciness = 'very-spicy'; }
        else if (value > 5) { spiciness = 'spicy'; }
        else if (value > 3) { spiciness = 'medium-spicy'; }
        else if (value > 1) { spiciness = 'not-so-spicy'; }
        else { spiciness = 'not-spicy'; }
        return spiciness;
    }

    const getPeppers = (value) => (
        <span>
            {
                Array(value).fill('').map((pepper) => <i class="fas fa-pepper-hot text-danger"></i>)
            }
        </span>
    )

    return (
    <div className="row">
        <div className="col-sm-6 mb-3">
            <label htmlFor={id}>{`${label}: `}<div>{getPeppers(Number(input.value))}</div></label>
        </div>
        <div className="col-sm-6 mb-3">
            <input {...input} name={name} id={id} type={type} className={`form-range ${getSpicinessColor(Number(input.value))}`} min={min} max={max} placeholder={placeholder}></input>
        </div>
    </div>
    )
}

let Form = (props) => {
    const { handleSubmit,
           type,
           spiciness_scale,
           no_of_slices,
           diameter,
           preparation_time_h,
           preparation_time_m,
           preparation_time_s, 
           reset, 
           submitting,
           removeAlerts,
           pristine } = props;
    return (
        <form onSubmit={handleSubmit}>
            <h2>Your dish</h2>
            <div className="row">
                <div className="col-sm-8 mb-3">
                    <Field name="name" 
                    component={renderInputField} 
                    id="name" 
                    type="text"  
                    placeholder="Pizza"
                    onChange={removeAlerts}
                    label="Dish Name"></Field>
                </div>
                <div className="col-sm-4 mb-3">
                    <div className="form-floating">
                        <Field name="type"
                         component="select"
                         className="form-select"
                         id="type" 
                         onChange={removeAlerts}
                         placeholder="Dish Type">
                            <option />
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="sandwich">Sandwich</option>
                        </Field>
                        <label htmlFor="type">Type of dish</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <p>Preparation time</p>
            </div>
            <div className="row">
                <div className="col-4 mb-3">
                    <Field name="preparation_time_h" 
                    component={renderNumberField} 
                    type="number" 
                    min="0"
                    step="1"
                    max="5" 
                    placeholder="Hours"
                    validate={required}
                    label="Hours"
                    disabled={!type}></Field>
                </div>
                <div className="col-4 mb-3">
                    <Field name="preparation_time_m"
                     component={renderNumberField}
                     type="number" 
                     min="0"
                     step="1"
                     max="59" 
                     placeholder="Minutes"
                     validate={required}
                     label="Minutes"
                     disabled={!type}></Field>
                </div>
                <div className="col-4 mb-3">
                    <Field name="preparation_time_s" 
                    component={renderNumberField}
                    type="number" 
                    min="0"
                    step="1"
                    max="59" 
                    placeholder="Seconds"
                    validate={required}
                    label="Seconds"
                    disabled={!type}></Field>
                </div>
            </div>
            {
                type === 'pizza' && <div className="row">
                    <div className="col-sm-6 mb-3">
                        <Field name="no_of_slices" 
                        component={renderNumberField}
                        type="number" 
                        min="1" 
                        step="1" 
                        max="12" 
                        placeholder="# Of Slices"
                        validate={required}
                        label="# of Slices"></Field>
                    </div>
                    <div className="col-sm-6 mb-3">
                        <Field name="diameter" 
                        component={renderNumberField} 
                        type="number" 
                        className="form-control" 
                        step="0.1" 
                        min="26.0" 
                        max="45.0" 
                        placeholder="Diameter"
                        validate={required}
                        label="Diameter"></Field>
                    </div>
                </div>
            }
            {
                type === 'soup' && <div className="row">
                    <Field name="spiciness_scale" 
                    id="spiciness_scale" 
                    component={renderRangeField}
                    type="range"
                    min="1" 
                    max="10" 
                    placeholder="Spiciness"
                    label="Spiciness"></Field>
                </div>
            }
            {
                type === 'sandwich' && <div className="row">
                    <div className="col-12 mb-3">
                        <Field name="slices_of_bread" 
                        component={renderNumberField} 
                        type="number"
                        id="slices_of_bread"
                        min="1" 
                        step="1"
                        max="3" 
                        placeholder="Slices of bread"
                        validate={required}
                        label="# Slices of bread"></Field>
                    </div>

                </div>
            }
            <div className="row">
                <div className="col-6 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary" disabled={submitting }>Submit</button>
                </div>
                <div className="col-6 d-flex justify-content-start">
                    <button type="button" className="btn btn-outline-danger" onClick={reset}>Clear data</button>
                </div>
            </div>
        </form>
    )
};

Form = reduxForm({
    form: 'dishes'
})(Form);

const selector = formValueSelector('dishes');

Form = connect(
    state => {
        const type = selector(state, 'type');
        return {
            type,
            initialValues: {
                spiciness_scale: '4',
                no_of_slices: '4',
                diameter: '36',
                preparation_time_h: '0',
                preparation_time_m: '40',
                preparation_time_s: '0',
                slices_of_bread: '2',
            }
        }
    }
)(Form);

export default Form;
import React, { useState } from 'react';
import Form from './Form';
import PostService from '../services/PostService';

function FormHandler(props) {

    const [validError, setValidError] = useState();
    const [success, setSuccess] = useState();

    const renderAlert = () => (
        <div class="alert alert-danger position-absolute main-alert" role="alert">
            <strong>{validError.name || validError.type}!</strong>
        </div>
    )

    const renderAlertSuccess = () => (
        <div class="alert alert-success position-absolute main-alert" role="alert">
            Your {success.type} <strong>{success.name}</strong> has been posted successfully!
        </div>
    )

    const handleSubmit = async function(obj) {
        obj.preparation_time = `${obj.preparation_time_h.padStart(2,0)}:${obj.preparation_time_m.padStart(2,0)}:${obj.preparation_time_s.padStart(2,0)}`;
        const { no_of_slices,
                diameter,
                spiciness_scale,
                slices_of_bread,
                preparation_time_h,
                preparation_time_m,
                preparation_time_s,
                ...dish } = obj;
        if (dish.type === 'pizza') {
            dish.no_of_slices = Number(no_of_slices);
            dish.diameter = Number(diameter);
        } else if (dish.type === 'soup') {
            dish.spiciness_scale = Number(spiciness_scale);
        } else if (dish.type === 'sandwich') {
            dish.slices_of_bread = Number(slices_of_bread);
        }
        PostService.postDish(dish).then((res) => {
            setSuccess(res.data);
        }).catch((e) => {
            setValidError(e.response.data)
        });
    } 

    return (
        <div className="container position-relative pt-5">
            <div className="card m-auto">
                <div className="card-body">
                    <Form onSubmit={(obj) => handleSubmit(obj)}  removeAlerts={() => {setValidError(false); setSuccess(false)}}/>
                </div>
            </div>
            {
            validError
            ? renderAlert()
            : null
            }
            {
            success
            ? renderAlertSuccess()
            : null
            }
        </div>
    )
}

export default FormHandler;
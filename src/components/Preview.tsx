// import React from 'react'
import './css/Preview.css'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

import { useFormik } from 'formik'
import * as Yup from 'yup'

function Preview() {
    const {id} = useParams()
    const nevigate = useNavigate()
    interface RootState {
        forms: any
    }
    const forms = useSelector((state: RootState) => state.forms);
    const form = forms.filter((form:any)=>form.id===id)[0]

    console.log("==============> ",form.fields.map((f:any)=>f.question))
    const questions:string[] = form.fields.map((f:any)=>f.question)

    const initialValues:any = {}
    for (let i = 0; i < questions.length; i++) {
        // console.log(questions[i]);
        //   [questions[i]]=''
        initialValues[ questions[i] ]=''
    }


    const pformik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({

        }),
        onSubmit: (values, { resetForm }) => {
            console.log("Form Submitted", values);
            // Reset the form after submission
            resetForm();
            nevigate('/')

      
            console.log("Form Submitted", values);
      
        }
    })

    return (
        <>
            <div className='preview-main'>
                <h1>{form.formName}</h1>
                <form onSubmit={pformik.handleSubmit}>
                    {form.fields.map((field:any)=>(
                        <>
                            <div className='input-form-label'>{field.question}</div>
                            <input className='input-form' 
                            type={field.type} 
                            name={field.question}
                            value={pformik.values[field.question]}
                            onChange={pformik.handleChange}
                            placeholder={field.question}/>
                        </>
                    ))}
                    <div>
                        <button className='btn-submit' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Preview
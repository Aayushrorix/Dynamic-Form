import './css/Preview.css'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

import { useFormik } from 'formik'
import * as Yup from 'yup'

function Preview() {
    const {id} = useParams()
    const navigate = useNavigate()
    interface RootState {
        forms: any
    }
    const forms = useSelector((state: RootState) => state.forms);
    const form = forms.filter((form:any)=>form.id===id)[0]

    const initialValues: any = {};
    const validationSchema: any = {};

    form.fields.forEach((field: any) => {
        initialValues[field.question] = '';
        if (field.fieldRequired) {
            validationSchema[field.question] = Yup.string().required(`${field.question} is required`);
        } else {
            validationSchema[field.question] = Yup.string().notRequired();
        }
    });

    const pformik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape(validationSchema),
        onSubmit: (values, { resetForm }) => {
            console.log("Form Submitted", values);
            resetForm();
            navigate('/');
        }
    });

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
                            onBlur={pformik.handleBlur}
                            placeholder={field.question}/>
                            {pformik.touched[field.question] && pformik.errors[field.question] && <p style={{color:"red"}}>{field.question} is Required</p>}
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
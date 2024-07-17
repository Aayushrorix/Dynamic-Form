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
            if(field.maxLength && field.minLength && ['text','number','textArea'].includes(field.type)){
                validationSchema[field.question] = Yup.string().required(`${field.question} is required`)
                .max(field.max,`${field.question} must be less than or equal to ${field.max}`)
                .min(field.min,`${field.question} must be greater than or equal to ${field.min}`)
            }
            else if(field.maxLength && ['text','number','textArea'].includes(field.type)){
                validationSchema[field.question] = Yup.string().required(`${field.question} is required`)
                .max(field.max,`${field.question} must be less than or equal to ${field.max}`)
            }
            else if(field.minLength && ['text','number','textArea'].includes(field.type)){
                validationSchema[field.question] = Yup.string().required(`${field.question} is required`)
                .min(field.min,`${field.question} must be greater than or equal to ${field.min}`)
            }
            else{
                validationSchema[field.question] = Yup.string().required(`${field.question} is required`)
            }
        } else {
            if(field.maxLength && field.minLength && ['text','number','textArea'].includes(field.type) ){
                validationSchema[field.question] = Yup.string().notRequired()
                .max(field.max,`${field.question} must be less than or equal to ${field.max}`)
                .min(field.min,`${field.question} must be greater than or equal to ${field.min}`)
            }
            else if(field.maxLength && ['text','number','textArea'].includes(field.type)){
                validationSchema[field.question] = Yup.string().notRequired()
                .max(field.max,`${field.question} must be less than or equal to ${field.max}`)
            }
            else if(field.minLength && ['text','number','textArea'].includes(field.type)){
                validationSchema[field.question] = Yup.string().notRequired()
                .min(field.min,`${field.question} must be greater than or equal to ${field.min}`)
            }
            else{
                validationSchema[field.question] = Yup.string().notRequired()
            }
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

    function handleOptionChange(question:string,opt:string){
        pformik.setFieldValue(question,opt)
    }

    return (
        <>
            <div className='preview-form'>
                <h1>{form.formName}</h1>
                <form onSubmit={pformik.handleSubmit} className=''>
                    {form.fields.map((field:any)=>(
                        <>
                            <div className='input-form-label'>{field.question}</div>


                            {field.type!=='radio' && field.type!=='dropdown' && <input className='input-form' 
                            type={field.type} 
                            name={field.question}
                            value={pformik.values[field.question]}
                            onChange={pformik.handleChange}
                            onBlur={pformik.handleBlur}
                            placeholder={field.question}/>}


                            {field.type==='dropdown' && 
                                <select 
                                className="input-box"
                                name={field.question}
                                value={pformik.values[field.question]}
                                onChange={pformik.handleChange}
                                onBlur={pformik.handleBlur}
                                >
                                <option value="">Select</option>
                                {field.dropList?.map((opt:string)=>(
                                    <option value={opt}>{opt}</option>
                                ))}
                            </select>
                            }

                            {field.type==='radio' && 
                                <>
                                    {field.radioList?.map((opt:string)=>(
                                        <>
                                        {opt}<input type="radio" name={field.question} value={opt} onChange={()=>handleOptionChange(field.question,opt)}/>
                                        </>
                                    ))}
                                </>
                            }

                            {pformik.touched[field.question] && pformik.errors[field.question] && <p style={{color:"red"}}>{String(pformik.errors[field.question])}</p>}
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
// import React from 'react'
import './css/Preview.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function Preview() {
    const {id} = useParams()
    interface RootState {
        forms: any
    }
    const forms = useSelector((state: RootState) => state.forms);
    const form = forms.filter((form:any)=>form.id===id)[0]
    return (
        <>
            

            <div className='preview-main'>
                <h1>{form.formName}</h1>
                <form>
                    {form.fields.map((field:any)=>(
                        <>
                            <div className='input-form-label'>{field.question}</div>
                            <input className='input-form' type={field.type} placeholder={field.question}/>
                        </>
                    ))}
                    <div>
                        <button className='btn-submit' type='button'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Preview
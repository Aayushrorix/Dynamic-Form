import { useNavigate } from 'react-router-dom'
import './css/Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeForm } from '../state/slices/FormSlice';

function Home() {
    interface RootState {
        forms: any;
    }
    const forms = useSelector((state: RootState) => state.forms);
    const nevigate = useNavigate()
    const dispatch = useDispatch()

    function onAddFormNavigate(){
        nevigate('/add-form')
    }

    function onEditForm(id:string){
        nevigate(`/edit-form/${id}`)
    }

    function onRemoveForm(id:string){
        dispatch(removeForm(id))
    }

    function onPreview(id:string){
        nevigate(`/preview/${id}`)
    }

    return (
        <>
        <div>
            <div className='grid-container'>
                {forms.map((form:any)=>(
                    <>
                        <div className='grid-item'>
                            <div>
                                {form.formName}
                            </div>
                            <span>
                                <button type='button' onClick={()=>onEditForm(form.id)}>Edit</button>
                                <button type='button' onClick={()=>onRemoveForm(form.id)}>Remove</button>
                                <button type='button' onClick={()=>onPreview(form.id)}>Preview</button>
                            </span>
                        </div>
                        
                    </>
                ))}
            </div>
        </div>
        <div className='home-main'>
            <button onClick={()=>{onAddFormNavigate()}} className='btn-add-form'>+</button>
        </div>
        </>
    )
}

export default Home
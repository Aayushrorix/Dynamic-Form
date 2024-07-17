import { useNavigate, useParams } from 'react-router-dom';
import './css/AddForm.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addForm, editForm } from '../state/slices/FormSlice.tsx';
import { nanoid } from '@reduxjs/toolkit';

import { useFormik } from 'formik'
import * as Yup from 'yup'

function AddForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { oldId } = useParams();
    interface RootState {
        forms: any[];
    }

    const forms = useSelector((state: RootState) => state.forms);
    const [formName, setFormName] = useState('');
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (oldId) {
            const form = forms.find(form => form.id === oldId);
            if (form) {
                setFormName(form.formName);
                setId(oldId);
                setEditMode(true);
                formik.setFieldValue('formName',form.formName)
            }
        } else {
            setId(nanoid());
        }
        formik.setFieldValue('id',id)
    }, [oldId, forms]);

    const formik = useFormik({
        initialValues: {
            id:id,
            formName: ''
        },
        validationSchema: Yup.object({
            formName: Yup.string()
            .required("Form Name is Required")
        }),
        onSubmit: (values, { resetForm }) => {
            console.log("Form Submitted", values);
            if(editMode){
                dispatch(editForm({ id, formName }));
            }
            else{
                dispatch(addForm({ id, formName, fields: [] }));
            }
            navigate(`/add-questions/${id}`);
            resetForm();
        }
    })

    const handleBackToList = () => {
        navigate('/');
    };

    useEffect(()=>{setFormName(formik.values.formName)},[formik.values.formName])

    return (
        <div className="add-form-main">
            <form onSubmit={formik.handleSubmit}>
                <div className="input-form-name-label">Form Name</div>
                <input
                    className="input-form-name"
                    type="text"
                    name='formName'
                    value={formik.values.formName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.formName && formik.errors.formName && <p style={{color:"red"}}>{formik.errors.formName}</p>}
                <input type="hidden" name="id" value={formik.values.id} />
                <div className="btn-div">
                    <button className="btn-back-home" type="button" onClick={()=>handleBackToList()}>
                        Back to List
                    </button>
                    {!editMode && (
                        <button
                            className="btn-add-questions-nevigate"
                            type="submit"
                        >
                            Add Questions
                        </button>
                    )}
                    {editMode && (
                        <button
                            className="btn-add-questions-nevigate"
                            type="submit"                            
                        >
                            Edit Name & Go to Questions
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default AddForm;
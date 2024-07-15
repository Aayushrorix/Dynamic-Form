import { useNavigate, useParams } from 'react-router-dom';
import './css/AddForm.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addForm, editForm } from '../state/slices/FormSlice.tsx';
import { nanoid } from '@reduxjs/toolkit';

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
            }
        } else {
            setId(nanoid());
        }
    }, [oldId, forms]);

    const handleAddFormClick = () => {
        dispatch(addForm({ id, formName, fields: [] }));
    };

    const handleEditFormClick = () => {
        dispatch(editForm({ id, formName }));
    };

    const handleBackToList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        navigate('/');
    };

    return (
        <div className="add-form-main">
            <form onSubmit={handleBackToList}>
                <div className="input-form-name-label">Form Name</div>
                <input
                    className="input-form-name"
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                />
                <div className="btn-div">
                    <button className="btn-back-home" type="submit">
                        Back to List
                    </button>
                    {!editMode && (
                        <button
                            className="btn-add-questions-nevigate"
                            type="button"
                            onClick={() => {
                                handleAddFormClick();
                                navigate(`/add-questions/${id}`);
                            }}
                        >
                            Add Questions
                        </button>
                    )}
                    {editMode && (
                        <button
                            className="btn-add-questions-nevigate"
                            type="button"
                            onClick={() => {
                                handleEditFormClick();
                                navigate(`/add-questions/${id}`);
                            }}
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
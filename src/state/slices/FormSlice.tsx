import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    forms: [
        {
            id:'asdasd',
            formName: 'Test Form 1',
            fields: [
                {
                    fieldName: 'Test Field 1',
                    fieldType: 'number',
                    fieldRequired: false,
                    maxLength: true,
                    minLength: true,
                    min: 5,
                    max: 10,
                },
            ],
        },
    ]
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addForm: (state:any, action) => {
            const form = {
                id: action.payload.id,
                formName: action.payload.formName,
                fields:[]
            }
            state.forms.push(form)
        },
        editForm: (state:any, action: PayloadAction<{ id: string; formName: string }>) => {
            const { id, formName } = action.payload;
            const formToUpdate = state.forms.find((form:any) => form.id === id);
            if (formToUpdate) {
                formToUpdate.formName = formName;
            }
        },
        removeForm: (state, action) => {
            state.forms = state.forms.filter((form) => form.id !== action.payload)
        },
        updateField: (state, action: PayloadAction<{ id: string; fields: any[] }>) => {
            const { id, fields } = action.payload;
            const formToUpdate = state.forms.find((form) => form.id === id);
            if (formToUpdate) {
              formToUpdate.fields = fields;
            }
        },
    }
})

export const {addForm, removeForm, updateField, editForm} = formSlice.actions

export default formSlice.reducer
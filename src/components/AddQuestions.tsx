import { useNavigate, useParams } from "react-router-dom"
import './css/AddQuestions.css'
import MultiSelectDropdown from "./MultiSelectDropdown";
import { useEffect, useState } from "react";
import { updateField } from '../state/slices/FormSlice.tsx'
import { useSelector,useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useFormik } from "formik";
import * as Yup from 'yup'


function AddQuestions() {
    const nevigate = useNavigate()
    const dispatch = useDispatch()
	const forms = useSelector((state:any) => state.forms)
	const {id} = useParams()
	const [editMode, setEditMode] = useState(false)
	const [currEditId, setCurrEditId] = useState<string>()

	const form:any = forms.filter((f:any)=>f.id===id)[0]
	const [fields,setFields] = useState(form.fields?form.fields:[])

    const options = [
        { value: 'required', label: 'Requited' },
        { value: 'maxLength', label: 'Max Length' },
        { value: 'minLength', label: 'Min Length' },
    ];

	const labelName:string = "Validation"

	const multiSelectDropdown = MultiSelectDropdown({options, labelName})
	const element = multiSelectDropdown.element
	const selectedItems = multiSelectDropdown.selectedItems

	const [question, setQuestion] = useState<string>()
	const [type, setType] = useState<string>()
	const [max, setMax] = useState<number|undefined>()
	const [min, setMin] = useState<number|undefined>()

	useEffect(()=>{
		console.log(selectedItems)
		qformik.setFieldValue('maxLength',selectedItems.includes('maxLength')?true:false)
		qformik.setFieldValue('minLength',selectedItems.includes('minLength')?true:false)
		qformik.setFieldValue('fieldRequired',selectedItems.includes('required')?true:false)
	},[selectedItems,fields])

	const uuid = uuidv4();
	const qformik = useFormik({
		initialValues : {
			qid:uuid,
			question:'',
			type:'',
			fieldRequired:false,
			max:undefined,
			min:undefined,
			maxLength:false,
			minLength:false,
		},
		validationSchema: Yup.object().shape({
			question:Yup.string()
			.required('Question is Required'),
			type: Yup.string()
			.required('Type is Required'),
			maxLength: Yup.boolean(),
			minLength: Yup.boolean(),
			max: Yup.string().when("maxLength", {
				is: true,
				then: (schema) => schema.required('Max is required'),
				otherwise: (schema) => schema.notRequired()
			}),
			min: Yup.string().when("minLength", {
				is: true,
				then: (schema) => schema.required('Min is required'),
				otherwise: (schema) => schema.notRequired()
			}),
		}),
		onSubmit: (values, { resetForm }) => {

			if(!editMode){
				const uuid = uuidv4();
				setFields([...fields, {
					qid:uuid,
					question:question,
					type:type,
					fieldRequired:selectedItems.includes('required')?true:false,
					max:selectedItems.includes('maxLength')?max:undefined,
					min:selectedItems.includes('minLength')?min:undefined,
					maxLength:selectedItems.includes('maxLength')?true:false,
					minLength:selectedItems.includes('minLength')?true:false,
				}])

				dispatch(updateField({id:String(id),fields:[...fields, {
					qid:uuid,
					question:question,
					type:type,
					fieldRequired:selectedItems.includes('required')?true:false,
					max:selectedItems.includes('maxLength')?max:undefined,
					min:selectedItems.includes('minLength')?min:undefined,
					maxLength:selectedItems.includes('maxLength')?true:false,
					minLength:selectedItems.includes('minLength')?true:false,
				}]}))

				selectedItems.length=0
			}
			else{
				if(fields.filter((field:any) => field.qid===currEditId).length>0){
					setFields([...fields.filter((field:any) => field.qid!==currEditId),
						{
							qid:currEditId,
							question:question,
							type:type,
							fieldRequired:selectedItems.includes('required')?true:false,
							max:selectedItems.includes('maxLength')?max:undefined,
							min:selectedItems.includes('minLength')?min:undefined,
							maxLength:selectedItems.includes('maxLength')?true:false,
							minLength:selectedItems.includes('minLength')?true:false,
						}
					])
					dispatch(updateField({
						id:String(id),
						fields:
						[...fields.filter((field:any) => field.qid!==currEditId),
							{
								qid:currEditId,
								question:question,
								type:type,
								fieldRequired:selectedItems.includes('required')?true:false,
								max:selectedItems.includes('maxLength')?max:undefined,
								min:selectedItems.includes('minLength')?min:undefined,
								maxLength:selectedItems.includes('maxLength')?true:false,
								minLength:selectedItems.includes('minLength')?true:false,
							}
						]
					}))
		
				}
				selectedItems.length=0
				setEditMode(false)
			}

			

			



			console.log("Form Submitted", values);
			// Reset the form after submission
			resetForm();
			nevigate(``)
	  
			console.log("Form Submitted", values);
	  
		  }
	})

	useEffect(()=>{setQuestion(qformik.values.question)},[qformik.values.question])
	useEffect(()=>{setType(qformik.values.type)},[qformik.values.type])
	useEffect(()=>{setMax(qformik.values.max)},[qformik.values.max])
	useEffect(()=>{setMin(qformik.values.min)},[qformik.values.min])

	// function addQuestionBtn(){
	// 	const uuid = uuidv4();
	// 	setFields([...fields, {
	// 		qid:uuid,
	// 		question:question,
	// 		type:type,
	// 		fieldRequired:selectedItems.includes('required')?true:false,
	// 		max:selectedItems.includes('maxLength')?max:undefined,
	// 		min:selectedItems.includes('minLength')?min:undefined,
	// 		maxLength:selectedItems.includes('maxLength')?true:false,
	// 		minLength:selectedItems.includes('minLength')?true:false,
	// 	}])

	// 	dispatch(updateField({id:String(id),fields:[...fields, {
	// 		qid:uuid,
	// 		question:question,
	// 		type:type,
	// 		fieldRequired:selectedItems.includes('required')?true:false,
	// 		max:selectedItems.includes('maxLength')?max:undefined,
	// 		min:selectedItems.includes('minLength')?min:undefined,
	// 		maxLength:selectedItems.includes('maxLength')?true:false,
	// 		minLength:selectedItems.includes('minLength')?true:false,
	// 	}]}))

	// 	setQuestion('')
	// 	setType('')
	// 	setMax(undefined)
	// 	setMin(undefined)
	// 	selectedItems.length=0

	// 	nevigate(``)
	// }

	function removeQuestion(qid:string){
		setFields(fields.filter((field:any) => field.qid!==qid))
		dispatch(updateField({id:String(id),fields:fields.filter((field:any) => field.qid!==qid)}))
	}

	function editQuestion(qid:string){
		setCurrEditId(qid)
		qformik.setFieldValue('qid',qid)

		setEditMode(true)

		const field = fields.filter((field:any) => field.qid===qid)[0]

		setQuestion(field.question)
		qformik.setFieldValue('question',field.question)

		setType(field.type)
		qformik.setFieldValue('type',field.type)

		if(field.fieldRequired){
			selectedItems.push('required')
			qformik.setFieldValue('fieldRequired',true)
		}

		if(field.maxLength){
			selectedItems.push('maxLength')
			qformik.setFieldValue('maxLength',true)
		}

		if(field.minLength){
			selectedItems.push('minLength')
			qformik.setFieldValue('minLength',true)
		}

		setMax(field.max)
		qformik.setFieldValue('max',field.max)
		setMin(field.min)
		qformik.setFieldValue('min',field.min)
	}

	// function editQuestionBtn(){
	// 	if(fields.filter((field:any) => field.qid===currEditId).length>0){
	// 		setFields([...fields.filter((field:any) => field.qid!==currEditId),
	// 			{
	// 				qid:currEditId,
	// 				question:question,
	// 				type:type,
	// 				fieldRequired:selectedItems.includes('required')?true:false,
	// 				max:selectedItems.includes('maxLength')?max:undefined,
	// 				min:selectedItems.includes('minLength')?min:undefined,
	// 				maxLength:selectedItems.includes('maxLength')?true:false,
	// 				minLength:selectedItems.includes('minLength')?true:false,
	// 			}
	// 		])
	// 		dispatch(updateField({
	// 			id:String(id),
	// 			fields:
	// 			[...fields.filter((field:any) => field.qid!==currEditId),
	// 				{
	// 					qid:currEditId,
	// 					question:question,
	// 					type:type,
	// 					fieldRequired:selectedItems.includes('required')?true:false,
	// 					max:selectedItems.includes('maxLength')?max:undefined,
	// 					min:selectedItems.includes('minLength')?min:undefined,
	// 					maxLength:selectedItems.includes('maxLength')?true:false,
	// 					minLength:selectedItems.includes('minLength')?true:false,
	// 				}
	// 			]
	// 		}))

	// 	}
		
	// 	setQuestion('')
	// 	setType('')
	// 	setMax(undefined)
	// 	setMin(undefined)
	// 	selectedItems.length=0

	// 	setEditMode(false)
	// }

    return (
		<>
			<div className="container">
				<div className="left">
					<h1 className="question-heading">Add Questions</h1>
					<form onSubmit={qformik.handleSubmit}>
						<input 
							className="input-box" 
							type="text" placeholder="Question *"
							name="question"
							// value={question}
							// onChange={(e:any)=> setQuestion(e.target.value)}
							value={qformik.values.question}
							onChange={qformik.handleChange}
							onBlur={qformik.handleBlur}
						/>
						{qformik.touched.question && qformik.errors.question && <p style={{color:"red"}}>{qformik.errors.question}</p>}

						<select 
							className="input-box"
							name="type"
							// value={type} 
							// onChange={(e:any)=> setType(e.target.value)}
							value={qformik.values.type}
							onChange={qformik.handleChange}
							onBlur={qformik.handleBlur}
						>
							<option value="">Type *</option>
							<option value='text'>text</option>
							<option value='number'>number</option>
							<option value='textArea'>textArea</option>
							<option value='date'>date</option>
							<option value='dropdown'>dropdown</option>
							<option value='radio'>radio</option>
						</select>
						{qformik.touched.type && qformik.errors.type && <p style={{color:"red"}}>{qformik.errors.type}</p>}

						{element}

						<div>
							{selectedItems.includes('maxLength') && (<span>
								<input className="input-box"
								name="max"
								type="number" 
								placeholder="Max*" 
								// value={max} 
								// onChange={(e:any)=> setMax(e.target.value)}
								value={qformik.values.max}
								onChange={qformik.handleChange}
								onBlur={qformik.handleBlur}
								/>
								{qformik.touched.max && qformik.errors.max && <p style={{color:"red"}}>{qformik.errors.max}</p>}
							</span>)}
							{selectedItems.includes('minLength') &&  (<span>
								<input 
									className="input-box" 
									type="number" placeholder="Min*"
									name="min"
									// value={min} 
									// onChange={(e:any)=> setMin(e.target.value)}
									value={qformik.values.min}
									onChange={qformik.handleChange}
									onBlur={qformik.handleBlur}
								/>
								{qformik.touched.min && qformik.errors.min && <p style={{color:"red"}}>{qformik.errors.min}</p>}
							</span>)}
						</div>
						<div className="grid-container">
					</div>

						{!editMode && 
						<button 
							className="add-question-btn" 
							type="submit" 
							// onClick={addQuestionBtn}
						>
							Add Question to From
						</button>
						}
						{editMode && 
						<button 
							className="add-question-btn" 
							type="submit" 
							// onClick={editQuestionBtn}
						>
							Edit Question to From
						</button>
						}
					</form>
				</div>

				<div className="right">					
					{fields.map((f:any,index:number)=>(
						<>
						<div className="grid-item">
							<span style={{textAlign:'start',alignContent:'start',alignItems:'start'}}>
								{index+1}. {f.question}
							</span>
							<button style={{float:'right',margin:'2px'}} onClick={()=>removeQuestion(f.qid)}>Remove</button>
							<button style={{float:'right',margin:'2px'}} onClick={()=>editQuestion(f.qid)}>Edit</button>
						</div>
						</>
					))}
				</div>
			</div>

			<div className='home-main'>
				<button onClick={()=>{nevigate('/')}} className='btn-add-form'><img className="home-image" src="home_icon.png"></img></button>
			</div>
		</>

	)
}

export default AddQuestions
import { useNavigate, useParams } from "react-router-dom"
import './css/AddQuestions.css'
import MultiSelectDropdown from "./MultiSelectDropdown";
import { useEffect, useState } from "react";
import { updateField } from '../state/slices/FormSlice.tsx'
import { useSelector,useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'


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

	useEffect(()=>{console.log(selectedItems)},[selectedItems,fields])

	function addQuestionBtn(){
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

		setQuestion('')
		setType('')
		setMax(undefined)
		setMin(undefined)
		selectedItems.length=0

		nevigate(``)
	}

	function removeQuestion(qid:string){
		setFields(fields.filter((field:any) => field.qid!==qid))
		dispatch(updateField({id:String(id),fields:fields.filter((field:any) => field.qid!==qid)}))
	}

	function editQuestion(qid:string){
		setCurrEditId(qid)
		setEditMode(true)
		const field = fields.filter((field:any) => field.qid===qid)[0]
		setQuestion(field.question)
		setType(field.type)

		if(field.fieldRequired){
			selectedItems.push('required')
		}

		if(field.maxLength){
			selectedItems.push('maxLength')
		}

		if(field.minLength){
			selectedItems.push('minLength')
		}

		setMax(field.max)
		setMin(field.min)
	}

	function editQuestionBtn(){
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
		
		setQuestion('')
		setType('')
		setMax(undefined)
		setMin(undefined)
		selectedItems.length=0

		setEditMode(false)
	}

    return (
		<>
			<div className="container">
				<div className="left">
					<h1 className="question-heading">Add Questions</h1>
					<form>
						<input className="input-box" type="text" placeholder="Question *" value={question} onChange={(e:any)=> setQuestion(e.target.value)}/>

						<select className="input-box" value={type} onChange={(e:any)=> setType(e.target.value)}>
							<option value="">Type *</option>
							<option value='text'>text</option>
							<option value='number'>number</option>
							<option value='textArea'>textArea</option>
							<option value='date'>date</option>
							<option value='dropdown'>dropdown</option>
							<option value='radio'>radio</option>
						</select>

						{element}

						<div>
							{selectedItems.includes('maxLength') && (<span>
								<input className="input-box" type="number" placeholder="Max*" value={max} onChange={(e:any)=> setMax(e.target.value)}/>
							</span>)}
							{selectedItems.includes('minLength') &&  (<span>
								<input className="input-box" type="number" placeholder="Min*" value={min} onChange={(e:any)=> setMin(e.target.value)}/>
							</span>)}
						</div>
						<div className="grid-container">
					</div>

						{!editMode && <button className="add-question-btn" type="button" onClick={addQuestionBtn}>Add Question to From</button>}
						{editMode && <button className="add-question-btn" type="button" onClick={editQuestionBtn}>Edit Question to From</button>}
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
				<button onClick={()=>{nevigate('/')}} className='btn-add-form'><img className="home-image" src="home.png"></img></button>
			</div>
		</>
	)
}

export default AddQuestions
export interface field{
    qid:string|undefined;
    question:string|undefined;
    type:string|undefined;
    fieldRequired:boolean;
    maxLength:boolean;
    minLength:boolean;
    max:number|undefined;
    min:number|undefined;
    radioList:string[];
    dropList:string[];
}

export interface form{
    id:string;
    formName:string;
    fields:field[];
}
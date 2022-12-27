

import {
   HANDLE_CHANGE,
   HANDLE_CHECK,
   QUIZ_START,
   INCREASE_CORRECT_ANSWERS,
   INCREASE_QUESTION_INDEX,
   SELECTED_OPTION,
   MODEL,
   DATA,
   RESET
} from './actions'

import { initialState}  from "./appContext"

const reducer = (state, action) => {
  if(action.type===HANDLE_CHANGE){
    return {
      ...state,
      [action.payload.name]:Number(action.payload.value)
    }
   }

   if(action.type===HANDLE_CHECK){
    return {
      ...state,
      [action.payload.name]:action.payload.checked
    }
   }

   if(action.type===QUIZ_START){
    return{
      ...state,
      quizStart:true
    }
   }

   if(action.type===INCREASE_CORRECT_ANSWERS){
    return{
      ...state,
      correctAnswers:state.correctAnswers+1
    }
   }

   if(action.type===INCREASE_QUESTION_INDEX){
     let no=state.questionIndex+1
     if(no===state.noOfQuestions){
      return {
        ...state,
        model:true
      }
     }


     else{
       return{
         ...state,
         questionIndex:state.questionIndex+1
        }
      }


   }

   if(action.type===SELECTED_OPTION){
    return{
      ...state,
      selectedOption:action.payload.data
    }
   }

   if(action.type===DATA){
    return{
      ...state,
      data:action.payload.data
    }
   }
   
   if(action.type===MODEL){
    return{
      ...state,
      model:true
    }
   }

   if(action.type===RESET){
    return{
      ...initialState
    }
   }


  throw new Error(`no such action : ${action.type}`)
}

export default reducer

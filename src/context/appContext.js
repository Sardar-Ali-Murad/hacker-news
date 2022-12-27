import React, { useReducer, useContext } from 'react'
import reducer from './reducer'

import {
  HANDLE_CHANGE,
  HANDLE_CHECK,
  QUIZ_START,
  INCREASE_CORRECT_ANSWERS,
  INCREASE_QUESTION_INDEX,
  SELECTED_OPTION,
  DATA,
  MODEL,
  RESET
} from './actions'
import { Mode } from '@mui/icons-material'


const initialState = {
  quizStart:false,
  noOfQuestions:10,
  category:"sports",
  difficulty:"easy",
  questionIndex:0,
  correctAnswers:0,
  selectedOption:"",
  data:[],
  model:false
}


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
   
  function handleChange(name,value){
    dispatch({type:HANDLE_CHANGE,payload:{name:name,value:value}})
  }

  function handleCheck(name,checked){
    dispatch({type:HANDLE_CHECK,payload:{name:name,value:checked}})
  }

  let start=async ()=>{
      dispatch({type:QUIZ_START})
      let {difficulty,category,noOfQuestions}=state
      let initial=await fetch(`https://opentdb.com/api.php?amount=${Number(noOfQuestions)}&category=${category==="sports"?Number(21):category==="politics"?Number(23):category==="history"?Number(23):Number(21)}&difficulty=${difficulty}&type=multiple`)
      let final=await initial.json()
      dispatch({type:DATA,payload:{data:final.results}})
  }

  function increseIndex(){
    dispatch({type:INCREASE_QUESTION_INDEX})
  }

  function increaseCorrect(){
    dispatch({type:INCREASE_CORRECT_ANSWERS})
  }

  function option(value){
    dispatch({type:SELECTED_OPTION,payload:{data:value}})
  }

  function reset(){
    dispatch({type:RESET})
  }
  
 
  
  return (
    <AppContext.Provider
    value={{
      ...state,
      handleChange,
      handleCheck,
      start,
      increaseCorrect,
      increseIndex,
      option,
      reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }

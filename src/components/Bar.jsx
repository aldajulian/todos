import moment from "moment";
import { useAtom } from 'jotai'
import React, { useState, useRef, useEffect } from "react";
import { MakeID, useAutosizeTextArea } from '../utils/config'
import { todos_atoms } from '../utils/store'

const Bar = () => {
  const [todos, setTodos] = useAtom(todos_atoms)
  const [ inputBar, setInputBar ] = useState('')
  const [ counter, setCounter ] = useState(0)
  const inputRef = useRef(null);

  const resizeTextArea = () => {
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = inputRef.current.scrollHeight + "px";
  }

  const handleKey = (e) => {
    let inputValue = inputRef.current.value

    if(e.key === "Enter") {
      e.preventDefault();

      if (!inputValue.length) return;
      let newTask = {
        id: MakeID(6),
        name: inputValue,
        created_at: moment()
      }

      setTodos((prevState) => (
        [newTask, ...prevState]
      ))
      
      setInputBar('')
      // inputRef.current.value = ''
    }
  }

  const onChange = e => {
    setInputBar(e.target.value);
    setCounter(e.target.value.length)
  };

  useEffect(resizeTextArea, [inputBar])

  return(
    <div className='bar d-flex flex-align-center flex-content-between'>
      <textarea
        ref={inputRef}
        placeholder='Add your next task'
        rows={1}
        value={inputBar}
        onKeyDown={(e) => handleKey(e)}
        onChange={onChange}
        maxLength='130'
      />
      <span className="counter">{counter} / 130</span>
    </div>
  )
}

export default Bar;
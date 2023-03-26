import moment from "moment";
import { useAtom } from 'jotai'
import React, { useState, useRef, useEffect, useCallback } from "react";
import { MakeID, useAutosizeTextArea } from '../utils/config'
import { todos_atoms } from '../utils/store'
import { debounce } from "lodash";

const Bar = () => {
  const [todos, setTodos] = useAtom(todos_atoms)
  const [ inputBar, setInputBar ] = useState('')
  const [ counter, setCounter ] = useState(0)
  const [ help, setHelp ] = useState(false)
  const [ focus, setFocus ] = useState(false)
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
      setCounter(0)
      setHelp(false)
    }
  }

  const debouncedHelp = useCallback(debounce(() => {
    setHelp(true)
  }, 500), [])

  const onChange = e => {
    setInputBar(e.target.value);
    setCounter(e.target.value.length)

    if(e.target.value.length) {
      debouncedHelp()
    }else{
      setHelp(false)
    }
  };

  useEffect(resizeTextArea, [inputBar])

  return(
    <div className={`bar d-flex flex-align-center flex-content-between ${focus && 'focus'}`}>
      <textarea
        ref={inputRef}
        placeholder='Add your next task'
        rows={1}
        value={inputBar}
        onKeyDown={(e) => handleKey(e)}
        onChange={onChange}
        onBlur={() => {setHelp(false), setFocus(false)}}
        onFocus={() => setFocus(true)}
        maxLength='130'
      />
      <span className="counter">
        <span>{counter} / 130</span>
        <span className='bar-helper'>{help && 'Press Enter to add task'}</span>
      </span>
    </div>
  )
}

export default Bar;
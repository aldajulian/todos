import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import Mark from './Mark'
import { useAtom } from 'jotai'
import { todos_atoms } from '../../utils/store'

const Edit = ({ item, handleActive, handleMessage }) => {
  const [todos, setTodos] = useAtom(todos_atoms)
  // const [activeTodo, setActiveTodo] = useState('')
  const [name, setName] = useState(item.name)
  const [notes, setNotes] = useState(item.notes)
  const nameRef = useRef(null);
  const noteRef = useRef(null);

  const handleCheck = (item) => {
    handleMessage(`${item.name} marked as done`)
  }

  const resizeName = () => {
    nameRef.current.style.height = "auto";
    nameRef.current.style.height = nameRef.current.scrollHeight + "px";
    console.log(nameRef.current.scrollHeight)
  }

  const resizeNotes = () => {
    noteRef.current.style.height = "auto";
    noteRef.current.style.height = noteRef.current.scrollHeight + "px";
    console.log(noteRef.current.scrollHeight)
  }

  const handleChange = (e) => {
    const which = e.target.name

    if (which === 'todo-name') { 
      setName(e.target.value)
    } else {
      setNotes(e.target.value)
    }
  }

  const handleAction = (id, act) => {
    setTodos(prevState => {
      const newState = prevState.map(obj => {
        if (obj.id === id) {
          if(act === "done"){
            if(!obj.done){
              // handleMessage("Task completed!")
            }

            return {...obj, done: !obj.done};
          }else if(act === "edit"){
            handleActive('')
            // handleMessage(`Task has been updated`)

            return {...obj, name: name, notes: notes};
          }else{
            return {...obj, pin: !obj.pin};
          }
        }

        return obj;
      });

      return newState;
    })
  }

  useEffect(resizeName, [name])
  useEffect(resizeNotes, [notes])

  return (
    <>
      <div className='todo-form'>
        <span className='todo-radio' onClick={() => handleAction(item.id, 'done')}>
          { item.done && <Mark /> }
        </span>
        <div className='todo-content'>
          <textarea
            ref={nameRef}
            value={name}
            onChange={handleChange}
            className='todo-name'
            autoFocus='autofocus'
            maxLength='130'
            name='todo-name'
            rows={1}
          />
          <textarea
            ref={noteRef}
            value={notes}
            onChange={handleChange}
            className='todo-notes'
            placeholder='Add notes?'
            name='todo-note'
            rows={1}
          />
          <div className='todo-action'>
            <small>Created {moment(item.created_at).fromNow()}</small>
            { (name !== item.name || notes !== item.notes) && (
            <div className='gap-2'>
              <button className='btn-plain' onClick={() => handleActive('')}>Cancel</button>
              <button className='btn' onClick={() => handleAction(item.id, "edit")}>Save</button>
            </div>
            )}
          </div>
        </div>
      </div>
      <div className='todo-bg' onClick={() => handleActive('')}/>
    </>
  )
}

export default Edit;
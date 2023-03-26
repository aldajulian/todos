import moment from 'moment'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { todos_atoms } from '../utils/store'

const TodoCheckMart = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TodoItem = (props) => {
  const item = props.item
  const [todos, setTodos] = useAtom(todos_atoms)
  const [activeTodo, setActiveTodo] = useState('')
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')

  const handleAction = (id, act) => {
    props.setTodos(prevState => {
      const newState = prevState.map(obj => {
        if (obj.id === id) {
          if(act === "done"){
            if(!obj.done){
              props.handleMessage("Task completed!")
            }

            return {...obj, done: !obj.done};
          }else if(act === "edit"){
            setActiveTodo('')
            props.handleMessage(`Task has been updated`)

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

  const handleActive = (item) => {
    setActiveTodo(item.id)
    setName(item.name)
    setNotes(item.notes)
  }

  return (
    <li
      key={item.id}
      id={item.id}
    >
      { (activeTodo === item.id) ? (
        <>
          <div className='todo-form'>
            <span className='todo-radio' onClick={() => handleAction(item.id, 'done')}>
              { item.done && <TodoCheckMart /> }
            </span>
            <div className='todo-content'>
              <textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                rows='1'
                className='todo-name'
                autoFocus='autofocus'
                maxLength='120'
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows='3'
                className='todo-notes'
                placeholder='Add notes?'
              />
              <div className='todo-action'>
                <small>Created {moment(item.created_at).fromNow()}</small>
                { (name !== item.name || notes !== item.notes) && (
                <div className='gap-2'>
                  <button className='btn-plain' onClick={() => setActiveTodo('')}>Cancel</button>
                  <button className='btn' onClick={() => handleAction(item.id, "edit")}>Save</button>
                </div>
                )}
              </div>
            </div>
          </div>
          <div className='todo-bg' onClick={() => setActiveTodo('')}/>
        </>
      ) : (
        <div className='todo-front'>
          <span className='todo-radio' onClick={() => handleAction(item.id, 'done')}>
            { item.done && <TodoCheckMart /> }
          </span>
          <div className='todo-content' onClick={() => handleActive(item)}>
            {item.name}
            {item.notes && <p className='todo-prev-notes'>{item.notes}</p>}
          </div>
          <div className='todo-drag' onPointerDown={(e) => controls.start(e)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className='task-date'>{moment(item.created_at).fromNow()}</span>
        </div>
      )}
    </li>
  )
}

export default TodoItem;
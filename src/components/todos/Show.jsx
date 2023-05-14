import moment from 'moment'
import { useState } from 'react'
import Mark from './Mark'
import { useAtom } from 'jotai'
import { todos_atoms } from '../../utils/store'

const Show = ({ item, handleActive, handleMessage }) => {
  const [todos, setTodos] = useAtom(todos_atoms)

  const handleAction = (id, act) => {
    setTodos(prevState => {
      const newState = prevState.map(obj => {
        if (obj.id === id) {
          if(act === "done"){
            if(!obj.done){
              handleMessage("Task completed!")
            }

            return {...obj, done: !obj.done};
          }
        }

        return obj;
      });

      return newState;
    })
  }

  return (
    <div className='todo-front'>
      <span className='todo-radio' onClick={() => handleAction(item.id, 'done')}>
        { item.done && <Mark /> }
      </span>
      <div className={`todo-content ${item.done ? 'todo-done' : ''}`} onClick={() => handleActive(item)}>
        {item.name}
        {item.notes && <p className='todo-prev-notes'>{item.notes}</p>}
      </div>
      <div className='todo-drag'>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className='task-date'>{moment(item.created_at).fromNow()}</span>
    </div>
  )
}

export default Show;
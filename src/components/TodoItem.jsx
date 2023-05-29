import moment from 'moment'
import { useState, useMemo } from 'react'
import { useAtom } from 'jotai'
import { todos_atoms } from '../utils/store'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TodoCheckMark = () => (
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    opacity: (isDragging && props.id) ? 0.3 : undefined,
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleAction = (uid, act) => {
    setTodos(prevState => {
      const newState = prevState.map(obj => {
        if (obj.uid === uid) {
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
    setActiveTodo(item.uid)
    setName(item.name)
    setNotes(item.notes)
  }

  if(activeTodo === item.uid){
    return (
      <div className="todo-item">
        <div className='todo-form'>
          <span className='todo-radio' onClick={() => handleAction(item.uid, 'done')}>
            { item.done && <TodoCheckMark /> }
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
              rows='4'
              className='todo-notes'
              placeholder='Add notes?'
            />
            <div className='todo-action'>
              <small>Created {moment(item.created_at).fromNow()}</small>
              {/* { (name !== item.name || notes !== item.notes) && ( */}
              <div className='gap-2'>
                <button className='btn-plain' onClick={() => setActiveTodo('')}>Back</button>
                <button className='btn' onClick={() => handleAction(item.uid, "edit")}>Save</button>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
        <div className='todo-bg' onClick={() => setActiveTodo('')} style={{
          visibility: activeTodo === item.uid ? "visible" : "hidden",
        }}/>
      </div>
    )
  }else{
    return (
      <div className="todo-item">
        <div className={`todo-front ${props.extendClass} ${(isDragging && props.id) && 'is-dragging'}`} style={style}
          ref={setNodeRef}
          key={item.uid}>
          <span className='todo-radio' onClick={() => handleAction(item.uid, 'done')}>
            { item.done && <TodoCheckMark /> }
          </span>
          <div className='todo-content' onClick={() => handleActive(item)}>
            {item.name}
            {item.notes && <p className='todo-prev-notes'>{item.notes}</p>}
          </div>
          <div className='todo-drag' {...attributes} {...listeners}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* <span className='task-date'>{moment(item.created_at).fromNow()}</span> */}
        </div>
      </div>
    )
  }
}

export default TodoItem;
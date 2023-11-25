import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import Mark from './Mark'
import { motion, AnimatePresence } from 'framer-motion'

const Edit = ({
  item,
  activeTodo,
  handleActive,
  handleMessage,
  handleAction,
  handleDelete
}) => {
  const [name, setName] = useState(item.name)
  const [notes, setNotes] = useState(item.notes)
  const [deletePromt, setDeletePromt] = useState(false)
  const nameRef = useRef(null);
  const noteRef = useRef(null);

  const handleCheck = (item) => {
    handleMessage(`${item.name} marked as done`)
  }

  const resizeName = () => {
    nameRef.current.style.height = "auto";
    nameRef.current.style.height = nameRef.current.scrollHeight + "px";
  }

  const resizeNotes = () => {
    noteRef.current.style.height = "auto";
    noteRef.current.style.height = noteRef.current.scrollHeight + "px";
  }

  const handleChange = (e) => {
    const which = e.target.name

    which === 'todo-name' ? setName(e.target.value) : setNotes(e.target.value)
  }

  useEffect(resizeName, [name])
  useEffect(resizeNotes, [notes])

  return (
    <div className={deletePromt ? 'todo-will-delete' : 'todo-edit'}>
      <div className='todo-form'>
        <span className='todo-radio' onClick={() => handleAction(item.uid, 'done')}>
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
            rows={2}
          />
          <div className='todo-action'>
            <small>Created {moment(item.created_at).fromNow()}</small>
            <div className='gap-2'>
              <button className='btn-plain' onClick={() => handleActive('')}>Back</button>
              { (name !== item.name || notes !== item.notes) ? (
                <button className='btn' onClick={() => handleAction(item.uid, "edit", name, notes)}>Save</button>
              ) : (
                <button className='btn btn-warning' onClick={() => setDeletePromt(!deletePromt)}>Delete</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        { deletePromt && (
          <motion.div className='todo-confirm' initial={{ opacity: 0, y: "-30%" }} transition={{ duration: 0.1 }} animate={{ opacity: 1, y: "-50%" }}>
            <h3>Are you sure?</h3>
            <p>this task won't be back, are you sure want to delete this task?</p>
            <div className='todo-action'>
              <div className='gap-2'>
                <button className='btn-plain' onClick={() => setDeletePromt(false)}>Back</button>
                <button className='btn btn-warning' onClick={() => handleDelete()}>Sure!</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className='todo-bg' onClick={() => handleActive('')} style={{
        visibility: activeTodo === item.uid ? "visible" : "hidden",
      }}/>
    </div>
  )
}

export default Edit;
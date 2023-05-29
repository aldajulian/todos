import moment from 'moment'
import { useState } from 'react'
import Mark from './Mark'
import { useAtom } from 'jotai'
import { todos_atoms } from '../../utils/store'
import classNames from "classnames";

const Show = ({
  id,
  item,
  handleActive,
  extendClass,
  handleAction,
  isDragging,
  style,
  setNodeRef,
  attributes,
  listeners
}) => {
  const additional = classNames({
    dragging: extendClass,
    'todo-front': true,
    'is-dragging': (isDragging && id),
    'todo-done': item.done
  })

  return (
    <div
      className={additional}
      style={style}
      ref={setNodeRef}
      key={item.uid}
    >
      <span className='todo-radio' onClick={() => handleAction(item.uid, 'done')}>
        { item.done && <Mark /> }
      </span>
      <div className='todo-content' onClick={() => handleActive(item)}>
        {item.name}
        {item.notes && <p className='todo-prev-notes'>{item.notes}</p>}
      </div>
      <div className='todo-drag' {...attributes} {...listeners}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* <span className='task-date'>{moment(item.created_at).fromNow()}</span> */}
    </div>
  )
}

export default Show;
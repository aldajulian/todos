import { useState } from 'react'
import Edit from './Edit'
import Show from './Show'
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const Item = ({ item, handleMessage }) => {
  const [activeTodo, setActiveTodo] = useState('')
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: item.id});

  const handleActive = (item) => {
    setActiveTodo(item.id)
  }

  return (
    <li
      key={item.id}
      id={item.id}
      ref={setNodeRef}
    >
      { (activeTodo === item.id) ? 
        <Edit item={item} handleActive={handleActive} handleMessage={handleMessage} />
        :
        <Show item={item} handleActive={handleActive} handleMessage={handleMessage} />
      }
    </li>
  )
}

export default Item;
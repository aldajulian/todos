import { useState } from 'react'
import Edit from './Edit'
import Show from './Show'

const Item = ({ item, handleMessage }) => {
  const [activeTodo, setActiveTodo] = useState('')

  const handleActive = (item) => {
    setActiveTodo(item.id)
  }

  return (
    <li
      key={item.id}
      id={item.id}
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
import { useState } from 'react'
import EditTodo from './Edit'
import ShowTodo from './Show'

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
        <EditTodo item={item} handleActive={handleActive} handleMessage={handleMessage} />
        :
        <ShowTodo item={item} handleActive={handleActive} handleMessage={handleMessage} />
      }
    </li>
  )
}

export default Item;
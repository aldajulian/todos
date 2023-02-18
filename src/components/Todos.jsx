import { useEffect, useState, useRef } from 'react'
import { useAtom } from 'jotai'
import { todos_atoms } from '../utils/store'
import Header from './Header'
import Item from './todos/Item'
import { isEmpty } from 'lodash'

let contentIn, contentEnd;

export default function Todos() {
  const [todos, setTodos] = useAtom(todos_atoms)
  const [dynamicClass, setDynamicClass] = useState([])
  const [dynamicContent, setDynamicContent] = useState([])
  const audioElement = useRef();

  const handleMessage = (content) => {
    // if(!dynamicClass.includes('in')){
    setDynamicClass(['in'])

    clearTimeout(contentIn, contentEnd)

    setTimeout(() => {
      if(audioElement.current){
        let audio = audioElement.current
        let isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > audio.HAVE_CURRENT_DATA;

        // audio.pause()
        audio.currentTime = 0;
        audio.volume = 0.2;
        if(!isPlaying) {
          audio.play()
        }
      }
    }, 50)

    setTimeout(() => {
      setDynamicClass(['in', 'content-in'])
      setDynamicContent(content)
    }, 250)

    contentIn = setTimeout(() => {
      setDynamicClass(['in'])
    }, 2400)

    contentEnd = setTimeout(() => {
      setDynamicClass([])
    }, 2600)
  }

  let open_todos = todos.filter(todo => !todo.done)
  let completed_todos = todos.filter(todo => todo.done)

  return (
    <>
      <Header 
        dynamicClass={dynamicClass}
        dynamicContent={dynamicContent}
        handleMessage={handleMessage}
      />
      <div>
        <ul className="todo-list">
          {!open_todos.length &&
            <div className='placeholder'>Your task will be appear here</div>
          }
          {open_todos.map((item) => {
            return (
              <Item
                key={item.id}
                item={item}
                handleMessage={handleMessage}
              />
            )
          })}
        </ul>
      </div>
      {!isEmpty(completed_todos) && (
        <div className='todos-completed'>
          <p className='text-scnd'>Completed Todos</p>
          <ul className="todo-list">
            {completed_todos.map((item) => {
              return (
                <Item
                  key={item.id}
                  item={item}
                  handleMessage={handleMessage}
                />
              )
            })}
          </ul>
        </div>
      )}
      <audio controls src={`default.mp3`} ref={audioElement} className="d-none" allow="autoplay"/>
    </>
  )
}

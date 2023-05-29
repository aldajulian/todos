import { useState } from "react"
import data from '../data/changelogs.json';
import Header from "./components/Header";

export default function ChangeLog() {
  const [ active, setActive ] = useState('')

  const handleListOpen = (contentId) => {
    active === contentId ? setActive('') : setActive(contentId)
  }

  return (
    <div className="container">
      <Header/>
      <main className="mt-3">
        <h3>Change log {active}</h3>
        <ul className={`list-indent ${active ? 'list-open' : ''}`}>
          {data.writings.map(writings => (
            <li key={writings.year}>
              <span className='list-year'>{writings.year}</span>
              <div className='list-indent-item'>
                {writings.collections.map(content => {
                  let activeContent = active === content.id ? 'list-open' : ''

                  return (
                    <div
                      className={`list-item ${activeContent}`}
                      onClick={() => handleListOpen(content.id)}
                      key={content.id}
                    >
                      <span className='list-title'>{content.title}</span>
                      <span className='list-content'>{content.content}</span>
                    </div>
                )})}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
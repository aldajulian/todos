import React from "react"
import data from '../data/changelogs.json';

export default function ChangeLog() {

  return (
    <div className="container">
      <h3>Change log</h3>
      <main>
        <ul className='list-indent'>
          {data.writings.map(writings => (
            <li key={writings.year}>
              <span className='list-year'>{writings.year}</span>
              <div className='list-indent-item'>
                {writings.collections.map(content => {
                  return (
                    <div className="list-content" key={content.id}>
                      <span className='list-title'>{content.title}</span>
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
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import Avatar from "boring-avatars";
import { todos_atoms, setting_atoms } from '../utils/store'

const Setting = ({ dropdownOpen, wrapperRef }) => {
  const [setting, setSetting] = useAtom(setting_atoms)
  const [avatar, setAvatar] = useState('')

  const handleSetting = (settingType, val) => {
    let changes = {}
    changes[settingType] = val

    setSetting({...setting, ...changes})
  }

  return(
    <>
      <div className={`account-drop ${dropdownOpen ? 'is-open' : 'is-close'}`} ref={wrapperRef}>
        <h2>Setting</h2>
        <h3>General</h3>
        <div className="setting-group mb-2">
          <div className="acc-drop-item mb-2">
            <div className="gap-2 w-100">
              <Avatar
                size={60}
                name={setting.name}
                variant="marble"
                className="flex-still"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <div className="d-flex flex-column w-100">
                <small className='text-scnd mb-1'>Your name reflect the Avatar</small>
                {/* <input
                  type="text"
                  className="input-field me-auto"
                  value={setting.name}
                  placeholder="Name"
                  onChange={(e) => handleSetting('name', e.target.value)}
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="setting-group mb-2">
          <h3>Configuration</h3>
          <div className="acc-drop-item mb-2">
            <p className='mb-1'>
              Focus Mode
              <small>Will show only task detail when you open it</small>
            </p>
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => handleSetting('focus_mode', !setting.focus_mode)}
                checked={setting.focus_mode}/>
              <span className="slider"/>
            </label>
          </div>
          <div className="acc-drop-item mb-2">
            <p className='mb-1'>
              Search
              <small>Find the task if there to many of them</small>
            </p>
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => handleSetting('can_search', !setting.can_search)}
                checked={setting.can_search}/>
              <span className="slider"/>
            </label>
          </div>
          <div className="acc-drop-item mb-2">
            <p className='mb-1'>
              Collections
              <small>Manage task by Collection</small>
            </p>
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => handleSetting('use_collection', !setting.use_collection)}
                checked={setting.use_collection}/>
              <span className="slider"/>
            </label>
          </div>
          <div className="acc-drop-item mb-2">
            <p className='mb-1'>
              Progress
              <small>You can add progress to each Task to track them</small>
            </p>
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => handleSetting('use_dynamic_island', !setting.use_dynamic_island)}
                checked={setting.use_dynamic_island}/>
              <span className="slider"/>
            </label>
          </div>
          <div className="acc-drop-item mb-2">
            <p className='mb-1'>
              Notification sound
              <small>Different sound reflect the Theme</small>
            </p>
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => handleSetting('notification_sound', !setting.notification_sound)}
                checked={setting.notification_sound}/>
              <span className="slider"/>
            </label>
          </div>
        </div>
        <div className="setting-group mb-2">
          <h3>Other</h3>
          <div className="acc-drop-item mb-2">
            <p className='mb-1'>Feedback?</p>
          </div>
          <div className="acc-drop-item mb-2">
            <p className='mb-1'>About the App</p>
          </div>
        </div>
      </div>
      {dropdownOpen && <div className='modal-bg' onClick={() => setActiveTodo('')}/>}
    </>
  )
}

export default Setting
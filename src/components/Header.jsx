import React, { useState, useEffect, useRef } from "react";
import Avatar from "boring-avatars";
import { useAtom } from 'jotai'
import { setting_atoms } from '../utils/store'
import Bar from './Bar'
import Setting from './Setting'
import moment from "moment";

const Header = ({
  dynamicClass,
  dynamicContent,
  useBar
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [setting] = useAtom(setting_atoms)
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return(
    <div className="header">
      <div className="header-content">
        <div className="header-info">
          <h3>Home</h3>
          <p>{moment().format("ddd – DD MMM, YYYY") }</p>
        </div>
        <div className="header-action">
          {/* <div className='notification'>
            <Icon name='notification' stroke='#666' strokeWidth={1.5} size={22} />
            <span>1</span>
          </div> */}
          <div className="account-avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <Avatar
              size={40}
              name={setting.name}
              variant="marble"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />

            {dynamicContent && (
              <div className={`dynamic-notif ${dynamicClass.join(' ')}`}>
                <div className="dynamic-content">{dynamicContent}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {useBar && <Bar/>}
      {/* <Setting dropdownOpen={dropdownOpen} wrapperRef={wrapperRef}/> */}
    </div>
  )
}

export default Header;
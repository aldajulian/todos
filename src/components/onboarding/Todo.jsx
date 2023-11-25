import { useState } from "react"
import Mark from "../todos/Mark"
import { motion } from "framer-motion"

const OnboardingTodo = ({
  name,
  checked,
  notes,
  opened,
  delay = '0.2'
}) => {
  const [check, setCheck] = useState(checked)
  const animation = {
    initial: {opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: delay,duration: 0.5 }
  }

  if (!opened) {
    return (
      <motion.div className="todo-item" {...animation}>
        <div className="todo-front">
          <span className='todo-radio' onClick={() => setCheck(!check)}>
            {check && <Mark />}
          </span>
          <div className='todo-box flex-column'>
            <div className={`todo-content ${check && 'text-third'}`}>
            {name}
            { notes &&
              <p className="text-third" style={{fontSize: '12px', whiteSpace: 'nowrap'}}>{notes}</p>
            }
            </div>
          </div>
        </div>
      </motion.div>
    )
  }
  if (opened) {
    return (
      <motion.div className="todo-item" {...animation} style={{width: '100%', maxWidth: '460px', flex: '1 0 auto'}}>
        <div className='todo-form'>
          <span className='todo-radio'>
            <Mark />
          </span>
          <div className='todo-content'>
            <textarea
              value='Create a To-Do list that almost everyone creates'
              className='todo-name'
              autoFocus='autofocus'
              maxLength='130'
              name='todo-name'
              readOnly
              rows={1}
            />
            <textarea
              value={"- Note for a task is inevitable \n- Light and Dark mode is a must!\n- Focus mode, cause we want to finish it ASAP.\n- "}
              className='todo-notes'
              placeholder='Add notes?'
              name='todo-note'
              style={{fontSize: '14px'}}
              readOnly
              rows={4}
            />
            <div className='todo-action'>
              <small>Created 2022</small>
              <div className='gap-2'>
                <button className='btn'>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }
}

export default OnboardingTodo
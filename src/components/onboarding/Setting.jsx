import { useState } from "react"
import * as Switch from '@radix-ui/react-switch';
import { motion } from "framer-motion";

const OnboardingSetting = ({
  name,
  description,
  delay = '0.2',
  settingAction
}) => {
  const animation = {
    initial: {opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: delay, duration: 0.5 }
  }

  return (
    <motion.div className="todo-item g-2" style={{ margin: '0.5em'}} {...animation}>
      <div className="todo-front flex-row align-items-center" style={{padding: '.65em 1em'}}>
        <div style={{marginRight: '1em', whiteSpace: 'nowrap'}}>
          <p style={{fontSize: '15px'}}>{name}</p>
          <p className="text-third" style={{fontSize: '12px', whiteSpace: 'nowrap'}}>{description}</p>
        </div>
        <Switch.Root className="SwitchRoot" id="airplane-mode">
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
      </div>
      </motion.div>
  )
}

export default OnboardingSetting
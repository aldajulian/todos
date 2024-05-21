import moment from "moment";
import { useState } from "react";
import Mark from "./Mark";
import { useAtom } from "jotai";
import { todos_atoms } from "../../utils/store";
import classNames from "classnames";
import { motion } from "framer-motion";

const Show = ({
  id,
  item,
  handleActive,
  extendClass,
  handleAction,
  isDragging,
  style,
  setNodeRef,
  attributes,
  listeners,
  activeTodo,
}) => {
  const additional = classNames({
    dragging: extendClass,
    "todo-front": true,
    "is-dragging": isDragging && id,
    "todo-done": item.done,
    "todo-active": activeTodo && activeTodo.uid === item.uid,
  });

  return (
    <motion.div
      layoutId={item.uid}
      className={additional}
      style={style}
      // ref={setNodeRef}
      key={item.uid}
    >
      <motion.div layout="position" className="todo-radio-wrapper">
        <motion.span
          layout="position"
          className="todo-radio"
          onClick={() => handleAction(item.uid, "done")}
        >
          {item.done && <Mark />}
        </motion.span>
      </motion.div>
      <motion.div layout="position" className="todo-box">
        <motion.div
          layout="position"
          className="todo-content"
          onClick={() => handleActive(item, setNodeRef)}
        >
          {item.name}
          {item.notes && (
            <motion.p className="todo-prev-notes">{item.notes}</motion.p>
          )}
        </motion.div>
        <motion.div
          layout="position"
          className="todo-drag"
          {...attributes}
          {...listeners}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 15L12 20L17 15M7 9L12 4L17 9"
              stroke="#aaa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
      {/* <span className='task-date'>{moment(item.created_at).fromNow()}</span> */}
    </motion.div>
  );
};

export default Show;

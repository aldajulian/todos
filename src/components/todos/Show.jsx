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
  });

  return (
    <motion.div
      layoutId={item.uid}
      className={additional}
      style={style}
      // ref={setNodeRef}
      key={item.uid}
    >
      <motion.span
        layout="position"
        className="todo-radio"
        onClick={() => handleAction(item.uid, "done")}
      >
        {item.done && <Mark />}
      </motion.span>
      <motion.div layout="position" className="todo-box">
        <motion.div
          layout="position"
          className="todo-content"
          onClick={() => handleActive(item, setNodeRef)}
        >
          {item.name}
          {item.notes && <p className="todo-prev-notes">{item.notes}</p>}
        </motion.div>
        <div className="todo-drag" {...attributes} {...listeners}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 15L12 20L17 15M7 9L12 4L17 9"
              stroke="#aaa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
      {/* <span className='task-date'>{moment(item.created_at).fromNow()}</span> */}
    </motion.div>
  );
};

export default Show;

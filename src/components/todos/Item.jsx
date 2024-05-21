import { useState, useRef } from "react";
import Edit from "./Edit";
import Show from "./Show";
import { useAtom } from "jotai";
import { AnimatePresence, motion, spring } from "framer-motion";
import { todos_atoms } from "../../utils/store";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { toast } from "sonner";
import { Truncate } from "../../utils/functions";

const Item = ({
  id,
  item,
  handleMessage,
  extendClass,
  activeTodo,
  setActiveTodo,
}) => {
  const [todos, setTodos] = useAtom(todos_atoms);
  const itemRef = useRef(null);
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    opacity: isDragging && id ? 0.8 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const executeScroll = () => {
    if (itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  const handleActive = (item) => {
    setActiveTodo(item);
  };

  const handleAction = (uid, act, name, notes) => {
    setTodos((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.uid === uid) {
          if (act === "done") {
            if (!obj.done) {
              handleMessage("Task completed!");
              toast(`${Truncate(obj.name, 20)} completed!`, {
                action: {
                  label: "Undo",
                  onClick: () => handleAction(obj.uid, "done"),
                },
              });
            }

            return { ...obj, done: !obj.done };
          } else if (act === "edit") {
            handleActive("");
            handleMessage(`Task has been updated`);

            return { ...obj, name: name, notes: notes };
          } else {
            return { ...obj, pin: !obj.pin };
          }
        }

        return obj;
      });

      return newState;
    });
  };

  const handleDelete = () => {
    let newTodos = [...todos];
    let index = newTodos.indexOf(item);

    if (index !== -1) {
      newTodos.splice(index, 1);
      setTodos(newTodos);
      handleActive("");
      handleMessage(`Task has been deleted!`);
    }
  };
  // if (activeTodo !== item.uid) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          key={item.id}
          id={item.id}
          ref={setNodeRef}
          // transition={spring}
          // className={`todo-item ${ && "todo-open"}`}
          className="todo-item"
        >
          <Show
            id={id}
            item={item}
            activeTodo={activeTodo}
            handleActive={handleActive}
            handleMessage={handleMessage}
            handleAction={handleAction}
            attributes={attributes}
            listeners={listeners}
            setNodeRef={setNodeRef}
            extendClass={extendClass}
            isDragging={isDragging}
            style={style}
          />
          {/* )} */}

          {activeTodo?.uid == item.uid ? (
            <Edit
              item={item}
              activeTodo={activeTodo}
              handleActive={handleActive}
              handleMessage={handleMessage}
              handleAction={handleAction}
              handleDelete={handleDelete}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </>
  );
  // }
};

export default Item;

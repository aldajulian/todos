import { useState, useRef, useMemo } from "react";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { todos_atoms, setting_atoms } from "../utils/store";
import Header from "./Header";
import Item from "./todos/Item";
import { isEmpty } from "lodash";
import { Toaster, toast } from "sonner";
import Edit from "./todos/Edit";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

let contentIn, contentOut;

export default function Todos() {
  const [todos, setTodos] = useAtom(todos_atoms);
  const [activeTodo, setActiveTodo] = useState(null);
  const [settings, setSettings] = useAtom(setting_atoms);
  const [dynamicClass, setDynamicClass] = useState([]);
  const [dynamicContent, setDynamicContent] = useState([]);
  const [active, setActive] = useState(null);
  const audioElement = useRef();

  // let open_todos = todos.filter((todo) => !todo.done);
  // let completed_todos = todos.filter((todo) => todo.done);

  const activeItem = useMemo(
    () => todos.find((item) => item.id === active?.id),
    [active, todos]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleMessage = (content) => {
    setDynamicClass(["in"]);

    clearTimeout(contentIn);
    clearTimeout(contentOut);

    setTimeout(() => {
      if (audioElement.current) {
        let audio = audioElement.current;
        let isPlaying =
          audio.currentTime > 0 &&
          !audio.paused &&
          !audio.ended &&
          audio.readyState > audio.HAVE_CURRENT_DATA;

        // audio.pause()
        audio.currentTime = 0;
        audio.volume = 0.2;
        if (!isPlaying) {
          audio.play();
        }
      }
    }, 100);

    setTimeout(() => {
      setDynamicClass(["in", "content-in"]);
      setDynamicContent(content);
    }, 250);

    contentIn = setTimeout(() => {
      setDynamicClass(["in"]);
    }, 2400);

    contentOut = setTimeout(() => {
      setDynamicClass([]);
    }, 2600);
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
      setActive(null);
    }
  }

  console.log("huahahaha", activeTodo);

  return (
    <div className="todos">
      <Header
        dynamicClass={dynamicClass}
        dynamicContent={dynamicContent}
        handleMessage={handleMessage}
        useBar={true}
      />
      <div>
        <div className="todo-list">
          {!todos.length && (
            <div className="placeholder">Your task will be appear here</div>
          )}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragStart={({ active }) => {
              setActive(active.id);
            }}
          >
            <SortableContext
              items={todos}
              strategy={verticalListSortingStrategy}
            >
              {/* <AnimatePresence> */}
              {todos.map((item) => (
                <Item
                  key={item.uid}
                  item={item}
                  id={item}
                  activeTodo={activeTodo}
                  setActiveTodo={setActiveTodo}
                  handleMessage={handleMessage}
                />
              ))}
              {/* </AnimatePresence> */}
            </SortableContext>
            <DragOverlay>
              {activeItem ? (
                <Item item={active} id={active} extendClass="dragging" />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
      {/* {!isEmpty(completed_todos) && (
        <div className="todos-completed">
          <p className="text-scnd">Completed Todos</p>
          <div className="todo-list">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
              onDragStart={({ active }) => {
                setActive(active.id);
              }}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={completed_todos}
                strategy={verticalListSortingStrategy}
              >
                {completed_todos.map((item) => (
                  <Item
                    key={item.uid}
                    item={item}
                    id={item}
                    handleMessage={handleMessage}
                  />
                ))}
              </SortableContext>
              <DragOverlay modifiers={[restrictToWindowEdges]}>
                {activeItem ? (
                  <Item item={active} id={active} extendClass="dragging" />
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      )} */}

      <AnimatePresence>
        {activeTodo ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overlay"
              onClick={() => setActiveTodo(null)}
            />
          </>
        ) : null}
      </AnimatePresence>
      <Toaster position="bottom-center" />
      <audio
        controls
        src={`default.mp3`}
        ref={audioElement}
        className="d-none"
        allow="autoplay"
      />
    </div>
  );
}

import moment from "moment";
import { useState, useEffect, useRef } from "react";
import Mark from "./Mark";
import { motion, AnimatePresence } from "framer-motion";

const Edit = ({
  item,
  activeTodo,
  handleActive,
  handleMessage,
  handleAction,
  handleDelete,
}) => {
  const [name, setName] = useState(item.name);
  const [notes, setNotes] = useState(item.notes);
  const [deletePromt, setDeletePromt] = useState(false);
  const nameRef = useRef(null);
  const noteRef = useRef(null);

  const handleCheck = (item) => {
    handleMessage(`${item.name} marked as done`);
  };

  const resizeName = () => {
    nameRef.current.style.height = "auto";
    nameRef.current.style.height = nameRef.current.scrollHeight + "px";
  };

  const resizeNotes = () => {
    noteRef.current.style.height = "auto";
    noteRef.current.style.height = noteRef.current.scrollHeight + "px";
  };

  const handleChange = (e) => {
    const which = e.target.name;

    which === "todo-name" ? setName(e.target.value) : setNotes(e.target.value);
  };

  useEffect(resizeName, [name]);
  useEffect(resizeNotes, [notes]);

  return (
    <AnimatePresence>
      <motion.div
        layoutId={activeTodo?.uid}
        className={`todo-item ${
          deletePromt ? "todo-will-delete" : "todo-edit"
        }`}
      >
        <motion.div className="todo-form" layoutId={activeTodo?.uid}>
          <motion.div layout className="todo-radio-wrapper">
            <motion.span
              layout
              className="todo-radio"
              onClick={() => handleAction(item.uid, "done")}
            >
              {item.done && <Mark />}
            </motion.span>
          </motion.div>
          <div className="todo-content">
            <motion.textarea
              layout
              ref={nameRef}
              value={name}
              onChange={handleChange}
              className="todo-name"
              maxLength="130"
              name="todo-name"
              rows={1}
            />
            {activeTodo ? (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
              >
                <motion.textarea
                  layout
                  ref={noteRef}
                  value={notes}
                  onChange={handleChange}
                  className="todo-notes"
                  placeholder="Add notes?"
                  name="todo-note"
                  rows={2}
                />
                <motion.div layout className="todo-action">
                  <small>Created {moment(item.created_at).fromNow()}</small>
                  <div className="gap-2">
                    <button
                      className="btn-plain"
                      onClick={() => handleActive("")}
                    >
                      Back
                    </button>
                    {name !== item.name || notes !== item.notes ? (
                      <button
                        className="btn"
                        onClick={() =>
                          handleAction(item.uid, "edit", name, notes)
                        }
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => setDeletePromt(!deletePromt)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </div>
        </motion.div>
        {deletePromt && (
          <motion.div
            className="todo-confirm"
            initial={{ opacity: 0, y: "-30%" }}
            transition={{ duration: 0.1 }}
            animate={{ opacity: 1, y: "-50%" }}
          >
            <h3>Are you sure?</h3>
            <p>
              this task won't be back, are you sure want to delete this task?
            </p>
            <div className="todo-action">
              <div className="gap-2">
                <button
                  className="btn-plain"
                  onClick={() => setDeletePromt(false)}
                >
                  Back
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleDelete()}
                >
                  Sure!
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Edit;

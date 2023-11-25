import { atomWithStorage } from 'jotai/utils'

export const todos_atoms = atomWithStorage('todos', [])
export const completed_atoms = atomWithStorage('completed', [])
export const deleted_atoms = atomWithStorage('deleted', [])
export const setting_atoms = atomWithStorage('setting', {
  theme: "default",
  color_scheme: "light",
  name: "",
  use_collection: false,
  separate_done: false,
  can_search: false,
  can_pin: false,
  use_dynamic_island: false,
  notification_sound: false
})
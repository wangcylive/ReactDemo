import {create} from 'zustand'

export interface UserInfo {
  name: string
  email: string
}

const useStore = create((set, get) => ({
  count: 0,
  users: [],
  userCount: () => {
    return `user.length = ${get().users.length}, count = ${get().count}`
  },
  addCount: () => {
    set(state => ({
      count: state.count + 1,
    }))
  },
  addUser: (name: string) => {
    set(state => {
      return {
        users: [
          ...state.users,
          {
            name,
            email: name + '@gmail.com',
          },
        ],
      }
    })
  },
  deleteUser: (index: number) => {
    set(state => {
      const nextStateUsers = [...state.users]
      nextStateUsers.splice(index, 1)
      return {
        users: nextStateUsers,
      }
    })
  },
}))

export default useStore

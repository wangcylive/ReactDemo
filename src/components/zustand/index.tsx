import type {FC} from 'react'
import useStore from './useStore'

const ZustandDemo: FC = () => {
  const store = useStore()
  return (
    <div>
      <div>
        count: {store.count}
        <button onClick={() => store.addCount()}>Add</button>
      </div>
      <hr />
      <div>
        <ul>
          <button onClick={() => store.addUser(Math.random() + '')}>Add</button>
          {store.users.map((user, index) => (
            <li key={index}>
              name: {user.name} email: {user.email} <button onClick={() => store.deleteUser(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div>{store.userCount()}</div>
    </div>
  )
}

export default ZustandDemo

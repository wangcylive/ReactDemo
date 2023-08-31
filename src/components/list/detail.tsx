import React from 'react'
import {useNavigate, useParams, useLoaderData, useAsyncValue} from 'react-router-dom'

const ListDetail: React.FC<any> = props => {
  const asyncValue = useAsyncValue()
  const loaderData = props.loaderData
  const params = useParams<{id: string}>()
  const navigator = useNavigate()

  console.log('ListDetail data', loaderData, asyncValue)
  return (
    <div>
      <h4>List Detail</h4>
      <div>
        <button onClick={() => navigator(-1)}>Back</button>
      </div>
      <p>
        route id: <code>{params.id}</code>
      </p>
      <p>
        loader data:
        <code>
          {loaderData.data.name}@{loaderData.data.version}
        </code>
      </p>
    </div>
  )
}

export default ListDetail

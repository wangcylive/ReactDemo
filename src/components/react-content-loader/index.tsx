import React from 'react'
import ContentLoader, {Facebook, Code, BulletList, Instagram} from 'react-content-loader'

const MyLoader = () => {
  return (
    <div>
      <p>Facebook</p>
      <Facebook />
      <hr />
      <p>Instagram</p>
      <Instagram />
      <hr />
      <p>BulletList</p>
      <BulletList />
      <p>Code</p>
      <Code />
      <hr />
      <ContentLoader></ContentLoader>
      <hr />
      <ContentLoader height={300} width={300} viewBox="0 0 300 300" backgroundColor="#f5f5f5" foregroundColor="#dbdbdb">
        <circle cx="150" cy="150" r="100" />
        <rect x="160" y="15" rx="3" ry="3" width="50" height="15" />
        <rect x="215" y="15" rx="3" ry="3" width="50" height="15" />
      </ContentLoader>
      <hr />
    </div>
  )
}

export default MyLoader

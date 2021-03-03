import React from 'react'
import ContentLoader from 'react-content-loader'
import * as s from './ProductLoader.module.sass'

const ProductLoader = props => (
   <ContentLoader
      className={ s.loader }
      speed={ 1 }
      width={ 280 }
      height={ 352 }
      viewBox="0 0 280 352"
      backgroundColor="#f3f3f3"
      foregroundColor="#e8e8e8"
      { ...props }
   >
      <rect x="0" y="0" rx="25" ry="25" width="280" height="270" />
      <rect x="140" y="283" rx="25" ry="25" width="121" height="44" />
      <rect x="0" y="285" rx="0" ry="0" width="98" height="20" />
      <rect x="0" y="312" rx="0" ry="0" width="98" height="15" />
   </ContentLoader>
)

export default ProductLoader
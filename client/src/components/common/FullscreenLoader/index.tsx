import React from 'react'
import Loader, { LoaderProps } from 'react-loader-spinner'

import s from './FullscreenLoader.module.sass'


const FullscreenLoader: React.FC<Partial<LoaderProps>> = ({ type = 'Rings', ...rest }) => (
   <div className={ s.wrapper }>
      <Loader
         type={ type }
         color="#000"
         height={ 100 }
         width={ 100 }
         // @ts-ignore
         className="fill-spinner"
         { ...rest }
      />
   </div>
)

export default FullscreenLoader
import Loader from 'react-loader-spinner'
import * as s from './FullscreenLoader.module.sass'

const FullscreenLoader = () => (
   <div className={ s.wrapper }>
      <Loader
         type="Rings"
         color="#000"
         height={ 100 }
         width={ 100 }
      />
   </div>
)

export default FullscreenLoader
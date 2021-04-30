import { Field } from 'react-final-form'
import s from './FormControl.module.sass'
import cn from 'classnames'

const FormControl = ({ label, name, type, className, component: Component, ...rest }) => {
   return (
      <Field name={ name }>
         { ({ input, meta }) => (
            <div className={ s.fieldWrapper }>
               <label className={ s.label }>{ label ? `${ label }:` : null }</label>

               {
                  Component
                  ? <Component { ...input } { ...rest } />
                  : <input className={ cn(s.input, className) } { ...input } type={ type || 'text' } { ...rest }/>
               }

               { meta.error && meta.touched && <p className={ s.error }>{ meta.error }</p> }
            </div>
         ) }
      </Field>
   )
}

export default FormControl


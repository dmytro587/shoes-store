import { Field } from 'react-final-form'
import cn from 'classnames'
import s from './FormControl.module.sass'

const FormControl = ({ label, name, type, className }) => {
   return (
      <Field name={ name }>
         { ({ input, meta }) => (
            <div className={ s.fieldWrapper }>
               <label className={ s.label }>{ label }:</label>
               <input className={ cn(s.input, className) } { ...input } type={ type || 'text' }/>
               { meta.error && meta.touched && <p className={ s.error }>{ meta.error }</p> }
            </div>
         ) }
      </Field>
   )
}

export default FormControl


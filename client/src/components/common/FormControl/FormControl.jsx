import { Field } from 'react-final-form'
import s from './FormControl.module.sass'

const FormControl = ({ label, name, type }) => {
   return (
      <Field name={ name }>
         { ({ input, meta }) => (
            <div className={ s.fieldWrapper }>
               <label className={ s.label }>{ label }:</label>
               <input className={ s.input } { ...input } type={ type || 'text' }/>
               { meta.error && meta.touched && <p className={ s.error }>{ meta.error }</p> }
            </div>
         ) }
      </Field>
   )
}

export default FormControl


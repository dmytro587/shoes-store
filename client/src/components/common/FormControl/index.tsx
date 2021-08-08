import React from 'react'
import cn from 'classnames'
import { Field } from 'react-final-form'

import s from './FormControl.module.sass'

interface Props {
   label: string
   name: string
   type?: string
   className?: string
   component?: React.ComponentType<any>
   [x: string]: unknown
}

const FormControl: React.FC<Props> = ({
   label,
   name,
   type,
   className,
   component: Component,
   ...rest
}) => {
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


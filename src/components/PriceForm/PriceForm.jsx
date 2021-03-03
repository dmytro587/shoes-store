import { useState } from 'react'

import * as s from './PriceForm.module.sass'


const priceConfig = [
   {
      id: 1,
      name: 'price-range',
      text: 'До 500 грн',
      range: {
         value: [500],
         type: 'toN'
      }
   },
   {
      id: 2,
      name: 'price-range',
      text: 'От 500 до 1000 грн',
      range: {
         value: [500, 1000],
         type: 'fromNToN'
      }
   },
   {
      id: 3,
      name: 'price-range',
      text: 'От 1000 грн',
      range: {
         value: [1000],
         type: 'fromN'
      }
   },
   {
      id: 4,
      name: 'price-range',
      text: 'Все',
      range: null
   }
]

const PriceForm = ({ onSelectRangePrice }) => {
   const [fromNValue, setFromNValue] = useState('')
   const [toNValue, seToNValue] = useState('')

   const numRegexp = e => e.target.value.match(/[0-9]/g)?.join('')

   const onFromNRangeChange = e => {
      setFromNValue(numRegexp(e) || '')
   }

   const onToNRangeChange = e => {
      seToNValue(numRegexp(e) || '')
   }

   const onSelectPrice = (type, range) => {
      onSelectRangePrice(type, range)
   }

   const onCustomSelectPrice = () => {
      if (fromNValue && toNValue) {
         onSelectRangePrice('price-range', {
            value: [fromNValue, toNValue],
            type: 'fromNToN'
         })
      }
   }

   const checkboxes = priceConfig.map(item => (
      <label key={ item.id }>
         <input
            name={ item.name }
            type="radio"
            value={ item.text }
            onChange={ () => onSelectPrice(item.name, item.range) }
         />
         { item.text }
      </label>
   ))

   return (
      <form className={ s.form }>
         <div className={ s.checkboxes }>
            { checkboxes }
         </div>

         <div className={ s.priceRange }>
            <input
               type="text"
               name="fromN"
               placeholder="От"
               value={ fromNValue }
               onChange={ onFromNRangeChange }
            />
            <input
               type="text"
               name="toN"
               placeholder="До"
               value={ toNValue }
               onChange={ onToNRangeChange }
            />

            <button
               type="button"
               className={ s.button }
               onClick={ onCustomSelectPrice }
               disabled={ !(fromNValue && toNValue) }
            >
               Применить
            </button>
         </div>
      </form>
   )
}

export default PriceForm

// <Form
// initialValues={ initialValues }
// onSubmit={ onSubmit }
// render={({ handleSubmit }) => (
//    <form className={ s.form } onSubmit={ handleSubmit }>
//       <label>
//          <Field
//             name="toPrice"
//             type="checkbox"
//             component="input"
//             value="toPrice"
//          />
//          До 500 грн
//       </label>
//
//       <Field name="myField" type="checkbox">
//          {({ input: { onChange }, ...rest }) => (
//             <input
//                type="checkbox"
//                {...rest.input}
//                onChange={() => {
//                   onChange()
//                   handleSubmit()
//                }}
//             />
//          )}
//       </Field>
//
//       <label>
//          <Field
//             name="fromToPrice"
//             type="checkbox"
//             component="input"
//             value="fromToPrice"
//          />
//          От 500 до 1000 грн
//       </label>
//
//       <label>
//          <Field
//             name="fromPrice"
//             type="checkbox"
//             component="input"
//             value="fromPrice"
//          />
//          От 1000 грн
//       </label>
//    </form>
// )}
// />
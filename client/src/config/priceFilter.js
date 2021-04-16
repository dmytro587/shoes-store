const priceFilter = [
   {
      id: 1,
      name: 'price-range',
      text: 'До 500 грн',
      range: [0, 500],
      value: 'option1'
   },
   {
      id: 2,
      name: 'price-range',
      text: 'От 500 до 1000 грн',
      range: [500, 1000],
      value: 'option2'
   },
   {
      id: 3,
      name: 'price-range',
      text: 'От 1000 грн',
      range: [1000, 0],
      value: 'option3'
   },
   {
      id: 4,
      name: 'price-range',
      text: 'Все',
      range: 'all',
      value: 'option4'
   }
]

export default priceFilter
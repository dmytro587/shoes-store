import { Option } from './types'

export const getValuesFromOptions = <T>(options: Option<T>[] | Option<T>): T[] => {
   if (Array.isArray(options)) return options.map(item => item.value)

   else if (typeof options === 'object') return [options.value]

   return []
}

export const formatOptions = (configOptions: Option[], initialOptions: Array<string | number>): Option[] => {
   const formattedOptions: Option[] = []

   initialOptions.forEach(value => {
      const matchIndex = configOptions.findIndex(item => item.value === value)

      if (matchIndex >= 0) {
         formattedOptions.push({
            label: configOptions[matchIndex].label,
            value: configOptions[matchIndex].value
         })
      }
   })

   return formattedOptions
}

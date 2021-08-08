export default function numRegexp(value: string) {
   return value.match(/[0-9]/g)?.join('')
}
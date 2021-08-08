export default function delay(ms = 500) {
   return new Promise<void>(r => setTimeout(r, ms))
}



import { useEffect, useState } from 'react'

const useNetworkDetector = () => {
   const [isDisconnected, setIsDisconnected] = useState(false)
   const errorMsg = 'Интернет соединение потеряно'

   useEffect(() => {
      handleConnectionChange()
      window.addEventListener('online', handleConnectionChange)
      window.addEventListener('offline', handleConnectionChange)

      return () => {
         window.removeEventListener('online', handleConnectionChange)
         window.removeEventListener('offline', handleConnectionChange)
      }
   }, [])

   const handleConnectionChange = () => {
      const condition = window.navigator.onLine ? 'online' : 'offline'

      if (condition === 'online') {
         const webPing = setInterval(
            () => {
               fetch('//google.com', {
                  mode: 'no-cors',
               })
                  .then(() => {
                     setIsDisconnected(false)
                     clearInterval(webPing)
                  }).catch(() => setIsDisconnected(true))
            }, 5000)

         return null
      }

      setIsDisconnected(true)
   }

   return isDisconnected ? errorMsg : null
}

export default useNetworkDetector
// add margin to body when no scrollbar
export default function noScrollbarListener() {
   window.addEventListener('DOMContentLoaded', () => {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth

      if (!scrollbarWidth) {
         document.body.style.marginRight = `${scrollbarWidth}px`
      }
   })
}
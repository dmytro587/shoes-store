// add margin to body when no scrollbar
window.addEventListener('DOMContentLoaded', () => {
   const scrollbarWidth = window.innerWidth - document.body.clientWidth

   if (!scrollbarWidth) {
      document.body.style.marginRight = `${scrollbarWidth}px`
   }
})
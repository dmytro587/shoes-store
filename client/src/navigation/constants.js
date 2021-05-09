// main routes
export const main = {
   HOME: '/home',
   AUTH_PAGE: '/auth',
   ADMIN_PANEL: '/admin',
   RESET_PASSWORD_PAGE: '/reset-password',
   NEW_PASSWORD_PAGE: '/new-password/:token',
   CART: '/cart'
}

// admin routes
export const admin = {
   ROOT: '/admin',
   ADD_PRODUCT: '/admin/add-product',
   PRODUCTS_LIST: '/admin/products-list',
   EDIT_PRODUCT: '/admin/edit/:id'
}

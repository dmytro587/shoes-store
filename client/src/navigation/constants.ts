// main routes
export const mainRoutes = {
   HOME: '/home',
   AUTH_PAGE: '/auth',
   LOGIN: '/auth/login',
   REGISTRATION: 'auth/registration',
   ADMIN_PANEL: '/admin',
   RESET_PASSWORD_PAGE: '/reset-password',
   NEW_PASSWORD_PAGE: '/new-password/:token',
   CART: '/cart'
}

// admin routes
export const adminRoutes = {
   ROOT: '/admin',
   ADD_PRODUCT: '/admin/add-product',
   PRODUCTS_LIST: '/admin/products-list',
   EDIT_PRODUCT: '/admin/edit/:id'
}


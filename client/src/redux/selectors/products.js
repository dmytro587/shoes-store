export const getProducts = state => state.products.products
export const getIsLoading = state => state.products.isLoading
export const getProductsAddedToCart = state => state.products.productsAddedToCart
export const getTotalPages = state => Math.ceil(state.products.totalCount / state.filters.pageLimit)
export const getError = state => state.products.error
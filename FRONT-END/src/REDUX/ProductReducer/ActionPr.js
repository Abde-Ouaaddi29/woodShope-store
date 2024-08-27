
export const SET_PRODUCT = 'SET_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_SEARCHVALUE = 'SET_SEARCHVALUE'
export const SET_MINMAX_PRICE = 'SET_MINMAX_PRICE'

export const SETPRODUCT = (data) => {
   return {
    type: SET_PRODUCT,
    payload:data
   }
}

export const DELETEPRODUCT = (id) => {
    return {
     type: DELETE_PRODUCT,
     payload:id
    }
 }

 export const SETCATEGORIES = (data) => {
   return {
      type: SET_CATEGORIES,
      payload:data
   }
   
 }

 export const SETSEARCHVALUE = (data) => {
   return {
      type: SET_SEARCHVALUE,
      payload:data
   }
}

export const SETMINMAXPRICE = (data) => {
   return {
      type: SET_MINMAX_PRICE,
      payload:data
   }
}



import { DELETE_PRODUCT, SET_CATEGORIES, SET_MINMAX_PRICE, SET_PRODUCT, SET_SEARCHVALUE } from "./ActionPr";

const initialValues = {
    products:[],
    categories:[],
    searchValue:"",
    minMaxPrice:[],
};

export const ProductReducer = (state = initialValues , action) => {

 switch(action.type){
        case SET_PRODUCT: 
          return { ...state, products:action.payload };

        case SET_SEARCHVALUE:
            return { ...state, searchValue:action.payload };  
        
        case SET_MINMAX_PRICE:
            return { ...state, minMaxPrice:action.payload };  
        
        case DELETE_PRODUCT:
            return {
                ...state, products:[ ...state.products.filter((product) => {
                    return product.id !== action.payload
                })]
            }

        case SET_CATEGORIES:
            return { ...state, categories:action.payload }

        default:
            return state;
    
    }
}


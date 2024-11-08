import { ADD_TO_CART,  DECRIMENT, INCREMENT, REMOVE_ORDER, UPDATE_COUNT_ORDER } from "./ActionsOr";

const initialValues = {
     orders : []  
};

export const OrderReducer = (state = initialValues, action) => {
  switch (action.type) {

      case ADD_TO_CART:
          return { ...state, orders: [...state.orders, action.payload]};

      case INCREMENT:
          return {
              ...state,
              orders: state.orders.map(order =>
                  order.id === action.payload ? { ...order, count: order.count + 1 } : order
              )
          };

      case DECRIMENT:
          return {
              ...state,
              orders: state.orders.map(order =>
                  order.id === action.payload ? { ...order, count: Math.max(1, order.count - 1) } : order
              )
          };

      case UPDATE_COUNT_ORDER:
          return {
            ...state , orders: state.orders.map((order) => {
               return  order.id === action.payload.id ? {...order, count:action.payload.quantity} : order
            })
          };

      case REMOVE_ORDER:
          return {
              ...state,
              orders: state.orders.filter((order) => {
                return order.id !== action.payload
              })
          };

      default:
          return state;
  }
};



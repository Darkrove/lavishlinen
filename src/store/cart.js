"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import client from "@/lib/commerce"

const CartStateContext = createContext();
const CartDispatchContext = createContext();


const initialState = {
    total_items: 0,
    total_unique_items: 0,
    line_items: [],
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            return { ...state, ...action.payload };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        getCart();
    }, []);

    const setCart = (payload) => dispatch({ type: "ADD_TO_CART", payload });

    const getCart = async () => {
        try {
            const cart = await client.cart.retrieve();
            setCart(cart)
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <CartDispatchContext.Provider value={{ setCart }}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>

    );
}

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
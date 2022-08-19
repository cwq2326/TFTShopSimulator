import { createSlice } from "@reduxjs/toolkit";

const SHOP_SIZE = 5

const Shop = createSlice({
    name: "shop",
    initialState: {
        slots: [null, null, null, null, null],
        isFull: false
    },
    reducers: {
        refreshShop(state, action) {
            if (!state.isFull) {
                // payload is an array of 5 champions
                for (let i = 0; i < SHOP_SIZE; ++i) {
                    state.slots[i] = action.payload[i]
                }
            }
        },
        removeUnitFromShopSlot(state, action) {
            // payload is index of shop slot
            const index = action.payload
            state.slots[index] = null
        }
    }
})

export const ShopActions = Shop.actions

export default Shop
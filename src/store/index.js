import { configureStore } from '@reduxjs/toolkit'

import poolSlice from './pool-slice'
import benchSlice from "./bench-slice";
import shopSlice from './shop-slice'
import settingSlice from "./setting-slice";

export const store = configureStore({
    reducer: {
        pool: poolSlice.reducer,
        shop: shopSlice.reducer,
        bench: benchSlice.reducer,
        setting: settingSlice.reducer
    }
})

export default store
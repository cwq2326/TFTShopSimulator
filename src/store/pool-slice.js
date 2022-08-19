import {createSlice} from '@reduxjs/toolkit'

import {tier1Pool} from '../assets/tierlist/tier1'
import {tier2Pool} from "../assets/tierlist/tier2";
import {tier3Pool} from "../assets/tierlist/tier3";
import {tier4Pool} from "../assets/tierlist/tier4";
import {tier5Pool} from "../assets/tierlist/tier5";

const poolSlice = createSlice({
    name: 'pool',
    initialState: {
        pool: [tier1Pool, tier2Pool, tier3Pool, tier4Pool, tier5Pool]
    },
    reducers: {
        removeChampionFromPool(state, action) {
            const index = action.payload.index
            const tier = action.payload.tier
            const champion = state.pool[tier - 1][index]
            state.pool[tier - 1][index] = {...champion, quantity: champion.quantity - 1}
        },
        addChampionToPool(state, action) {
            const index = action.payload.index
            const tier = action.payload.tier
            const champion = state.pool[tier - 1][index]
            let quantityToAdd;

            if (action.payload.grade) {
                switch (action.payload.grade) {
                    case (1):
                        quantityToAdd = 1
                        break
                    case (2):
                        quantityToAdd = 3
                        break
                    case (3):
                        quantityToAdd = 9
                        break
                    default:
                        quantityToAdd = 1
                }
            }
            state.pool[tier - 1][index] = {...champion, quantity: champion.quantity + quantityToAdd}

        }
    }
})

export const poolActions = poolSlice.actions

export default poolSlice
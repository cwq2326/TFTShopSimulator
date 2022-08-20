import {createSlice} from '@reduxjs/toolkit'

import {tier1Pool} from '../assets/tierlist/tier1'
import {tier2Pool} from "../assets/tierlist/tier2";
import {tier3Pool} from "../assets/tierlist/tier3";
import {tier4Pool} from "../assets/tierlist/tier4";
import {tier5Pool} from "../assets/tierlist/tier5";
import {getTierOdds} from "../api/tier-odds";
import {getUnitPoolIndex} from "../api/game";


const poolSlice = createSlice({
    name: 'pool',
    initialState: {
        shop: [null, null, null, null, null],
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

        },
        refreshShop(state, action) {

            // Put back units into pool if any
            state.shop.forEach(unit => {
                if (unit) {
                    const unitTierIndex = unit.cost - 1
                    const unitPoolIndex = getUnitPoolIndex(unitTierIndex + 1, unit)

                    state.pool[unitTierIndex][unitPoolIndex] = {
                        ...unit,
                        quantity: state.pool[unitTierIndex][unitPoolIndex].quantity + 1
                    }
                }
            })

            // Refresh the shop with new units from pool
            state.shop = [null, null, null, null, null]
            const playerLevel = action.payload

            while (state.shop.filter(x => x === null).length !== 0) {
                const unitTierIndex = getTierOdds(playerLevel) - 1
                const selectedPool = state.pool[unitTierIndex]
                const unitIndex = Math.floor(Math.random() * selectedPool.length)
                const selectedUnit = selectedPool[unitIndex]

                if (selectedUnit.quantity > 0) {
                    const shopIndex = state.shop.findIndex(unit => unit === null)

                    selectedPool[unitIndex] = {...selectedUnit, quantity: selectedUnit.quantity - 1}
                    state.shop[shopIndex] = selectedPool[unitIndex]
                }
            }
        },
        removeUnitFromShopSlot(state, action) {
            const index = action.payload

            state.shop[index] = null
        }
    }
})

export const poolActions = poolSlice.actions

export default poolSlice
import {createSlice} from "@reduxjs/toolkit";

const benchSlice = createSlice({
    name: "bench",
    initialState: {
        slots: [null, null, null, null, null, null, null, null],
        lastAdded: null
    },
    reducers: {
        addUnitToBench(state, action) {
            const unit = action.payload
            const index = state.slots.findIndex(x => x === null)
            if (index !== -1) {
                state.slots[index] = unit
            }
            if (state.slots.filter(unit => unit === null).length === 0) {
                state.isFull = true
            }
        },
        removeUnitFromBench(state, action) {
            const index = action.payload
            state.slots[index] = null
        },
        setLastAdded(state, action) {
            state.lastAdded = action.payload
        },
        combineUnit(state, action) {
            const indexes = action.payload
            const grade = state.slots[indexes[0]].grade
            state.slots[indexes[0]] = {...state.slots[indexes[0]], grade: grade + 1}
            state.slots[indexes[1]] = null
            state.slots[indexes[2]] = null
            state.lastAdded = state.slots[indexes[0]]
        },
        combineFullBenchUnit(state, action) {

        }
    }
})

export const benchActions = benchSlice.actions

export default benchSlice
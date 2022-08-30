import React from "react";
import {useDispatch, useSelector} from "react-redux";

import classes from "./Bench.module.css"
import BenchSlot from "../Slot/BenchSlot";
import {benchActions} from "../../store/bench-slice";

const Bench = () => {

    const bench = useSelector(state => state.bench.slots)
    const lastAdded = useSelector(state => state.bench.lastAdded)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (lastAdded) {
            // Check if there is 3 units of same grade to combine
            if (bench.filter(x => x && x.name === lastAdded.name && x.grade === lastAdded.grade).length === 3) {
                // get indexes
                const indexes = []
                bench.map((x, index) => {
                    if (x && x.name === lastAdded.name && x.grade === lastAdded.grade) {
                        indexes.push(index)
                    }
                })
                if (lastAdded.grade !== 3) {
                    dispatch(benchActions.combineUnit(indexes))
                }
            }
        }
        return () => {
            dispatch(benchActions.setLastAdded(null))
        }
    }, [bench])

    return <div className={classes.bench}>
        <h1>Bench</h1>
        {bench.map((unit, index) => {
            return unit ? <BenchSlot index={index} unit={unit}>{unit.name}</BenchSlot> :
                <p className={classes.slot}></p>
        })}
    </div>
}

export default Bench
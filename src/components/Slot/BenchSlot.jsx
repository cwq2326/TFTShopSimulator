import {useSelector, useDispatch} from "react-redux";

import classes from "./ShopSlot.module.css"
import {poolActions} from "../../store/pool-slice";
import {benchActions} from "../../store/bench-slice";
import {getUnitPoolIndex} from "../../api/game";

const BenchSlot = (props) => {

    const dispatch = useDispatch()
    const { name, championId, cost, traits, grade} = props.unit;
    const sellUnit = () => {
        const index = getUnitPoolIndex(cost, props.unit)
        dispatch(poolActions.addChampionToPool({index, grade, tier: cost}))
        dispatch(benchActions.removeUnitFromBench(props.index))
    }

    return <div onClick={sellUnit} className={classes.slot}>
        <img src={require(`../../assets/champions/${championId}.png`)} />
        <p>{name} {grade}</p>
    </div>
}

export default BenchSlot
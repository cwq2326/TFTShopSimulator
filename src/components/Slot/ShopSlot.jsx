import {useDispatch, useSelector} from "react-redux";

import classes from "./ShopSlot.module.css"
import {benchActions} from "../../store/bench-slice";
import {poolActions} from "../../store/pool-slice";

const ShopSlot = (props) => {

    const dispatch = useDispatch()
    const {name, championId, cost, traits, grade} = props.unit;
    const benchIsFull = useSelector(state => state.bench.slots).filter(x => x !== null).length === 8

    const handleClick = () => {
        if (!benchIsFull) {
            const x = {...props.unit, grade: 1}
            dispatch(benchActions.addUnitToBench(x))
            dispatch(benchActions.setLastAdded(x))
            dispatch(poolActions.removeUnitFromShopSlot(props.index))
        }
    }

    return (
        <div onClick={handleClick} className={classes.slot}>
            <img src={require(`../../assets/champions/${championId}.png`)}/>
            <div className={classes.border}>
                <p className={classes["unit-name"]}>{name}</p>
                <p className={classes["unit-cost"]}>{"$" + cost}</p>
            </div>
        </div>)
}

export default ShopSlot
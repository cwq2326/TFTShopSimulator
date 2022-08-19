import {useDispatch, useSelector} from "react-redux";

import classes from "./ShopSlot.module.css"
import {benchActions} from "../../store/bench-slice";
import {ShopActions} from "../../store/shop-slice";

const ShopSlot = (props) => {

    const dispatch = useDispatch()
    const {name, championId, cost, traits, grade} = props.unit;
    const benchIsFull = useSelector(state => state.bench.slots).filter(x => x !== null).length === 8

    const handleClick = () => {
        if (!benchIsFull) {
            const x = {...props.unit, grade: 1}
            dispatch(benchActions.addUnitToBench(x))
            dispatch(benchActions.setLastAdded(x))
            dispatch(ShopActions.removeUnitFromShopSlot(props.index))
        }
    }

    return <div onClick={handleClick} className={classes.slot}>
        <img src={require(`../../assets/champions/${championId}.png`)} />
        <p>{name}</p>
        <p>{"$"+cost}</p>
    </div>
}

export default ShopSlot
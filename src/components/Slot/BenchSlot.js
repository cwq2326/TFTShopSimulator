import {useDispatch} from "react-redux";

import classes from "./Slot.module.css"
import {poolActions} from "../../store/pool-slice";
import {benchActions} from "../../store/bench-slice";
import {getUnitPoolIndex} from "../../api/game";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const BenchSlot = (props) => {

    const dispatch = useDispatch()
    const {name, championId, cost, traits, grade} = props.unit;
    const sellUnit = () => {
        const index = getUnitPoolIndex(cost, props.unit)
        dispatch(poolActions.addChampionToPool({index, grade, tier: cost}))
        dispatch(benchActions.removeUnitFromBench(props.index))
    }

    let borderColor;
    switch (cost) {
        case 1:
            borderColor = "tier-1"
            break;
        case 2:
            borderColor = "tier-2"
            break;
        case 3:
            borderColor = "tier-3"
            break;
        case 4:
            borderColor = "tier-4"
            break;
        case 5:
            borderColor = "tier-5"
            break;
        default:
    }

    let stars;

    switch(grade) {
        case (1):
            stars = <FontAwesomeIcon className={classes["unit-grade"]} icon={faStar} />
            break
        case (2):
            stars = <div>
                <FontAwesomeIcon className={classes["unit-grade"]} icon={faStar} />
                <FontAwesomeIcon className={classes["unit-grade"]} icon={faStar} />
            </div>
            break
        case (3):
            stars = <div>
                <FontAwesomeIcon className={classes["unit-grade"]} icon={faStar} />
                <FontAwesomeIcon className={classes["unit-grade"]} icon={faStar} />
                <FontAwesomeIcon className={classes["unit-grade"]} icon={faStar} />
            </div>
    }

    return <div onClick={sellUnit} className={classes.slot}>
        <img src={require(`../../assets/champions/${championId}.png`)}/>
        <div className={`${classes.border} ${classes[`${borderColor}`]}`}>
            <p className={classes["unit-name"]}>{name}</p>
            {stars}

        </div>
    </div>
}

export default BenchSlot
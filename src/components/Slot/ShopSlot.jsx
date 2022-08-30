import { useDispatch, useSelector } from "react-redux";

import classes from "./Slot.module.css";
import { benchActions } from "../../store/bench-slice";
import { poolActions } from "../../store/pool-slice";

const ShopSlot = (props) => {
    const dispatch = useDispatch();
    const { name, championId, cost, traits, grade } = props.unit;
    const bench = useSelector((state) => state.bench.slots);
    const benchIsFull = bench.filter((x) => x !== null).length === 8;

    let borderColor;
    switch (cost) {
        case 1:
            borderColor = "tier-1";
            break;
        case 2:
            borderColor = "tier-2";
            break;
        case 3:
            borderColor = "tier-3";
            break;
        case 4:
            borderColor = "tier-4";
            break;
        case 5:
            borderColor = "tier-5";
            break;
        default:
    }

    const handleClick = () => {
        if (!benchIsFull) {
            const x = { ...props.unit, grade: 1 };
            dispatch(benchActions.addUnitToBench(x));
            dispatch(benchActions.setLastAdded(x));
            dispatch(poolActions.removeUnitFromShopSlot(props.index));
            return;
        }

        const indexes = bench.filter((x, index) => {
            if (x && x.name === props.unit.name && x.grade === 1) {
                return index;
            }
        });
        console.log("ds", indexes);
        if (
            bench.filter(
                (x) => x && x.name === props.unit.name && x.grade === 1
            ).length === 2
        ) {
        }
    };

    return (
        <div onClick={handleClick} className={classes.slot}>
            <img src={require(`../../assets/champions/${championId}.png`)} />
            <div className={`${classes.border} ${classes[`${borderColor}`]}`}>
                <p className={classes["unit-name"]}>{name}</p>
                <p className={classes["unit-cost"]}>{"$" + cost}</p>
            </div>
        </div>
    );
};

export default ShopSlot;

import React from "react";

import ShopSlot from "../Slot/ShopSlot";
import classes from "./Shop.module.css"
import {useDispatch, useSelector} from "react-redux"
import {poolActions} from "../../store/pool-slice";
import {getUnitPoolIndex} from "../../api/game";
import {getTierOdds} from "../../api/tier-odds";

const Shop = () => {

    const playerLevel = useSelector(state => state.setting.level)
    const pool = useSelector(state => state.pool.pool)
    const shopSlots = useSelector(state => state.pool.shop)
    const dispatch = useDispatch()

    // React.useEffect(() => {
    //     let fired = false
    //     document.addEventListener("keydown", (event) => {
    //         if (!fired && event.code === "KeyD") {
    //             refreshShop()
    //             fired = true
    //         }
    //     })
    //
    //     document.addEventListener("keyup", () => {
    //         fired = false
    //     })
    //
    //     return () => {}
    // }, [])

    React.useEffect(() => {
        dispatch(poolActions.refreshShop(playerLevel))
    }, [])

    return <div className={classes.shop}>
        <h1>Shop</h1>
        {shopSlots.map((unit, index) => {
            return unit ? <ShopSlot unit={unit} index={index}/> : <p className={classes.slot}>null</p>
        })
        }
        <button onClick={() => dispatch(poolActions.refreshShop(playerLevel))}>Refresh</button>
        <button onClick={() => console.log(pool[4])}>POOL</button>
    </div>
}

export default Shop
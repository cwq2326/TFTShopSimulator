import React from "react";

import ShopSlot from "../Slot/ShopSlot";
import classes from "./Shop.module.css"
import {useDispatch, useSelector} from "react-redux"
import {ShopActions} from "../../store/shop-slice";
import {poolActions} from "../../store/pool-slice";
import {getTierIndex} from "../../api/game";
import {getTierOdds} from "../../api/tier-odds";

const Shop = () => {

    const playerLevel = useSelector(state => state.setting.level)
    const pool = useSelector(state => state.pool.pool)
    const shopSlots = useSelector(state => state.shop.slots)
    const dispatch = useDispatch()

    const getChampionFromPool = () => {
        const tier = getTierOdds(playerLevel)
        const index = Math.floor(Math.random() * pool[tier - 1].length)
        if (pool[tier - 1][index].quantity > 0) {
            dispatch(poolActions.removeChampionFromPool({index, tier}))
            return pool[tier - 1][index]
        } else {
            return null
        }
    }

    const initialRefreshShop = () => {
        const refreshedShop = []
        while (refreshedShop.length !== 2) {
            const champion = getChampionFromPool()
            if (champion) {
                refreshedShop.push(champion)
            }
        }
        dispatch(ShopActions.refreshShop(refreshedShop))
    }

    const refreshShop = () => {
        shopSlots.forEach(champion => {
            if (champion) {
                const index = getTierIndex(champion.cost, champion)
                dispatch(poolActions.addChampionToPool({index, grade: -1, tier: champion.cost}))
            }
        })
        initialRefreshShop()
    }

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
        initialRefreshShop()
    }, [])

    return <div className={classes.shop}>
        <h1>Shop</h1>
        {shopSlots.map((unit, index) => {
            return unit ? <ShopSlot unit={unit} index={index}/> : <p className={classes.slot}>null</p>
        })
        }
        <button onClick={refreshShop}>Refresh</button>
        <button onClick={() => console.log(pool[4])}>POOL</button>
    </div>
}

export default Shop
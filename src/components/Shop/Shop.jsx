import React from "react";

import ShopSlot from "../Slot/ShopSlot";
import classes from "./Shop.module.css";
import { useDispatch, useSelector } from "react-redux";
import { poolActions } from "../../store/pool-slice";

const Shop = () => {
    const playerLevel = useSelector((state) => state.setting.level);
    const shopSlots = useSelector((state) => state.pool.shop);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const handleOnDKey = (event) => {
            if (!fired && event.code === "KeyD") {
                dispatch(poolActions.refreshShop(playerLevel));
                fired = true;
            }
        };

        const handleOnKeyUp = () => {
            fired = false;
        };

        console.log("inside use effect");
        let fired = false;
        document.addEventListener("keydown", handleOnDKey);

        document.addEventListener("keyup", handleOnKeyUp);

        return () => {
            document.removeEventListener("keydown", handleOnDKey);
            document.removeEventListener("keyup", handleOnKeyUp);
        };
    }, [playerLevel]);

    React.useEffect(() => {
        dispatch(poolActions.refreshShop(playerLevel));
    }, []);

    return (
        <div className={classes.shop}>
            <h1>Shop</h1>
            <div className={classes["units-container"]}>
                <button
                    className={classes["refresh-btn"]}
                    onClick={() =>
                        dispatch(poolActions.refreshShop(playerLevel))
                    }
                >
                    Refresh
                </button>
                {shopSlots.map((unit, index) => {
                    return unit ? (
                        <ShopSlot unit={unit} index={index} />
                    ) : (
                        <div className={classes.slot}></div>
                    );
                })}
            </div>
        </div>
    );
};

export default Shop;

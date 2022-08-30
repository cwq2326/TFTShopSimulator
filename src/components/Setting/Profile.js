import React from "react";
import {useSelector, useDispatch} from "react-redux";

import {odds} from "../../api/tier-odds";
import {settingActions} from "../../store/setting-slice";
import classes from "./Profile.module.css"

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const Profile = () => {
    const dispatch = useDispatch()
    const playerLevel = useSelector(state => state.setting.level)

    const handleSelectLevel = (event) => {
        const level = event.target.value
        dispatch(settingActions.setLevel(level))
    }

    return <div>
        <div className={classes.container}>
        <h1 className={classes["shop-name"]}>Shop level: {playerLevel}</h1>
        <label>Select level: </label>
        <select name="level" onChange={handleSelectLevel}>
            {LEVELS.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        </div>
        <div className={classes.container}>
        <h4>Odds: </h4>
        <ul className={classes.odds}>
            {odds[playerLevel - 1].map((x, index)=><li key={index}>{`Tier ${index}: ${x}`}</li>)}
        </ul>
        </div>
    </div>
}

export default Profile
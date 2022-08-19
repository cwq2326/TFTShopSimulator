import {useSelector, useDispatch} from "react-redux";

import {getTierOdds, odds} from "../../api/tier-odds";
import {settingActions} from "../../store/setting-slice";

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const Profile = () => {
    const dispatch = useDispatch()
    const playerLevel = useSelector(state => state.setting.level)

    const handleSelectLevel = (event) => {
        const level = event.target.value
        dispatch(settingActions.setLevel(level))
    }

    return <div>
        <h1>Player level is {playerLevel}</h1>
        <select name="level" onChange={handleSelectLevel}>
            {LEVELS.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <h2>Odds</h2>
        <ul>
            {odds[playerLevel - 1].map((x, index)=><li key={index}>{x}</li>)}
        </ul>
    </div>
}

export default Profile
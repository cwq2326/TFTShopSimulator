import { tier1Pool } from "../assets/tierlist/tier1";
import { tier2Pool } from "../assets/tierlist/tier2";
import { tier3Pool } from "../assets/tierlist/tier3";
import { tier4Pool } from "../assets/tierlist/tier4";
import { tier5Pool } from "../assets/tierlist/tier5";

export const getUnitPoolIndex = (tier, unit) => {
    switch (tier) {
        case 1:
            return tier1Pool.findIndex((x) => unit.name === x.name);
        case 2:
            return tier2Pool.findIndex((x) => unit.name === x.name);
        case 3:
            return tier3Pool.findIndex((x) => unit.name === x.name);
        case 4:
            return tier4Pool.findIndex((x) => unit.name === x.name);
        case 5:
            return tier5Pool.findIndex((x) => unit.name === x.name);
        default:
            return null;
    }
};

const level1Odds = [100, 0, 0, 0, 0];
const level2Odds = [100, 0, 0, 0, 0];
const level3Odds = [75, 25, 0, 0, 0];
const level4Odds = [55, 30, 15, 0, 0];
const level5Odds = [40, 33, 20, 2, 0];
const level6Odds = [25, 40, 30, 5, 0];
const level7Odds = [19, 30, 35, 15, 1];
const level8Odds = [16, 20, 35, 25, 4];
const level9Odds = [9, 15, 30, 30, 16];
const level10Odds = [5, 10, 20, 40, 25];
// const level11Odds = [1, 2, 12, 50, 35];
const level11Odds = [0, 0, 0, 0, 100  ];

export const odds = [
    level1Odds,
    level2Odds,
    level3Odds,
    level4Odds,
    level5Odds,
    level6Odds,
    level7Odds,
    level8Odds,
    level9Odds,
    level10Odds,
    level11Odds,
];

export function getTierOdds(level) {
    const tierOdds = odds[level - 1];
    const chance = Math.floor(Math.random() * 100);
    if (chance < tierOdds[0]) {
        return 1;
    }
    if (chance < tierOdds[0] + tierOdds[1]) {
        return 2;
    }
    if (chance < tierOdds[0] + tierOdds[1] + tierOdds[2]) {
        return 3;
    }
    if (chance < tierOdds[0] + tierOdds[1] + tierOdds[2] + tierOdds[3]) {
        return 4;
    } else {
        return 5;
    }
}

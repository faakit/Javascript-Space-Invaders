function supportsWorkerType() {
    let supports = false
    const tester = {
        get type() { supports = true }
    }

    try {
        new Worker('blob://', tester).terminate()
    } finally {
        return supports
    }
}

function prepareRunChecker({ timerDelay }) {
    let lastEvent = Date.now()
    return {
        shouldRun() {
            const result = (Date.now() - lastEvent) > timerDelay
            if (result) lastEvent = Date.now()

            return result
        }
    }
}

const glowIndex = {
    0: 2,
    2: 4,
    4: 6,
    6: 8,
    8: 10,
    10: 12,
    12: 14,
    14: 16,
    16: 18,
    18: 20,
    20: 22,
    22: 24,
    24: 26,
    26: 28,
    28: 30,
    30: 32,
    32: 34,
    34: 36,
    36: 38,
    38: 40,
    40: 39,
    39: 37,
    37: 35,
    35: 33,
    33: 31,
    31: 29,
    29: 27,
    27: 25,
    25: 23,
    23: 21,
    21: 19,
    19: 17,
    17: 15,
    15: 13,
    13: 11,
    11: 9,
    9: 7,
    7: 5,
    5: 3,
    3: 1,
    1: 0
}

const frameSkip = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 0
}

export {
    supportsWorkerType,
    prepareRunChecker,
    glowIndex,
    frameSkip
}
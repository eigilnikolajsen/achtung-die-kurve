let curPlayerWrapper
let notTheseKeys = [
    "Backspace",
    "Tab",
    "Enter",
    "ShiftLeft",
    "ShiftRight",
    "ControlLeft",
    "ControlRight",
    "AltLeft",
    "AltRight",
    "CapsLock",
    "Escape",
    "Space",
    "MetaLeft",
    "MetaRight",
    "ContextMenu",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
]

function playerClick(name) {
    players[name].active = !players[name].active //switch active or not

    let w = document.querySelector(`.player_wrapper.${name}`)
    for (const player in players) {
        if (name == player) {
            if (players[name].active) {
                w.classList.add("focus")
                curPlayerWrapper = w
                getLeftButton(name, w)
            } else {
                resetPlayer(w)
            }
        } else if (players[player].active && !players[player].ready) {
            resetPlayer(document.querySelector(`.player_wrapper.${player}`))
        }
    }
}

function resetPlayer(w) {
    w.classList.remove("focus")
    w.querySelector(".key_wrapper_left .key_button").classList.add("hidden")
    w.querySelector(".key_wrapper_left .key_text").textContent = ""
    w.querySelector(".key_wrapper_right .key_button").classList.add("hidden")
    w.querySelector(".key_wrapper_right .key_text").textContent = ""
    players[w.dataset.playerName].ready = false
    players[w.dataset.playerName].active = false
    players[w.dataset.playerName].keyL = false
    players[w.dataset.playerName].keyR = false
}

document.addEventListener("keydown", (e) => {
    for (const player in players) {
        if (players[player].keyR === true) {
            setRightButton(player, curPlayerWrapper, e.code, e.key)
        }
        if (players[player].keyL === true) {
            setLeftButton(player, curPlayerWrapper, e.code, e.key)
        }
    }
    if (achtung.startScreen) {
        for (let index = 1; index <= 6; index++) {
            if (e.key == index.toString()) playerClick(Object.keys(players)[index - 1])
        }
    }
})

function getLeftButton(name, w) {
    players[name].keyL = true
    let keyWrapperLeft = w.querySelector(".key_wrapper_left .key_button")
    keyWrapperLeft.classList.remove("hidden")
}

function setLeftButton(name, w, key, keyName) {
    for (let i = 0; i < notTheseKeys.length; i++) {
        if (key == notTheseKeys[i]) return
    }

    document.querySelector(`.player_wrapper.${name} .key_wrapper_left .key_button`).classList.add("hidden")
    document.querySelector(`.player_wrapper.${name} .key_wrapper_left .key_text`).textContent = keyName.replace("Arrow", "").toUpperCase()
    players[name].keyL = key

    getRightButton(name, w)
}

function getRightButton(name, w) {
    players[name].keyR = true
    let keyWrapperRight = w.querySelector(".key_wrapper_right .key_button")
    keyWrapperRight.classList.remove("hidden")
}

function setRightButton(name, w, key, keyName) {
    for (let i = 0; i < notTheseKeys.length; i++) {
        if (key == notTheseKeys[i] || key == players[name].keyL) return
    }

    document.querySelector(`.player_wrapper.${name} .key_wrapper_right .key_button`).classList.add("hidden")
    document.querySelector(`.player_wrapper.${name} .key_wrapper_right .key_text`).textContent = keyName.replace("Arrow", "").toUpperCase()
    players[name].keyR = key
    players[name].ready = true

    achtung.playing.push(name)
}

document.querySelector("#gamemode_wrapper p:nth-child(1)").addEventListener("click", (u) => {
    u.path[0].classList.add("underline")
    u.path[1].querySelector("p:nth-child(2)").classList.remove("underline")
    achtung.gamemode = 1
})

document.querySelector("#gamemode_wrapper p:nth-child(2)").addEventListener("click", (u) => {
    u.path[0].classList.add("underline")
    u.path[1].querySelector("p:nth-child(1)").classList.remove("underline")
    achtung.gamemode = 0
})

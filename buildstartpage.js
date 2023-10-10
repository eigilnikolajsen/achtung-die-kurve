const gameID = document.querySelector("#game")
const startPage = document.querySelector("#start_page")
function buildStartPage() {
    const startH1 = document.createElement("h1")
    startH1.id = "game_title"
    startH1.textContent = "Achtung, die Kurve!"
    startPage.append(startH1)

    const playerGrid = document.createElement("div")
    playerGrid.id = "player_grid"

    const firstRow = document.createElement("section")
    firstRow.classList.add("player_wrapper_start")
    Array.from(Array(4)).forEach((_, i) => {
        const p = document.createElement("p")
        if (i == 0) p.textContent = "#"
        if (i == 1) p.textContent = "Player"
        if (i == 2) {
            p.textContent = "Left"
            p.classList.add("text_center")
        }
        if (i == 3) {
            p.textContent = "Right"
            p.classList.add("text_center")
        }
        firstRow.append(p)
    })
    playerGrid.append(firstRow)
    let playerCounter = 0
    for (const player in players) {
        const pWrap = document.createElement("section")
        pWrap.classList.add("player_wrapper", player)
        pWrap.dataset.playerName = player
        pWrap.setAttribute("onclick", `playerClick('${player}')`)

        const pNum = document.createElement("p")
        playerCounter++
        pNum.textContent = playerCounter
        pWrap.append(pNum)
        const pName = document.createElement("p")
        pName.textContent = player.charAt(0).toUpperCase() + player.slice(1)
        pWrap.append(pName)

        Array.from(Array(2)).forEach((_, i) => {
            const pKeyWrap = document.createElement("div")
            if (i == 0) pKeyWrap.classList.add("key_wrapper", "key_wrapper_left")
            if (i == 1) pKeyWrap.classList.add("key_wrapper", "key_wrapper_right")
            const pPress = document.createElement("p")
            pPress.classList.add("text_center", "key_button", "hidden")
            const pKey = document.createElement("p")
            pKey.classList.add("text_center", "key_text")
            if (i == 0) pPress.textContent = "Press left key"
            if (i == 1) pPress.textContent = "Press right key"
            pKeyWrap.append(pPress)
            pKeyWrap.append(pKey)
            pWrap.append(pKeyWrap)
        })
        playerGrid.append(pWrap)
    }

    startPage.append(playerGrid)

    const gmWrap = document.createElement("div")
    gmWrap.id = "gamemode_wrapper"
    const pArcade = document.createElement("p")
    pArcade.textContent = "Arcade"
    pArcade.classList.add("underline")
    const pClassic = document.createElement("p")
    pClassic.textContent = "Classic"
    gmWrap.append(pArcade)
    gmWrap.append(pClassic)
    startPage.append(gmWrap)

    const playButtonWrapper = document.createElement("div")
    playButtonWrapper.id = "start_game_button_wrapper"
    const playButton = document.createElement("button")
    playButton.id = "start_game_button"
    playButton.textContent = "Press SPACE to start game"
    playButtonWrapper.append(playButton)
    startPage.append(playButtonWrapper)
    playButton.addEventListener("click", pressSpace)
}

buildStartPage()

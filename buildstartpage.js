let gameID = document.querySelector("#game")
let startPage = document.querySelector("#start_page")
let startH1 = document.createElement("h1")
startH1.id = "game_title"
startH1.textContent = "Achtung, die Kurve!"
startPage.append(startH1)

let playerGrid = document.createElement("div")
playerGrid.id = "player_grid"

let firstRow = document.createElement("section")
firstRow.classList.add("player_wrapper_start")
for (let i = 0; i < 4; i++) {
    let p = document.createElement("p")
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
}
playerGrid.append(firstRow)
let playerCounter = 0
for (const player in players) {
    let pWrap = document.createElement("section")
    pWrap.classList.add("player_wrapper", player)
    pWrap.dataset.playerName = player
    pWrap.setAttribute("onclick", `playerClick('${player}')`)

    let pNum = document.createElement("p")
    playerCounter++
    pNum.textContent = playerCounter
    pWrap.append(pNum)
    let pName = document.createElement("p")
    pName.textContent = player.charAt(0).toUpperCase() + player.slice(1)
    pWrap.append(pName)

    for (let i = 0; i < 2; i++) {
        let pKeyWrap = document.createElement("div")
        if (i == 0) pKeyWrap.classList.add("key_wrapper", "key_wrapper_left")
        if (i == 1) pKeyWrap.classList.add("key_wrapper", "key_wrapper_right")
        let pPress = document.createElement("p")
        pPress.classList.add("text_center", "key_button", "hidden")
        let pKey = document.createElement("p")
        pKey.classList.add("text_center", "key_text")
        if (i == 0) pPress.textContent = "Press left key"
        if (i == 1) pPress.textContent = "Press right key"
        pKeyWrap.append(pPress)
        pKeyWrap.append(pKey)
        pWrap.append(pKeyWrap)
    }
    playerGrid.append(pWrap)
}

startPage.append(playerGrid)

let gmWrap = document.createElement("div")
gmWrap.id = "gamemode_wrapper"
let pArcade = document.createElement("p")
pArcade.textContent = "Arcade"
pArcade.classList.add("underline")
let pClassic = document.createElement("p")
pClassic.textContent = "Classic"
gmWrap.append(pArcade)
gmWrap.append(pClassic)
startPage.append(gmWrap)

let playButtonWrapper = document.createElement("div")
playButtonWrapper.id = "start_game_button_wrapper"
let playButton = document.createElement("button")
playButton.id = "start_game_button"
playButton.textContent = "Press SPACE to start game"
playButtonWrapper.append(playButton)
startPage.append(playButtonWrapper)
//changeFav("#FCF816")

playButton.addEventListener("click", () => {
    pressSpace()
})

//make favicon
function changeFav(col) {
    var canvas = document.createElement("canvas")
    canvas.width = 240
    canvas.height = 240
    var ctx = canvas.getContext("2d")
    var img = new Image()
    img.src = "/favicon.ico"
    img.onload = () => {
        ctx.drawImage(img, 0, 0)
        ctx.beginPath()
        ctx.arc(120, 120, 120, 0, 2 * Math.PI, false)
        ctx.fillStyle = col
        ctx.fill()

        var link = document.createElement("link")
        link.type = "image/x-icon"
        link.rel = "shortcut icon"
        link.href = canvas.toDataURL("image/x-icon")
        document.getElementsByTagName("head")[0].appendChild(link)
    }
}

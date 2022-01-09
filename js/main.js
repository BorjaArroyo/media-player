// Song data
const songList = [
    {
        title: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover: "1.jpeg"

    },
    {
        title: "A New Beginning",
        file: "anewbeginning.mp3",
        cover: "2.jpeg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpeg"
    },
]

let currentSongIndex = null

// Capture elements From DOM
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.querySelector("h1")
const buttons = document.querySelectorAll("button")
let links // Loaded later
const progressBar = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")

// Button actions
buttons.forEach((button, index) => {
    button.addEventListener("click", _ => doAction(index) )
});

function doAction(index) {
    let nextSong
    switch (index) {
        case 0:
            nextSong = currentSongIndex-1 < 0 ? 
                songList.length-1:currentSongIndex-1
            playSong(nextSong)
            break;
        case 1:
            switchPlayPause()
            break;
        case 2:
            nextSong = currentSongIndex+1 > songList.length-1 ? 
                0:currentSongIndex+1
            playSong(nextSong)
            break;
    
        default:
            break;
    }
}

// Song list actions
function loadSongs() {
    songList.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li")
        //  Crear a
        const link = document.createElement("a")
        // Hidratar a
        link.textContent = song.title
        link.href = "#"
        // Escuchar clicks en canciones
        link.addEventListener("click", _ => playSong(index))
        // Añadir a li
        li.appendChild(link)
        // Añadir li a ul
        songs.appendChild(li)
    })
    // Charge <a> elements
    links = document.querySelectorAll("a")
}


// Play function and utilities
function playSong(songIndex) {
    if (currentSongIndex == songIndex) {
        return
    }
    changeActiveSong(songIndex)
    currentSongIndex = songIndex
    title.textContent = songList[songIndex].title
    cover.src = "img/" + songList[songIndex].cover
    audio.src = "audio/" + songList[songIndex].file
    buttons[1].firstElementChild.className = "fas fa-pause"
    audio.play()
}

function changeActiveSong(newSongIndex) {
    if (currentSongIndex != undefined) {
        links[currentSongIndex].classList.remove("active")
    }
    links[newSongIndex].classList.add("active")
}

// Update the play/pause button
function switchPlayPause() {
    if (currentSongIndex == undefined) {
        return
    }
    if (audio.paused) {
        buttons[1].firstElementChild.className = "fas fa-pause"
        audio.play()
    } else {
        buttons[1].firstElementChild.className = "fas fa-play"
        audio.pause()
    }
}

// Progress bar

audio.addEventListener("timeupdate", updateProgressBar)

function updateProgressBar(event) {
    ratio = event.srcElement.currentTime/event.srcElement.duration
    progressBar.style.width = `${ratio*100}%`
}

progressContainer.addEventListener("click", setProgress)

function setProgress(event) {
    const ratio = event.offsetX/this.offsetWidth
    audio.currentTime = audio.duration * ratio
}

// Jump to next song automatically
audio.addEventListener("ended", _ => doAction(2))

// GO
loadSongs()

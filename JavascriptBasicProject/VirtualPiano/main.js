const pianoKeys = document.querySelectorAll('.key')

let audio = new Audio('./tunes/a.wav') // default source

const playTune = function(dataKey) {
    audio.src = `./tunes/${dataKey}.wav`
    audio.play()
}

pianoKeys.forEach(function(key) {
    key.onclick = function() {
        playTune(key.dataset.key)
        key.classList.add('active')
        setTimeout(function() {
            key.classList.remove('active')
        }, 150)
    }
})

document.onkeydown = function(e){
    playTune(e.key)
    pianoKeys.forEach(function(key) {
        if (key.dataset.key == e.key) {
            key.click()
        }
    }) 
}
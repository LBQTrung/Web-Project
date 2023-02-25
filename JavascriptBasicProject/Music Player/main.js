const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

const player = $('.player')
const cd = $(".cd")
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')

let app = { 
    songs :  [
        {
            name: "Dau co loi lam",
            singer: "Hà Anh Tuấn",
            path: "./assets/music/song1.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Weekend Has Come",
            singer: "Lezzon RMX",
            path: "./assets/music/song2.mp3",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Until I Found You",
            singer: "Stephen Sanchez",
            path:
                "./assets/music/song3.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "See You Again",
            singer: "Wiz Khalifa x Charlie Puth",
            path: "./assets/music/song4.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "At My Worst",
            singer: "Pink Sweat$",
            path: "./assets/music/song5.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "Until I Found You",
            singer: "Stephen Sanchez",
            path:
                "./assets/music/song3.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Dẫu Có Lỗi Lầm",
            singer: "Hà Anh Tuấn",
            path: "./assets/music/song1.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        }
    ],
    currentIndex: 2,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${this.currentIndex == index ? "active" : ""}", data-index = "${index}">
                <div class="thumb" style="background-image: url(${song.image})">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        }).join("")
        $(".playlist").innerHTML = htmls
    },

    handleEvents: function() {
        const _this = this
        document.onscroll = function() {
            const cdWidth = cd.offsetWidth
            document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCDWidth = cdWidth - scrollTop
                cd.style.width = newCDWidth > 0 ? newCDWidth + 'px' : '0px'
                cd.style.opacity = newCDWidth > 0 ? newCDWidth/cdWidth : 0
            }
        }
        // Handle CD rotate / static (!! Has bug duration only 10s)
        const cdThmbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'},
        ], {
            duration: 10000, // 10000 ms
            literation: Infinity
        })
        cdThmbAnimate.pause()

        // Handle when click play button
        playBtn.onclick = function() {
            if (_this.isPlaying){
                audio.pause()
                cdThmbAnimate.pause()
            } else {
                audio.play()
                cdThmbAnimate.play()
            }
        }
        // Handle play event
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
        }
        // Handle pause event
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
        }
        // Handle rewind song (!! Has bug)
        progress.onchange = function(e) {
            // Scale of input range is [0, 100]
            const seekTime = e.target.value / 100 * audio.duration
            audio.currentTime = seekTime
        }
        // Handle timeline of song
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent 
            }
        }
        // Handle next song
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.toRandomSong()
            } else {
                _this.toNextSong()
                // _this.scrollToActiveSong()
            }
            _this.scrollToActiveSong()
            audio.play()
        }
        // Handle prev song
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.toRandomSong()
            } else {
                _this.toPrevSong()
                _this.scrollToActiveSong()
            }
            audio.play()
        }
        // Handle random song
        randomBtn.onclick = function() {
            _this.isRandom = !(_this.isRandom)
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        // Handle end song
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        // Handle repeat song
        repeatBtn.onclick = function() {
            _this.isRepeat = !(_this.isRepeat)
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        // Listen click on playlist !! Has bug
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode) {
                _this.currentIndex = songNode.dataset.index
                _this.loadCurrentSong()
                audio.play()
            } else {
                // if (!e.target.closest('.options')) {
                //     console.log(e.target.closest('.song').dataset.index)
                // }
            }
        }
    },



    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
        let songList = $$('.song')
        songList.forEach(function(song) {
            if (song.classList.contains('active')) {
                song.classList.remove('active')
            }
        })
        songList[this.currentIndex].classList.add('active')

    },

    toNextSong: function() {
        this.currentIndex += 1
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    toPrevSong: function() {
        this.currentIndex -= 1
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length -1 
        }
        this.loadCurrentSong()
    },

    toRandomSong: function() {
        let randomIndex = Math.floor(Math.random() * (this.songs.length - 1))
        while (randomIndex == this.currentIndex) {
            randomIndex = Math.floor(Math.random() * (this.songs.length - 1))
        }
        this.currentIndex = randomIndex
        this.loadCurrentSong()
    },

    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView(
                {behavior: "smooth", block: "end", inline: "nearest"}
            )
        }, 500)
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    },

    start: function() {
        this.loadConfig()
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
    }
}
app.start()

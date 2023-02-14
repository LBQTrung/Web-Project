const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player')
const cd = $(".cd")
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn.btn-toggle-play')
const progress = $('#progress')
console.log(progress)

let app = { 
    songs :  [
        {
            name: "Dẫu Có Lỗi Lầm",
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
    currentIndex: 0,
    isPlaying: false,

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    render: function() {
        const htmls = this.songs.map((song) => {
            return `
            <div class="song">
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

        // Handle when click play button
        playBtn.onclick = function() {
            if (_this.isPlaying){
                audio.pause()
            } else {
                audio.play()
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
        // Handle timeline of song
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent 
            }
        }
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },

    start: function() {
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
    }
}
app.start()
console.log(app.currentSong)

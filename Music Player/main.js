const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

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
        document.onscroll = function() {
            const cd = $(".cd")
            const cdWidth = cd.offsetWidth
            document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCDWidth = cdWidth - scrollTop
                cd.style.width = newCDWidth > 0 ? newCDWidth + 'px' : '0px'
                cd.style.opacity = newCDWidth > 0 ? newCDWidth/cdWidth : 0
            }
        }
    },

    start: function() {
        this.handleEvents()
        this.render()
    }
}
app.start()

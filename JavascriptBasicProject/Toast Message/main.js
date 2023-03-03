function toast({title, message, type, duration = 3000}) {
    const main = document.getElementById('toast')
    if (main) {
        const toast = document.createElement('div')

        // Remove automatically
        const autoRemoveId = setTimeout(function() {
            main.removeChild(toast)
        }, duration + 1000)

        // Remove manually
        toast.onclick = function(e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast)
                clearTimeout(autoRemoveId)
            }
        }

        
        toast.classList.add('toast')
        toast.classList.add(`toast--${type}`)
        const delay = duration/1000
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`
        
        const icons = {
            success: "fa-solid fa-circle-check",
            info: 'fa-solid fa-circle-info',
            warning: 'fa-solid fa-circle-exclamation',
            error: 'fa-solid fa-circle-exclamation'
        }
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <div class="toast__msg">${message}</div>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>`
        main.appendChild(toast)
        
    }
}



const btnSuccess = document.querySelector('.btn.btn--success')
btnSuccess.onclick = function() {
    toast({
        title: 'Success',
        message: 'Có công mài sắt, có ngày nên kim phải không nhỉ?',
        type: 'success',
        duration: 1000
    })
}

const btnError = document.querySelector('.btn.btn--error')
btnError.onclick = function() {
    toast({
        title: 'Error',
        message: 'Có công mài sắt, có ngày nên kim phải không nhỉ?',
        type: 'error',
        duration: 1000
    })
}
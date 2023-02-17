// Validator funciton; future -> object contructor
function Validator(options) {
    // validate function when blur input element
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    var formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector)
            
            if (inputElement) {
                // Handle when blur 
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }
                
                // Handle when input
                inputElement.oninput = function() {
                    let errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

// Define rule
// When error => return error message
// When no error => undefined
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            // Remove space begin and end before check
            return value.trim() ? undefined : "Vui lòng nhập trường này"
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
            return regex.test(value) ? undefined : "Vui lòng nhập lại email"
        }
    }
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}
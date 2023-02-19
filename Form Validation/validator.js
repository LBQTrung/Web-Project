// Validator funciton; future -> object contructor
function Validator(options) {

    var selectorRules = {}
    // validate function when blur input element
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

        // Get rules of a selector
        // element of rules is test() function: rules[i]() == test()
        var rules = selectorRules[rule.selector]

        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
        return !errorMessage
    }

    var formElement = document.querySelector(options.form)
    if (formElement) {

        // Loop and validate all input element
        formElement.onsubmit = function(e) {
            // Prevent default when submit form
            e.preventDefault()

            var isFormValid = true
            options.rules.forEach(function(rule) {
                let inputElement = formElement.querySelector(rule.selector)
                let isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }
            })
            if (isFormValid) {
                // Submit with Javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs =  formElement.querySelectorAll('[name]:not([disable])')
                    var formValues = Array.from(enableInputs).reduce(function(accumulator, currentValue){
                        return {...accumulator, 
                            [currentValue.name] : currentValue.value
                        }
                    }, {})
                    options.onSubmit(formValues)
                // Submit with HTML default
                } else {

                }
                
            } else {
                console.log("Có lỗi")
            }

        }
        options.rules.forEach(function(rule) {
            // Save rule
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }
            

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
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            // Remove space begin and end before check
            return value.trim() ? undefined : message || "Vui lòng nhập trường này"
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
            return regex.test(value) ? undefined : message || "Vui lòng nhập lại email"
        }
    }
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}
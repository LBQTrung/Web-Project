function Validator(formSelector) {
    var formRules = {}
    var _this = this
    /**
     * Rule:
     * - Error return error message
     * - No error return undefined
     */
    var validatorRules = {
        required: function(value) {
            return value ? undefined : "Vui lòng nhập trường này"
        },
        email: function(value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
            return regex.test(value) ? undefined : "Trường này phải là email"
        },
        min: function(minLength) {
            return function(value) {
                return value.length >= minLength ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`
            }
        }
    }
    var formElement = document.querySelector(formSelector)
    if (formElement) {
        let inputs = formElement.querySelectorAll('input[name][rules]')
        Array.from(inputs).forEach(function(input) {
            let rules = input.getAttribute('rules').split('|')
            for (let rule of rules) {
                let validateRule = validatorRules[rule]
                if (rule.includes(':')) {
                    let ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                    validateRule = validatorRules[rule](ruleInfo[1])
                }
                if (formRules[input.name]) {
                    formRules[input.name].push(validateRule)
                } else {
                    formRules[input.name] = [validateRule]
                }
            }

            // Listen events (blur)
            input.onblur = handleValidate

            input.oninput = handleClearError
        })
        function handleValidate(event) {
            let rules = formRules[event.target.name]
            let errorMessage

            for (var rule of rules) {
                if (rule(event.target.value)) {
                    errorMessage = rule(event.target.value)
                    break
                }
            }

            // Output error message
            let messageElement = event.target.closest('.form-group').querySelector('.form-message')
            let formGroup = event.target.closest('.form-group')
            if (formGroup && messageElement) {
                if (errorMessage) {
                    formGroup.classList.add('invalid')
                    messageElement.innerText = errorMessage
                    messageElement.classList.add('invalid')
                } else {
                    formGroup.classList.remove('invalid')
                    messageElement.innerText = ''
                    messageElement.classList.remove('invalid')
                }
            }
            return !errorMessage
        }

        function handleClearError(event) {
            let formGroup = event.target.closest('.form-group')
            let messageElement = event.target.closest('.form-group').querySelector('.form-message')

            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid')
                messageElement.innerText = ''
                messageElement.classList.remove('invalid')
            }
        }

    }

    formElement.onsubmit = function(event) {
        event.preventDefault()
        let isFormValid = true
        
        let inputs = formElement.querySelectorAll('input[name][rules]')
        Array.from(inputs).forEach(function(input) {
            let isValid = true
            isValid = handleValidate({
                target: input
            })
            
            if (!isValid) {
                isFormValid = false
            }
        })

        

        if (isFormValid) {
            if (typeof _this.onSubmit === 'function') {
                var enableInputs =  formElement.querySelectorAll('[name]')
                var formValues = Array.from(enableInputs).reduce(function(values, input){
                    switch (input.type){
                        case 'radio':
                            if (input.matches(':checked')) {
                                values[input.name] = input.value
                            } 
                            break;
                        case 'checkbox':
                            if (input.matches(':checked')) {
                                if (values[input.name]) {
                                    values[input.name].push(input.value)
                                } else {
                                    values[input.name] = [input.value]
                                }
                            } 
                            break;
                        case 'file':
                            values[input.name] = input.files
                            break;
                        default:
                            values[input.name] = input.value
                    }
                    return values
                    }, {})
                _this.onSubmit(formValues)
            } else {
                formElement.submit()
            }
        } else {
            console.log('có lỗi')
        }
    }
}
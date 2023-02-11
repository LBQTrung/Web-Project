var courseApi = "http://localhost:3000/courses";


function start(){
    getCourses(renderCourses)
    handleCreateForm();
}

start()
var updateForm = document.querySelector(".update-form")
updateForm.classList.add("display-none")

function createCourse(data, callback){
    let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(courseApi, options)
        .then(function(response){
            return response.json()
        })
        .then(callback)
}

function handleCreateForm(){
    let createBtn = document.querySelector('.create')
    createBtn.onclick = function(){
        let name = document.querySelector('input[name="name"]').value
        let description = document.querySelector('input[name="description"]').value
        let formData = {
            name: name,
            description: description
        }
        createCourse(formData, function(){
            getCourses(renderCourses)
        })
    }
}

function getCourses(callback){
    fetch(courseApi)
        .then(function(response){
            return response.json()
        })
        .then(callback)
}

function renderCourses(courses){
    let coursesListElement = document.querySelector("#courses-list")
    let html = courses.map(function(course){
        return `<li class = "course-item course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button id ="delete-btn" style = "cursor: pointer"
                onclick = "handleDeleteCourse(${course.id})">X</button>
            <button id ="update-btn" onclick = "handleUpdateCourse(${course.id})" 
                style = "cursor: pointer">Update</button>
        </li>`
    })
    coursesListElement.innerHTML = html.join("")
}

function deleteCourse(id) {
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(courseApi + "/" + id, options)
        .then(function(response){
            return response.json()
        })
        .then(callback)
}

function handleDeleteCourse(id) {
    var courseItem = document.querySelector(".course-item-" + id)
    if (courseItem) {
        courseItem.remove()
    }
    deleteCourse(id)
}

//  Method update data
function updateCourse(id, data, callback) {
    options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }
    fetch(courseApi + "/" + id, options)
        .then(function(response) {
            return response.json()
        })
        .then(callback)
}

function handleUpdateCourse(id) {
    updateForm.classList.toggle("display-none")
    let updateBtn = document.querySelector(".update-btn")
    updateBtn.onclick = function() {
        let name = document.querySelector(".update-name").value
        let description = document.querySelector(".update-desc").value
        let data = {
            name: name,
            description: description
        }
        updateCourse(id, data, function(){
            getCourses(renderCourses)
        })
        document.querySelector(".update-name").value = ""
        document.querySelector(".update-desc").value = ""
        updateForm.classList.toggle("display-none")
    }
}
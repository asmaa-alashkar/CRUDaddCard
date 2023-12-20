let title = document.getElementById("courseTitle");
let imageURL = document.getElementById("courseImage");
let description = document.getElementById("courseDescription");
let submit = document.getElementById("submitBtn");
let deleteAll = document.getElementById("deleteBtn");
let mode = "create";
let tempIndex;
let courses;
if (localStorage.coursesList != null) {
    courses = JSON.parse(localStorage.coursesList);
} else {
    courses = [];
}
submit.addEventListener("click", function () {
    if (title.value == "" || imageURL.value == "" || description.value == "") {
        alert("Insert Data First!");
    } else {
        let course = {
            title: title.value,
            imageURL: imageURL.value,
            description: description.value
        }
        if (mode == "create") {
            courses.push(course);
        } else {
            courses[tempIndex] = course;
            mode = "create";
            submit.innerHTML = "Create";
            submit.classList.remove("btn-success");
            submit.classList.add("btn-primary");
        }
        localStorage.setItem("coursesList", JSON.stringify(courses));
        makeCard(courses);
    }
});

function makeCard(list) {
    let card = '';
    for (let i = 0; i < list.length; i++) {
        card += `
            <div class="card mb-5 col-sm-12 col-md-6 col-lg-4" style="width: 18rem;">
                <img src="${list[i].imageURL}" class="card-img-top" alt="${list[i].title} Image">
                <div class="card-body">
                    <h5 class="card-title">${list[i].title}</h5>
                    <p class="card-text">${list[i].description}</p>
                    <div class="row d-flex justify-content-around">
                        <button onclick="updateCourse(${i})" id="editBtn" class="btn btn-warning col-5">Edit</button>
                        <button onclick="deleteCourse(${i})" id="deleteBtn" class="btn btn-danger col-5">Delete</button>
                    </div>
                </div>
            </div>`
    }
    let coursesOut = document.getElementById("courses");
    coursesOut.innerHTML = card;
}
makeCard(courses);
function updateCourse(card) {
    tempIndex = card;
    title.value = courses[card].title;
    imageURL.value = courses[card].imageURL;
    description.value = courses[card].description;
    submit.innerHTML = "Update";
    submit.classList.remove("btn-primary");
    submit.classList.add("btn-success");
    scroll(
        {
            top: 0,
            behavior: "smooth"
        }
    )
    mode = "update"
}
function deleteCourse(card) {
    courses.splice(card, 1);
    localStorage.setItem("coursesList", JSON.stringify(courses));
    makeCard(courses);
}
deleteAll.onclick = function () {
    localStorage.clear();
};
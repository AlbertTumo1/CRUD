const name = document.getElementById("name");
const age = document.getElementById("age");
const email = document.getElementById("email");
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", submitForm);

function submitForm() {
    fetch("http://localhost:3000/add-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name.value, age:age.value, email:email.value})        
    })
}
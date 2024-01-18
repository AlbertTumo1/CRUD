const name = document.getElementById("name");
const age = document.getElementById("age");
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", submitForm);

async function submitForm() {
    fetch("http://localhost:3000/add-name", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name.value, age:age.value})        
    })
}
const name = document.getElementById("name");
const price = document.getElementById("price");
const image = document.getElementById("image");
const uuid = document.getElementById("uuid");
const description = document.getElementById("description");

const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", createProduct);

function createProduct() {
    fetch("http://localhost:3000/add-product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name.value, price: price.value, image: image.value, uuid: uuid.value, description: description.value})
    });
}

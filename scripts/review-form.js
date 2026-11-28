const productSelect = document.querySelector("#product");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (productSelect) {
    products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        productSelect.append(option);
    });
}

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

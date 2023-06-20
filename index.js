document.addEventListener("DOMContentLoaded", updateList)

function updateList() {
  const ul = document.getElementById("ul")
  axios
    .get("https://crudcrud.com/api/23d573681b494844b390a465f5459b77/ershad")
    .then((res) => {
      let total = 0
      ul.innerHTML = ""
      res.data.forEach((element, index) => {
        const price = parseInt(element.price)
        const name = element.name
        const pIndex = `I-${index}`
        const li = document.createElement("li")
        li.textContent = `${price}-${name}`
        const delButton = document.createElement("input")
        delButton.setAttribute("type", "button")
        delButton.setAttribute("value", "Delete Product")
        delButton.setAttribute("onclick", `deleteProduct('${pIndex}')`)
        delButton.setAttribute("class", "m-2")

        li.appendChild(delButton)
        ul.appendChild(li)
        total = total + price
      })
      console.log(total)
      return new Promise((res, rej) => {
        res(total)
      })
    })
    .then((total) => {
      console.log(total)
      const tota = document.getElementById("total")
      tota.textContent = total
    })
    .catch((err) => console.log(err))
}

function addProduct() {
  const pprice = document.getElementById("pprice").value
  const pname = document.getElementById("pname").value
  let obj = {
    price: pprice,
    name: pname,
  }
  axios
    .post(
      "https://crudcrud.com/api/23d573681b494844b390a465f5459b77/ershad",
      obj
    )
    .then(() => updateList())
    .catch((err) => console.log(err))
}

function deleteProduct(index) {
  const ind = index.split("-")[1]

  axios
    .get("https://crudcrud.com/api/23d573681b494844b390a465f5459b77/ershad")
    .then((res) => {
      const idToDelete = res.data[ind]._id
      axios
        .delete(
          "https://crudcrud.com/api/23d573681b494844b390a465f5459b77/ershad/" +
            `${idToDelete}`
        )
        .then(() => updateList())
    })
}

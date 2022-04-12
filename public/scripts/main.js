import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDesc = document.querySelector('.modal p')
const modalActionButton = document.querySelector('.modal button')

const getCheckmark = document.querySelectorAll(".actions a.check")

const getTrashBin = document.querySelectorAll(".actions a.delete")

// "escutar" o botao de marcar como lido
getCheckmark.forEach(button => {
  button.addEventListener("click", handleClick)
})

// "escutar" o botao de excluir
getTrashBin.forEach(button => {
  button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true){
  event.preventDefault()
  const text = check ? "Marcar como lida" : "Excluir"

  const slug = check ? "check" : "delete"

  const roomId = document.querySelector("#room-id").dataset.id
  const questionId = event.target.dataset.id

  const form = document.querySelector(".modal form")
  form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

  modalTitle.innerHTML = `${text} esta pergunta?`
  modalDesc.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
  modalActionButton.innerHTML = `Sim, ${text.toLowerCase()}`
  check ? modalActionButton.classList.remove("red") : modalActionButton.classList.add("red")

  modal.open()
}
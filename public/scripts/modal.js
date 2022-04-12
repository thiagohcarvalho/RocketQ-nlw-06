export default function Modal() {

  const getModalWrapper = document.querySelector('.modal-wrapper')

  const cancelButton = document.querySelector('.button.cancel')

  cancelButton.addEventListener("click", close)

  function open() {
    getModalWrapper.classList.add("active")
  }

  function close() {
    getModalWrapper.classList.remove("active")
  }
    
  return {
    open, close
  }
}
export const openModal = () => {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement
    if (modal) {
      modal.showModal()
    }
  }
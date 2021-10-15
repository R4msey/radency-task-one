import { Notes } from './note.js'
import { optionData } from '../data/data.js'

const modalWraper = document.querySelector('#modal')

class Modal {
  openModal = (currentNote, data, index) => {
    const containerModal = document.createElement('div')

    modalWraper.style = 'visibility: visible'
    containerModal.classList = 'container-modal'
    containerModal.innerHTML = `
    <div id="container-modal">
      <div class='header-modal'>
        <h1>${data ? 'Change Note' : 'Create Note'}</h1> 
        <button id="close">X</button>
      </div>
      <div class="container-input">
        <span>Name</span>
        <input class="input" type="text" id="inputName" value="${
          data ? data.name : ''
        }">
      </div>
      <div class="container-input">
        <span>Category</span>
        <select class="input" name="select" id="inputCategory">
          ${optionData.map(
            (item) => `
            <option 
              value="${item.name}" 
              ${data?.category === item.name ? 'selected' : null}
            >
            ${item.name}
            </option>`
          )}
        </select>
      </div>
      <div class="container-input">
        <span>Content</span>
        <input class="input" type="text" id="inputContent" value="${
          data ? data.content : ''
        }">
      </div>
      <div class="container-input">
        <span>Dates</span>
        <input class="input" type="text" id="inputDates" value="${
          data ? data.dates : ''
        }">
      </div>
      <button id="save" style="margin-top: 10px;">Save</button>
    </div>`

    modalWraper.appendChild(containerModal)

    document
      .querySelector('#close')
      .addEventListener('click', () => this.closeModal())
    document
      .querySelector('#save')
      .addEventListener('click', () => this.saveData(currentNote, data, index))
  }

  closeModal = () => {
    modalWraper.style = 'visibility: hidden'
    modalWraper.innerHTML = ''
  }

  saveData = (currentNote, data, index) => {
    const categoryValue = document.querySelector('#inputCategory').value

    const newNote = {
      name: document.querySelector('#inputName').value,
      created: data
        ? data.created
        : new Date().toLocaleString('en-us', {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
          }),
      category: categoryValue,
      content: document.querySelector('#inputContent').value,
      dates: document.querySelector('#inputDates').value,
      avatar: optionData.filter((i) => i.name === categoryValue)[0].avatar,
    }
    if (data) {
      currentNote.currentList.splice(index, 1, newNote)
    } else {
      currentNote.push(newNote)
    }

    Notes.render()
    this.closeModal()
  }
}

export const modal = new Modal({})

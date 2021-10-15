import { activeData } from './module/data/data.js'
import { modal } from './module/classes/modal.js'
import { category } from './module/classes/category.js'
import { Notes } from './module/classes/note.js'

category.render()
Notes.render()

console.log(Notes)

const clickOnNote = (event, currentNote) => {
  const data = event.target.dataset
  switch (data.name) {
    case 'edit':
      modal.openModal(
        currentNote,
        currentNote.currentList[data.index],
        data.index
      )
      break
    case 'move':
      currentNote.moveRow(data.index)
      Notes.render()
    case 'trash':
      currentNote.removeRow(data.index)
    default:
      return
  }
}
document
  .querySelector('#changeList')
  .addEventListener('click', () => Notes.switchData())
document
  .querySelector('#tbody')
  .addEventListener('click', (event) => clickOnNote(event, Notes))
document
  .querySelector('#create-note')
  .addEventListener('click', () => modal.openModal(activeData))

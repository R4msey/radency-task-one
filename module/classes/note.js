import { activeData, archivedData, optionData } from '../data/data.js'
import { category } from './category.js'
class Note {
  constructor(options) {
    this.row = options.row
    this.passTo = options.passTo
    this.nameClass = options.nameClass
    this.currentList = this.row
    this.selectror = false
  }

  initialNote = (data, index) => {
    const row = document.createElement('tr')
    row.classList = 'trBody'
    row.innerHTML = `
    <td width='45px'>
      <div class="container-avatar">
        <img class="avatar" src="${
          optionData.filter((item) => item.name == data.category)[0].avatar
        }"/>
      </div>
    </td>
    <td class="text">${data.name}</td>
    <td>${data.created}</td>
    <td>${data.category}</td>
    <td>${data.content}</td>
    <td>${data.dates}</td>
    <td>
      <img class="icon" data-index='${index}' data-name="edit" src="images/icons/pencil.png">
      <img class="icon" data-index='${index}' data-name="move" data-index="${index}" src="images/icons/save-gray.png">
      <img class="icon" data-index='${index}' data-name="trash" src="images/icons/trash-gray.png">
    </td>`

    document.querySelector('#tbody').appendChild(row)
  }

  render = () => {
    document.querySelector('#tbody').innerHTML = ''
    this.currentList.forEach((item, index) => this.initialNote(item, index))
    category.render()
  }

  switchData = () => {
    this.selector = !this.selector
    this.currentList = this.selector ? this.passTo : this.row
    this.render()
  }

  removeRow = (index) => {
    this.currentList.splice(index, 1)
    this.render()
  }

  moveRow = (index) => {
    this.selector
      ? this.row.push(this.currentList[index])
      : this.passTo.push(this.currentList[index])
  }

  addRow = () => {
    this.row.push(newObject)
    this.render()
  }
}

export const Notes = new Note({
  row: activeData,
  passTo: archivedData,
  nameClass: 'activeNote',
})

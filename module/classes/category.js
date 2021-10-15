import { array, optionData } from '../data/data.js'

class Category {
  layout = (data) => {
    const note = document.createElement('tr')
    note.classList = 'trBody'
    note.innerHTML = `
      <td width='45px'>
        <div class="container-avatar">
          <img class="avatar" src="${
            optionData.filter((item) => item.name == data.name)[0].avatar
          }"/>
        </div>
      </td>
      </td>
      <td class="text">${data.name}</td>
      <td>${data.active || 0}</td>
      <td>${data.archived || 0}</td>
      <td></td>`

    document.querySelector('#sortNotes').appendChild(note)
  }

  render = () => {
    document.querySelector('#sortNotes').innerHTML = ''

    const data = JSON.parse(JSON.stringify(array))

    data.map((item) =>
      item.data.forEach((data) => {
        return (item.newData[data.category] =
          (item.newData[data.category] || 0) + 1)
      })
    )
    data
      .map((i) => Object.keys(i.newData))
      .map((item, ind) =>
        item.map((item, index) =>
          ind === 0
            ? {
                name: item,
                active: Object.values(data[ind].newData)[index],
              }
            : {
                name: item,
                archived: Object.values(data[ind].newData)[index],
              }
        )
      )
      .flat()
      .reduce((m, o) => {
        let found = m.find((p) => p.name === o.name)
        found ? Object.assign(found, o) : m.push(o)
        return m
      }, [])
      .forEach((item) => this.layout(item))
  }
}

export const category = new Category({})

export const tableBody = document.querySelector('.table-body')

export function sortColumn(columnIndex, order) {
  const tableRows = tableBody.querySelectorAll('tr')

  //sort
  const sortedRows = [...tableRows].sort((a, b) => {
    if (
      !isNaN(a.children[columnIndex].innerHTML) &&
      !isNaN(b.children[columnIndex].innerHTML)
    ) {
      if (order === 'asc') {
        return (
          a.children[columnIndex].textContent -
          b.children[columnIndex].textContent
        )
      } else if (order === 'desc') {
        return (
          b.children[columnIndex].textContent -
          a.children[columnIndex].textContent
        )
      }
    } else if (
      isNaN(a.children[columnIndex].innerHTML) &&
      isNaN(b.children[columnIndex].innerHTML)
    ) {
      if (order == 'asc') {
        return a.children[columnIndex].textContent.localeCompare(
          b.children[columnIndex].textContent
        )
      } else if (order == 'desc') {
        if (
          a.children[columnIndex].textContent >
          b.children[columnIndex].textContent
        ) {
          return -1
        } else if (
          b.children[columnIndex].textContent >
          a.children[columnIndex].textContent
        ) {
          return 1
        } else {
          return 0
        }
      }
    }
  })

  //fill the tableBody
  tableBody.innerHTML = ''
  sortedRows.forEach((e) => {
    tableBody.innerHTML += e.outerHTML
  })
}

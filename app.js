const $list = document.getElementById('list')
const $search = document.getElementById('search')
const $query = document.getElementById('query')
const $card = document.getElementById('card')
const $property = document.getElementById('property')

function updateList (clients) {
  if (typeof list === 'function') {
    if (typeof order === 'function') {
      clients = order(clients, $property.value)
    } else {
      console.error('The order() function is not defined. The order() function should return a sorted array which has been sorted based on the passed property. The order() method should be used on the passed array.')
    }

    const html = list(clients)

    if (typeof html === 'string') {
      if (typeof total === 'function') {
        const balance = total(clients)
        if (typeof balance === 'number') {
          $list.innerHTML = html + `<li class="list-group-item  d-flex justify-content-between"><strong>TOTAL</strong><strong>$ ${balance.toFixed(2)}</stron></li>`
        } else {
          console.error(`The total() function is not returning the correct value. The total() function should return a number containing total balance value every client in the pass array. The reduce() method should be used. Instead, "${balance}" was returned.`)
        }
      } else {
        console.error('The total() function is not defined. The total() function should return a number containing total balance value every client in the pass array. The reduce() method should be used.')
        $list.innerHTML = html
      }
    } else {
      console.error(`The list function is not returning the correct value. The list() functions should return an HTML string created from the passed array. The map() function should be used on passed array. Instead, an "${typeof html}" was returned.`)
    }
  } else {
    console.error('The list() function is not defined. The list() function should return an HTML string created from the passed array. The map() function should be used on passed array.')
  }
}

function getSearch () {
  if (typeof search === 'function') {
    const results = search($query.value)
    if (Array.isArray(results)) {
      updateList(results)
    } else {
      console.error(`The search() function is not returning the correct value. The search() function should return an array which contains only those clients whose names include the passed value. The filter() method should be used on the clients array. Instead, "${results}" was returned.`)
    }
  } else {
    console.error('The search() function is not defined. The search() function should return an array which contains only those clients whose names include the passed value. The filter() method should be used on the clients array.')
  }
}

$list.addEventListener('click', function (e) {
  if (e.target.classList.contains('list-group-item')) {
    if (typeof info === 'function') {
      const contact = info(parseInt(e.target.dataset.index))

      if (typeof contact === 'object') {
        $card.innerHTML = `<div class="card my-3 position-fixed w-25">
          <div class="card-header">${contact.name}</div>
          <div class="card-body">
            <p>${contact.email}</p>
            <p>${contact.phone}</p>
            <p><strong>$ ${contact.balance}</strong></p>
          </div>
        </div>`
      } else {
        console.error(`The info() function is not returning the correct value. The info() function should return a single client object using the find() method. "${contact}" was returned instead.`)
      }
    } else {
      console.error('The info() function is not defined. The info() function should return a single client object using the find() method on the clients array.')
    }
  }
})

$search.addEventListener('submit', function (e) {
  e.preventDefault()
  getSearch()
})

$query.addEventListener('keyup', function (e) {
  getSearch()
})

$property.addEventListener('change', function (e) {
  updateList(clients)
})

updateList(clients)

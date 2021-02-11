function list (clients) {
  const html = clients.map(client => {
    return `<li class="list-group-item d-flex justify-content-between" data-index= "${client.index}" >
    ${client.name}
    <strong> ${client.balance} </strong>
    </li>`
  })
  return html.join(' ')
}


function search (query) {
  return clients.filter(client =>  client.name.toLowerCase().indexOf(query) > -1) 
}


 function order (clients, property){
   return clients.sort((clientA, clientB) =>{
      if(clientA[property] < clientB[property]){
        return -1
      } else if (clientA[property] > clientB[property]){
        return 1
      } else{
        return 0
      }
    })
  }


function total (clients) {
  return clients.reduce((total, client) => total += client.balance, 0 )
}

function info (index){
  return clients.find(client => client.index == index)
}
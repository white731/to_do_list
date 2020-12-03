
 let state = {
  websiteTitle: "The To-Do list Application",
  websiteSubTitle: "Your one stop shop for marking off To-Do list items!",
  list: [],
  errorOccured: false,
  errorMessage: "",
  errorStatus: "",
  loadList: false,
  showListButton: true,
  printList: false,
}


  const printList = () => {
    console.log ("list printed")
    return `<div>This is like a list shining brightly</div>`
  }

  const loadList = () => {
    state.loadList = true
    
    axios.get("https://jsonplaceholder.typicode.com/todos")
  .then(function (response) {
    // handle success
    console.log(response);
    if (state.loadList){
      state.list = response.data
    }
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    state.errorOccured = true;
    state.errorMessage = error.message;
    state.errorStatus = error.response.status;
  })
  .then(function () {
    // always executed
  });

  state.showListButton = false
  state.printList = true
  printList()
  render()
    }


  const render = () => {
    let root = document.getElementById("root").innerHTML
    let htmlString = `<div class = container>`
    htmlString += `
    <h1>${state.websiteTitle}</h1>
    <h5>${state.websiteSubTitle}</h5>`
    if (state.showListButton) {
    htmlString +=`<a onclick = "loadList()" class="waves-effect green lighten-1 btn">View List</a>`
    }
    if (state.printList) {
      htmlString += printList()
    }
    htmlString += `</div>`
    return document.getElementById("root").innerHTML  = htmlString
  }

  render()

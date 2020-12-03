
 let state = {
  websiteTitle: "The To-Do list Application",
  websiteSubTitle: "Your one stop shop for marking off To-Do list items!",
  list: [],
  errorOccured: false,
  errorMessage: "",
  errorStatus: "",
  showListButton: true,
  printList: false,
  loading:false,
  completedLoading:false
}


  const printList = () => {
    console.log ("list printed")
    return state.list.map((item)=> 
    `<div>
    Item Title: ${item.title}
    <p>
    <label>
      <input type="checkbox" class="filled-in" checked="${item.completed ? "checked":"unchecked"}" />
      <span>Completed</span>
    </label>
    </p>
    </div>`
    )
  }

  const loading = () => {
    return `Loading`
  }

  const error = () => {
    return `
    <div>
    <h3>${state.errorMessage}</h4>
    <h5>Error Code: ${state.errorStatus}</h5>
    <a onclick = "loadList()" class="waves-effect green lighten-1 btn">Try Again</a>
    </div>`
  }

  const loadList = () => {
    state.loading = true

    axios.get("https://jsonplaceholder.typicode.com/todos")
  .then(function (response) {
    // handle success
    console.log(response);
    state.list = response.data
    state.loading = false
    state.errorOccured = false
    state.completedLoading = true
    state.printList = true
    render()
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    state.errorOccured = true;
    state.loading = false
    state.errorMessage = error.message;
    state.errorStatus = error.response.status;
    render()
  })
  .then(function () {
    // always executed
  });

  if (state.loading){
    render()
  }
  if (state.errorOccured) {
    render()
  }

  state.showListButton = false
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
    if (state.errorOccured) {
      htmlString += error()
    }
    if (state.loading) {
      htmlString += loading()
    }
    htmlString += `</div>`
    return document.getElementById("root").innerHTML  = htmlString
  }

  render()

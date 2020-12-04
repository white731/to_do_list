
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
  completedLoading:false,
  filterChecked:false,
  filterUnChecked:false,
  listToUse: []
}

  const filterChecked = () => {
    state.filterUnChecked = false
    state.filterChecked = true
    render()

  }

  const filterUnChecked = () =>{
    state.filterChecked = false
    state.filterUnChecked = true
    render()
  }

  const showAll = () => {
    state.filterChecked = false
    state.filterUnChecked = false
    render()
  }

  const setCheckMarkValue = () =>{

  }

  const sortListbyTitle = () => {

  }

  const printList = () => {
    console.log ("list printed")
    let htmlString = `
    <a onclick = "filterChecked()" class="waves-effect green lighten-1 btn">Filter Checked</a>
    <a onclick = "filterUnChecked()" class="waves-effect green lighten-1 btn">Filter UnChecked</a>
    <a onclick = "showAll()" class="waves-effect green lighten-1 btn">Show All</a>
    <br>
    `
   
    if (state.filterChecked == true && state.filterUnChecked == false) {
      state.listToUse = state.list.filter((item) => item.completed != false)
    } else if (state.filterUnChecked == true && state.filterChecked == false) {
      state.listToUse = state.list.filter((item) => item.completed != true)
    } else {
      state.listToUse = state.list
    }

    htmlString += state.listToUse.map((item)=> 
    
    `<div>
    <p>Item Title: ${item.title}</p>
    <p>Item ID: ${item.id}</p>

    <p>
    <label>
      <input id=${item.id} type="checkbox" class="filled-in" ${item.completed ? "checked":""}/>
      <span>${item.completed}</span>
    </label>
    </p>
    </div>`
    )
    return htmlString
  }

  const loading = () => {
    return `Loading`
  }

  const error = () => {
    return `
    <div>
    <h3>${state.errorMessage}</h4>
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
    
    state.printList = false
    state.loading = false
    state.errorOccured = true;
    state.loading = false
    state.errorMessage = error.message;
    // state.errorStatus = error.response.status;
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

//
// ────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S C R I P T   F O R   T O D O   A P P : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────
//
//
// ─── ACCESSING TAG ──────────────────────────────────────────────────────────────
//
// main input menu
const taskInput = document.getElementById("taskInput");
// add button
const addTask = document.getElementById("addTask");

//UL
const ul = document.querySelector("ul");

//checkbox
const checkbox = document.getElementById("checkbox");
// filter button
const filterBtns = document.querySelectorAll(".filter");
const filterInput = document.getElementById("filterInput");
// clear all button
const clearAll = document.getElementById('clearAll');


// delete button 
const dltBtn = document.querySelector('#delete');


// Filter events
filterBtns.forEach(function(filterBtn) {
  filterBtn.addEventListener("click", filterList);
});
filterInput.addEventListener("keyup", filterByInput);

// Add task events
addTask.addEventListener("click", addingList);
//adding favorite button working 
ul.addEventListener('click', toggleFav);
// delete event
ul.addEventListener('click', deleteList);
// delete list by checkbox 
dltBtn.addEventListener('click', deleteChecked);
// Clearn all button events
clearAll.addEventListener('click', clearAllList);

//
// ─── ADD TASK LIST FUNCTION ─────────────────────────────────────────────────────
//

function addingList() {
  // console.log("working");
  // console.log(favBtns);
  let val = taskInput.value.trim();

  if (val === "") {
   showNotification("Input can not be empty");
  } else {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.innerHTML = ` <input type="checkbox" class="checkbox"> |
  <a href="#" class=" btn text-secondary favBtn" data = "all" title = "Add to Favourite">
    <i class=" fas fa-heart mx-2 d-inline-block"></i>
  </a>
  |
  <span class="listText ml-2 lead">${val.toUpperCase()}</span>
  <button class=" close">&times;</button>`;
    // console.log(li);
    ul.appendChild(li);
    taskInput.value = '';
    // Set localStorage to store the list item
    storeTaskInLocalStorage();
  }
}
//
// ─── NOTIFICATION FUNCTION ──────────────────────────────────────────────────────
//

  
function showNotification(mes, type = false) {
  //checking the type of class list should be added true for success and false for errror
  const clName = type === false ? "alert alert-danger fixed-top m-2 col-2" : "alert alert-success fixed-top m-2 col-2";
  // creating element for notification
  const noti = document.createElement("div");
  //adding class Name
  noti.className = clName;
  // adding text in notification
  noti.textContent = mes;
  //inserting the notification in the DOM
  document.body.appendChild(noti);
  //fading out notification after 3 sec
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
}
//
// ─── FILTER  LIST FUNCTION ──────────────────────────────────────────────────────
//

  
function filterList() {
  console.log("filter working");
  console.log(this.getAttribute("data") === "fav");
  const favBtns = document.querySelectorAll('.favBtn');
  const targetData = this.getAttribute('data');
  console.log(favBtns.length);
  if(favBtns.length === 0) {
    showNotification('There is no list to filter');
  }else {
    console.log(this.getAttribute('data'));
    favBtns.forEach(el=> {
      // console.log(el.getAttribute('data'));
      if(targetData === 'fav') {
        if(el.getAttribute('data') === 'fav' ){
          // console.log('inside of the filter');
          el.parentElement.style.display = 'block';
        }else {
          el.parentElement.style.display = 'none';
  
        }

      }else {
        el.parentElement.style.display = 'block';
      }

    });
  }
}
//
// ─── FILTER BY INPUT ────────────────────────────────────────────────────────────
//

  
function filterByInput() {
  re = new RegExp(this.value, "i");
  console.log(re);
  // console.log(this.value);

  const list = document.querySelectorAll("li");
  list.forEach(el => {
    // console.log(this.value);
    console.log(el.textContent.indexOf(this.value));
    if (re.test(el.textContent)) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
}

//
// ─── CHECKBOX EVENT ─────────────────────────────────────────────────────────────
//

checkbox.addEventListener("change", function() {
  if (this.checked) {
    console.log("working");
    document.querySelectorAll(".checkbox").forEach(function(el) {
      el.checked = true;
    });
  } else {
    document.querySelectorAll(".checkbox").forEach(function(el) {
      el.checked = false;
    });
  }
});

//
// ─── STORING IN THE LOCALSTORAGE ────────────────────────────────────────────────
//

  function storeTaskInLocalStorage() {
    console.log('localstorage');
  }

  // toggle favourite function
  function toggleFav(e) {
    // console.log(e.target);
    // console.log(e.target.parentElement.parentElement);
    if(e.target.classList.contains('favBtn') || e.target.parentElement.parentElement.classList.contains('favBtn')) {
      console.log('fav is working');
      if(e.target.classList.contains('favBtn')){
        if(e.target.classList.contains('text-danger')){
          e.target.classList.remove('text-danger');
          e.target.setAttribute('data','all');
        }else{
          e.target.classList.add('text-danger');
          e.target.setAttribute('data','fav');
        }
      }else{
        // Going to parent element to the fav btn 
        if(e.target.parentElement.parentElement.classList.contains('text-danger')){
          e.target.parentElement.parentElement.classList.remove('text-danger');
          e.target.parentElement.parentElement.setAttribute('data','all');
        }else{
          e.target.parentElement.parentElement.classList.add('text-danger');
          e.target.parentElement.parentElement.setAttribute('data','fav');
        }
      }

    }
    // e.preventDefault();
  }

  //
  // ─── DELETING FUNCTION ──────────────────────────────────────────────────────────
  //

  function deleteList(e) {
    // console.log('working delete list', e.target.parentElement)
    if(e.target.classList.contains('close')) {
      e.target.parentElement.remove();
    }
  }

  //
  // ─── DELETING CHECKED ───────────────────────────────────────────────────────────
  //

  function deleteChecked() {
    document.querySelectorAll(".checkbox").forEach(function(el) {
      if(el.checked === true) {
        // console.log(el.parentElement);
        el.parentElement.remove();
      }else {
        showNotification("You haven't selected any list");
      }
    });
  }
  // Clear all function
  function clearAllList() {
    ul.innerHTML = '';
  }
    
const form = document.querySelector("#userData");
const ul = document.querySelector("#list");

// Get the data from user
const getDataFromUser = (event) => {
  const username = event.target.username.value;
  const age = event.target.age.value;
  const status = event.target.status.checked;
  const id = Date.now();

  return { username, age, status, id };
};

// save the user data to local storage
const writeInLocalStorage = (data) => {
  localStorage.setItem("users", JSON.stringify(data));
};

// read all users from localstorage
const readFromLocalStorage = (dataType = "json", storageKey = "users") => {
  if (dataType == "json") {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey));
      if (!data) throw Error();
      return data;
    } catch (error) {
      return [];
    }
  }
};

// delete fuction
const removeUserFromStorage = (userId) => {
  const updatedUsersList = allUsers.filter((user) => user.id != userId);
  writeInLocalStorage(updatedUsersList);
};

// Update user status
const updateStatus = (userId) => {
  allUsers.forEach((user) => {
    if (user.id == userId) user.status = !user.status;
  });
  writeInLocalStorage(allUsers);
};

// create button
const btn = (btnName) => {
  const btn = document.createElement("button");
  btn.className = btnName;
  btn.innerText = btnName;
  return btn;
};

// create li element
const li = (user) => {
  const li = document.createElement("li");
  const name = document.createElement("span");
  const age = document.createElement("span");
  const status = document.createElement("button");
  li.setAttribute("user_id", user.id);
  name.innerText = `Name: ${user.username}`;
  age.innerText = `, Age: ${user.age}`;
  status.innerText = user.status ? " active " : " inactive";
  status.className = "update";

  const deleteBtn = btn("delete");

  li.appendChild(name);
  li.appendChild(age);
  li.appendChild(status);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
};

// read data from local storage
let allUsers = readFromLocalStorage();

// create an event listener to submit a new user
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUserData = getDataFromUser(e);

  // add new user to all users list
  allUsers.push(newUserData);

  // add new list of users to localstorage
  writeInLocalStorage(allUsers);

  allUsers = readFromLocalStorage();

  location.reload();
});

//--- show all users in list
allUsers.forEach((user) => {
  li(user);
});

// delete
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    removeUserFromStorage(e.target.parentElement.getAttribute("user_id"));
    e.target.parentElement.remove();
  }
});

// update the user status

ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("update")) {
    updateStatus(e.target.parentElement.getAttribute("user_id"));
  }
  location.reload();
});

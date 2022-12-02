const form = document.querySelector("#userData");
const ul = document.querySelector("#list");

class User {
  // Get data from form
  constructor(event) {
    this.username = event.target.username.value;
    this.age = event.target.age.value;
    this.status = event.target.status.checked;
    this.id = Date.now();
  }

  // Read Data from local Storage
  static readFromLocalStorage = function (
    dataType = "json",
    storageKey = "users"
  ) {
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

  // write Data from local storage
  static writeInLocalStorage = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  };

  // remove user data
  static removeUserFromStorage = (userId) => {
    const updatedUsersList = allUsers.filter((user) => user.id != userId);
    writeInLocalStorage(updatedUsersList);
  };

  // update status for user
  static updateStatus = (userId) => {
    allUsers.forEach((user) => {
      if (user.id == userId) user.status = !user.status;
    });
    writeInLocalStorage(allUsers);
  };

  // create li
  static li = function (user) {
    const li = document.createElement("li");
    li.classList.add("item");
    const name = document.createElement("span");
    const age = document.createElement("span");
    const status = document.createElement("button");
    li.setAttribute("user_id", user.id);
    name.innerText = `Name: ${user.username}`;
    age.innerText = `, Age: ${user.age}`;
    status.innerText = user.status ? " active " : " inactive";
    status.className = "update";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerText = "delete";

    li.appendChild(name);
    li.appendChild(age);
    li.appendChild(status);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  };
}

let allUsers = User.readFromLocalStorage();

allUsers.forEach((user) => User.li(user));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // create new user
  const newUser = new User(e);
  console.log(newUser);

  //clean inputs
  e.target.elements.age.value = "";
  e.target.elements.username.value = "";

  //save new user in localstorage
  allUsers.push(newUser);
  User.writeInLocalStorage(allUsers);

  // get all users
  allUsers = User.readFromLocalStorage();

  // show data in browser
  ul.innerHTML = "";
  allUsers.forEach((user) => User.li(user));
});

// Delete user
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const user_id = e.target.parentElement.getAttribute("user_id");
    allUsers = allUsers.filter((user) => String(user.id) !== user_id);
  }

  User.writeInLocalStorage(allUsers);
  ul.innerHTML = "";
  allUsers.forEach((user) => User.li(user));
});

// Change status

ul.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("update")) {
    const user_id = e.target.parentElement.getAttribute("user_id");
    // filter and modify the status
    allUsers = allUsers.map((user) => {
      if (String(user.id) === user_id) {
        return { ...user, status: !user.status };
      } else {
        return user;
      }
    });
  }
  // update local storage
  User.writeInLocalStorage(allUsers);
  ul.innerHTML = "";
  allUsers.forEach((user) => User.li(user));
});

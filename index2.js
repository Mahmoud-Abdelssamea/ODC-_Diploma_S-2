const section = document.querySelector("section");
const ul = document.querySelector("ul");

const apis = ["products", "carts", "posts"];
const url = "https://dummyjson.com/";

// fetch data
const getData = async (apiName) => {
  try {
    const data = await fetch(url + apiName);
    const res = await data.json();
    // call the callback function to handle the data
    cb(res[apiName], null);
  } catch (error) {
    // call the callback function to handle the error
    cb(null, error);
  }
};

// create an event lister for buttons
const eventLister = (button) => {
  const buttonName = document.querySelector(`.${button}`);
  buttonName.addEventListener("click", (e) => {
    e.preventDefault();
    // clear the html from old data
    ul.innerHTML = "";
    // get data from api
    getData(button);
  });
};

// callback function
const cb = (res, err) => {
  if (err) console.log("something wrong");

  // create a li element and append it in ul
  res.forEach((element) => {
    const li = document.createElement("li");
    li.innerText = element.title || element.id;
    ul.appendChild(li);
  });
};

// create the buttons depend on the list (apis)
apis.forEach((api) => {
  const button = document.createElement("button");
  button.innerText = api;
  button.className = api;
  section.appendChild(button);
  eventLister(api);
});

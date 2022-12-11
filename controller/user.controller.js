class User {
  // index page
  static index = (req, res) => {
    const data = { id: 1, name: "Mahmoud", pageName: "Home Page" };
    res.render("index", data);
  };

  // Error page
  static errorPage = (req, res) => {
    const data = {
      title: 404,
      name: "Mahmoud Awwad",
      errorMessage: "page Not available",
    };
    res.render("errorPage", data);
  };

  
}

module.exports = User;

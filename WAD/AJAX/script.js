// url to get dummy data

let url = "https://jsonplaceholder.typicode.com/users";

// function to fetch dummy data

let getData = () => {
  let request = new XMLHttpRequest();
  request.open("GET", url); // send get request to server
  request.send();
  request.onload = () => {
    console.log(request.responseText);
    console.log("TESTING");

    // save response data to local storage with key as 'users'
    localStorage.setItem("users", request.responseText);

    display();
  };
};

getData(); // pre-populate table

let display = () => {
  let table = document.getElementById("table");
  console.log(table);

  // add table header
  table.innerHTML = `
        <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Website</th>
        </tr>
    `;

  // convert string data to JSON
  let users = JSON.parse(localStorage.getItem("users"));

  // for every object in 'users'
  users.map(
    (user, index) =>
      // add cells to table
      (table.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.address.city}</td>
                    <td>${user.website}</td>
                </tr>`)
  );
};

// listen to btn
let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const city = document.getElementById("city").value;
  const website = document.getElementById("website").value;
  const password = document.getElementById("password").value;

  if (
    name == "" ||
    username == "" ||
    email == "" ||
    phone == "" ||
    city == "" ||
    website == "" ||
    password == ""
  )
    window.alert("Please enter all data fields.");
  else {
    let obj = {
      name: name,
      username: username,
      email: email,
      phone: phone,
      address: {
        city: city,
      },
      website: website,
      password: password,
    };

    let xrequest = new XMLHttpRequest();
    xrequest.open("POST", url);
    xrequest.setRequestHeader(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    xrequest.send(JSON.stringify(obj));

    xrequest.onload = () => {
      if (xrequest.status == 201) {
        console.log(xrequest.response);
        let users = JSON.parse(localStorage.getItem("users"));
        users.unshift(obj);
        localStorage.setItem("users", JSON.stringify(users));
        display();
      }
    };
  }
});

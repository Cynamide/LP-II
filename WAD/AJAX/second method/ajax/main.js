const displayData = () => {
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    let users = JSON.parse(sessionStorage.getItem("users"));
    users.forEach((user, index) => {
        // console.log("SUP BITCH");
        // console.log(user);
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.username}</td>
                <td>${user.address.city}</td>
            </tr>
        `;
    });
}

$(document).ready(function() {

    // load data into array

    $.ajax({
        type:'GET',
        url: 'https://jsonplaceholder.typicode.com/users/',
        dataType : 'jsonp',
        crossDomain:true,
        success:function(data){
            // console.log(JSON.stringify(data));
            sessionStorage.setItem("users", JSON.stringify(data));
        },
        error:function(error){
            console.log(error);
        },
    });

    // display data

    displayData();

    // add data to array using ajax post method

    $('#submit').click(function(event){
        console.log("submit button clicked");
        
        let username = document.getElementById('username').value;
        username = $.trim(username);
        console.log(username);
        
        let password = document.getElementById('password').value;
        password = $.trim(password);
        console.log(password);

        let city = document.getElementById('city').value;
        city = $.trim(city);
        console.log(city);

        let json = {
            username: username,
            password: password,
            address: {
                city: city
            }
        };

        $.ajax({
            type:'POST',
            // url: 'http://localhost:3000',
            url: 'https://jsonplaceholder.typicode.com/users/',
            success:function(data){
                console.log(data);
                users = JSON.parse(sessionStorage.getItem('users'));
                users.push(json);
                sessionStorage.setItem('users', JSON.stringify(users));
                displayData();
            },
            error:function(error){
                console.log(error);
            },
        });
    });
});
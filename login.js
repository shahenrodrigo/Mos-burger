function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let uN = "shahen";
    let pW = "0531";
    
    if (username === uN && password === pW) {
        alert("Login successful! Welcome, " + username);
        window.location="index1.html"; 
        console.log("login")
    } else {
        alert("Incorrect Username or Password");
    }
}

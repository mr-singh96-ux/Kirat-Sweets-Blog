let ul = document.querySelector('.links-container');

auth.onAuthStateChanged((user) => {
    if(user){
        ul.innerHTML += `
        <li class="link-item"><a href="/admin" class="link">Dashboard</a></li>
        <li class="link-item"><a href="#" class="link" onclick="logoutUser()" >Logout</a></li>
        `;
    }else{
        ul.innerHTML += `
        <li class="link-item"><a href="/admin" class="link">Login</a></li>
        `;
    }
});
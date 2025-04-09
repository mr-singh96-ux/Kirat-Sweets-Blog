let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector('.login');
const blogSection = document.querySelector('.blog-section');

auth.onAuthStateChanged((user) => {
    if (login) {
        if (user) {
            login.style.display = "none";
            // Fetch and display blogs after user is authenticated
            getUserWrittenBlogs();
        } else {
            setupLoginButton();
        }
    } else {
        console.error('The .login element was not found.');
    }
});

const setupLoginButton = () => {
    ui.start("#loginUI", {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectURL) {
                if (login) {
                    login.style.display = "none";
                    // Fetch and display blogs after successful sign-in
                    getUserWrittenBlogs();
                } else {
                    console.error('The .login element was not found.');
                }
                return false;
            }
        },
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    });
}

const getUserWrittenBlogs = () => {
    console.log("Fetching blogs...");
    db.collection("blogs").where("author", "==", auth.currentUser.email.split('@')[0])
    .get()
    .then((blogs) => {
        console.log("Blogs fetched:", blogs);
        if (blogs.empty) {
            console.log("No blogs found.");
            blogSection.innerHTML = "<p>No blogs found.</p>";
        } else {
            blogs.forEach((blog) => {
                createBlog(blog);
            });
        }
    })
    .catch((error) => {
        console.log("Error getting blogs:", error);
    });
}

const createBlog =(blog) => {
    let data = blog.data();
    console.log("Creating blog card:", data);
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
        <a href="/${blog.id}/editor" class="btn grey">Edit</a>
        <a href="#" onclick="deleteBlog('${blog.id}')" class="btn danger">Delete</a>
    </div>
    `;
}

const deleteBlog = (id) =>{
    db.collection("blogs").doc(id).delete().then(() => {
        location.reload();
    })
    .catch((error) => {
        console.log("Error deleting the blog", error);
    });
}

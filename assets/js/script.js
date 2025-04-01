const hamburgerButton = document.getElementById("hamburger_icon");
const navLinks = document.getElementById("navlinks");
const icon = hamburgerButton.querySelector("i"); // Use optional chaining to prevent errors
const signOutButton = document.getElementById("signout");
const loginButton = document.getElementById("loginbutton");//check
const createModal = document.getElementById("createModal");
const loginAccount = document.getElementById("loginAccount");
const errorMessage = document.getElementById("errorMessage");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("loginModal");
const createAccountBtn = document.getElementById("Create");

hamburgerButton.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
});

// Handle sign out
signOutButton.addEventListener("click", function () {
    Swal.fire({
        title: "Logged Out!",
        text: "You have successfully signed out.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
    });

    setTimeout(() => {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userEmail");
        window.location.href = document.getElementById("default").href;
    }, 2000);

});

// Handle login button appearance
if (!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false") {
    loginButton.innerHTML = "LOGIN";
    loginButton.style.width = "7rem";
    loginButton.style.backgroundColor = "transparent";

    loginButton.addEventListener("click", function () {
        dropdown.style.display = "none";
        modal.style.display = "flex";
    });
}

function closeModal() {
    modal.style.display = "none";
    eventmodal.style.display = "none"
    document.getElementById("createModal").style.display = "none";
    document.getElementById("loginAccount").style.display = "flex";
}

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

// Close modal when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
    if (event.target === eventmodal) {
        eventmodal.style.display = "none";
    }
});

function handleLinkClick(event) {
    if (!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false") {
        event.preventDefault(); // Prevent navigation
        modal.style.display = "flex"; // Show the modal if not logged in
    }
}

const API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/users";
const group = "admin";

// Handle login form submission
document.getElementById("loginform").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    let storedUsers = JSON.parse(localStorage.getItem("users")) || {};

    axios.get(API_URL)
    .then(response => {
        const users = response.data;
        const user = users.find(user => user.email === username && user.id );

        if (user ) {
            Swal.fire({
                title: "Login Successful!",
                text: `Welcome, ${username.split("@")[0]}!`,
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
            });

            modal.style.display = "none";
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userId", user.id);

            setTimeout(() => {
                window.location.href = document.getElementById("default").href;
            }, 3000);
            return;
        }

        if(username == "admin" && password == '123'){
            loader.style.display ="flex";
            modal.style.display = "none";
            localStorage.setItem("isLoggedIn", "true");

            setTimeout(() => {
                window.location.href = document.getElementById("admin").href;
            }, 2000);

        } else {
            errorMessage.style.display = "flex";
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

// Handle account creation (sign-up flow)
createAccountBtn.addEventListener("click", () => {
    createModal.style.display = "block";
    loginAccount.style.display = "none";
});

document.getElementById("createform").addEventListener("submit", function (event) {
    event.preventDefault();

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("Lname").value;
    const email = document.getElementById("createEmail").value;
    const password = document.getElementById("createPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("errorMessage");

    // Validate input fields
    axios.get(API_URL)
        .then(response => {
            const users = response.data;
            const user = users.find(user => user.email === email);
            if (user) {
                Swal.fire({
                    title: "Email Already Registered",
                    text: "This email is already in use. Please use a different email or log in.",
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false
                });
                return;
            }

            // Validate password match
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Hide error message if validation passes
            errorMessage.style.display = "none";

            // Create user object
            const userData = {
                name: `${fname} ${lname}`,
                email,
                password
            };

            // Send POST request to API to create the user
            axios.post(API_URL, userData)
                .then(response => {
                    Swal.fire({
                        title: "Created!",
                        text: "You have successfully created an account.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    modal.style.display = "none";

                    // Store user ID in localStorage
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userEmail", response.data.email); // Store the newly created user's ID

                    setTimeout(() => {
                        window.location.href = document.getElementById("default").href;
                    }, 2000);
                })
                .catch(error => {
                    errorMessage.textContent = "Error creating account. Please try again.";
                    errorMessage.style.display = "block";
                    console.error("Error:", error);
                });
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });
});

document.getElementById("back").addEventListener("click", () => {
    createModal.style.display = "none";
    loginAccount.style.display = "flex";
});

const links = [
    { elementId: "about" },
    { elementId: "review" },
    { elementId: "event" },
    { elementId: "createEvent" },
    { elementId: "gathering" },
    { elementId: "joinevent" },
    { elementId: "ourstory" },
    { elementId: "sharereview" },
    ];
    
links.forEach(({ elementId }) => {
    const element = document.getElementById(elementId);
        if (element) {
        // Attach an event listener to each link
        element.addEventListener("click", handleLinkClick);
        }
    });

    // Function to handle the link click event
function handleLinkClick(event) {
    if (!localStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn") === "false") {
    event.preventDefault();// Prevent navigation
    // Show the modal if not logged in
    modal.style.display = "flex";
    }
}



const hamburgerButton = document.getElementById("hamburger_icon");
const navLinks = document.getElementById("navlinks");
const icon = hamburgerButton.querySelector("i"); // Use optional chaining to prevent errors
const signOutButton = document.getElementById("signout");

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
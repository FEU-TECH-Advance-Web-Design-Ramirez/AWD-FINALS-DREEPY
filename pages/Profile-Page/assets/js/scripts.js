const API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/users";
const group = "admin";
let currentUser = {}; // Store user data globally

// Listen for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
        // Fetch user data based on the user ID
        axios.get(`${API_URL}/login/${userEmail}`)
            .then(response => {
                currentUser = response.data; // Store user data globally
                document.getElementById("name").value = currentUser.name || "";
                document.getElementById("email").value = currentUser.email || "";
                document.getElementById("password").value = currentUser.password;
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });

            // Select the input elements and submit button
            const nameInput = document.getElementById("name");
            const passwordInput = document.getElementById("password");
            const confirmPasswordInput = document.getElementById("confirmPassword");
            const submit = document.getElementById("submit");
            const emailInput = document.getElementById("email");
            const deleteProfile = document.getElementById("deleteProfile");


            // Function to update user data
            function updateUser() {
                const updatedUser = {
                    name: nameInput.value,
                };

            // Check if username is the same
            if (updatedUser.name === currentUser.name) {
                Swal.fire({
                    title: "Error!",
                    text: "The username cannot be the same as the current one.",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
                return;
            }

            // Perform the PUT request when the submit button is clicked
            axios.put(`${API_URL}/${currentUser.id}`, updatedUser)
                .then(response => {
                    console.log("User updated successfully:", response.data);
                    Swal.fire({
                        title: "Update Successful!",
                        text: `Welcome, ${updatedUser.name.split("@")[0]}!`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    // Update the stored user data
                    currentUser = response.data;
                })
                .catch(error => {
                    console.error("Error updating user data:", error);
                });
            }
            // Only add the event listener ONCE
            submit.addEventListener("click", updateUser);
        }

deleteProfile.addEventListener("click", () => {
    Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${API_URL}/${currentUser.id}`)
                .then(response => {
                    console.log("User deleted successfully:", response.data);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your profile has been deleted.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });

                    // Clear user data from local storage
                    localStorage.removeItem("userEmail");
                    localStorage.setItem("isLoggedIn", "false");
                    
                    // Redirect to login or homepage
                    setTimeout(() => {
                        window.location.href = document.getElementById("default").href;
                    }, 2000);
                })

                .catch(error => {
                    console.error("Error deleting user:", error);
                    Swal.fire({
                        title: "Error",
                        text: "Failed to delete profile. Please try again.",
                        icon: "error"
                    });
                });
            }
        });
    });
});


const discard = document.getElementById("discard");

if (discard) {
    discard.addEventListener("click", () => {
        // Restore original values
        if (currentUser) {
            document.getElementById("name").value = currentUser.name || "";
            document.getElementById("email").value = currentUser.email || "";
            document.getElementById("password").value = currentUser.password || "";
        }

        // Show confirmation message
        Swal.fire({
            title: "Changes Discarded",
            text: "Your edits have been reverted.",
            icon: "info",
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            // Navigate after user sees the message
            window.location.href = document.getElementById("default").href;
        });
    });
} else {
    console.error("Discard button not found.");
}


const togglePassword = document.getElementById("unhide");

togglePassword.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        unhide.style.color = "black";
    } else {
        password.type = "password";
        unhide.style.color = "rgb(65, 65, 65)";

    }
});

const signOutButton = document.getElementById("signout");

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

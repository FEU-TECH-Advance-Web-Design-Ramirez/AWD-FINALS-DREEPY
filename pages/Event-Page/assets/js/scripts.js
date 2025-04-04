const eventContainer = document.getElementById("eventcontainer");
const closeeventmodal = document.getElementById("closeeventmodal");
const closeReview = document.getElementById("closeReview");
const reviewContainer = document.getElementById("reviewContainer");
const eventmodal = document.getElementById("eventmodal");
const form = document.getElementById("createEventform");
const createeventModal = document.getElementById("createeventModal");
const joinEventmodal = document.getElementById("joinEventmodal");
const loginButton = document.getElementById("loginbutton");//check
const signOutButton = document.getElementById("signout");
const hamburgerButton = document.getElementById("hamburger_icon");
const navLinks = document.getElementById("navlinks");
const icon = hamburgerButton.querySelector("i"); // Use optional 

eventContainer.addEventListener("click", function (event) {
        eventmodal.style.display = "flex";
        joinEventmodal.style.display = "flex";
        createeventModal.style.display = "none";
        form.style.display = "none";
});


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
function eventcloseModal() {
    eventmodal.style.display = "none";
    reviewContainer.style.display = "none";
}
    
if (closeeventmodal) closeeventmodal.addEventListener("click", eventcloseModal);
    window.addEventListener("click", (event) => {
        if (event.target === eventmodal) {
            eventmodal.style.display = "none";
            reviewContainer.style.display = "none";
        }
    });

    document.getElementById("reviewBtn").addEventListener("click", function(event) {
        reviewContainer.style.display = "flex";
        document.getElementById("joinBtn").style.display = "none";
    });
    
    closeReview.addEventListener("click", function(event){
        reviewContainer.style.display = "none";
        document.getElementById("joinBtn").style.display = "flex";

    });
    
    document.getElementById("createEvent").addEventListener("click", () => {
        eventmodal.style.display = "flex";
        createeventModal.style.display = "flex";
        joinEventmodal.style.display = "none"
        createEventform.style.display = "flex";
        submitEvent.style.display = "flex";
        form.style.display = "flex";
        confirmationContainer.style.display = "none";
        btnHolder.style.display = "none";
        formBtn.style.backgroundColor= "rgb(205, 0, 130)";
        formBtn.style.color= "whitesmoke";
        formBtn.style.height= "2.3rem";
        confirmationBtn.style.backgroundColor= "whitesmoke";
        confirmationBtn.style.color= "rgb(205, 0, 130)";
        confirmationBtn.style.height= "1.7rem";
    });
        
    submitEvent.addEventListener("click", function () {
        const eventTitle = document.getElementById("eventTitle").value;
        const eventDescription = document.getElementById("eventDescription").value;
        const eventDate = document.getElementById("eventDate").value;
        const eventLocation = document.getElementById("eventLocation").value;
        let eventCategory = document.getElementById("eventCategory").value;
        const categoryOption = document.getElementById("categoryOption").value;
        const eventSubmittedBy = localStorage.getItem("userId");
        
        function validateForm() {
            if (!eventCategory) {
                eventCategory = categoryOption;
                }
        
            if (!eventTitle || !eventDescription || !eventDate || !eventLocation || !eventCategory) {
                Swal.fire({ title: "Error", text: "Please fill out all the fields before submitting.", icon: "error" });
                return false;
            }
            return true;
        }
            
        if (!validateForm()) {
            return; // Exit if validation fails
        }
        
        // If eventCategory is empty, use eventOption
        if (!eventCategory) {
            eventCategory = categoryOption;
        }
    
        // Mapping categories to Font Awesome icons
        const categoryIcons = {
            "Music": "fa-music",
            "Sports": "fa-football-ball",
            "Education": "fa-graduation-cap",
            "Art": "fa-palette",
            "Gaming": "fa-gamepad",
            "Wellness": "fa-spa",
            "Outdoor & Travel": "fa-mountain-sun",
            "Community & Charity": "fa-hands-helping",
            "Business & Networking": "fa-briefcase"
        };
    
        // Get the corresponding icon class
        let categoryIcon = categoryIcons[eventCategory] || "fa-solid"; // Default icon if category isn't listed
    
    
        confirmationContent.innerHTML = `
        <div class="left">
            <i class="fa-solid ${categoryIcon}"></i>
        </div>
        <div class="right">
            <div class="content">
                <div class="title">
                    <b>TITLE</b>
                    <h1>${eventTitle}</h1>
                </div>
                <div class="description">
                    <b>DESCRIPTION</b>
                    <p>${eventDescription}</p>
                </div>
                <div class="date">
                    <b>DATE</b>
                    <p><i class="fa-solid fa-calendar"></i>${eventDate}</p>
                </div>
                <div class="location">
                    <b>LOCATION</b>
                    <p><i class="fa-solid fa-location-dot"></i>${eventLocation}</p>
                </div>
                <div class="category">
                    <b>CATEGORY</b>
                    <p>${eventCategory}</p>
                </div>
            </div>
            <div class="host">
                <p><i class = "fa-solid fa-user"></i>Hosted By: matthewyanga00@gmail.com</p>
            </div>
        </div>
        `;
    
        form.style.display = "none";
        createeventModal.style.display = "flex";
        joinEventmodal.style.display = "none"
        confirmationContainer.style.display = "flex";
        submitEvent.style.display = "none";
        btnHolder.style.display = "flex";
        formBtn.style.backgroundColor= "whitesmoke";
        formBtn.style.color= "rgb(205, 0, 130)";
        formBtn.style.height= "1.7rem";
        confirmationBtn.style.backgroundColor= "rgb(205, 0, 130)";
        confirmationBtn.style.height= "2.3rem";
        confirmationBtn.style.color= "whitesmoke";
    
        const newEvent = { title: eventTitle, description: eventDescription, date: eventDate, location: eventLocation, category: eventCategory, submittedBy: eventSubmittedBy };
    
        const Event_API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/events";
        document.getElementById("confirmEvent").addEventListener("click", function () {
            axios.post(Event_API_URL, newEvent)
            .then(response => {
                Swal.fire({ title: "Event Created!", text: "Your event has been submitted successfully. Please wait for admin approval.", icon: "success", timer: 3000, showConfirmButton: false });
                eventmodal.style.display = "none";  
                
                console.log("Response:", response);
            })
            .catch(error => {
                console.error("Error creating event:", error);
                console.error("Error Response:", error.response?.data || error.message);
                console.error("Full Error:", error);
                console.log("Sending Event Data:", newEvent);
        
                Swal.fire({ title: "Error", text: "Failed to create event.", icon: "error" });
            })
        });
    });
    
    document.getElementById("backConfirmation").addEventListener("click", function () {
        document.getElementById("createEventform").style.display = "flex";
        document.getElementById("confirmationContainer").style.display = "none";
        submitEvent.style.display = "flex";
        btnHolder.style.display = "none";
        formBtn.style.backgroundColor= "rgb(205, 0, 130)";
        formBtn.style.color= "whitesmoke";
        formBtn.style.height= "2.3rem";
        confirmationBtn.style.backgroundColor= "whitesmoke";
        confirmationBtn.style.color = "rgb(205, 0, 130)";
        confirmationBtn.style.height= "1.7rem";
    });
    
        document.getElementById("categoryOption").addEventListener("change", function() {
        var inputField = document.getElementById("eventCategory");
        
        if (this.value === "other") {
            inputField.style.display = "flex";
            categoryOption.style.width = "5rem";
    
            // Show input
        } else {
            inputField.style.display = "none";
            categoryOption.style.width = "11rem";
        }
    });
    
    function clearEventForm() {
        document.getElementById("eventTitle").value = "";
        document.getElementById("eventDescription").value = "";
        document.getElementById("eventDate").value = "";
        document.getElementById("eventLocation").value = "";
        document.getElementById("eventCategory").value = "";
        document.getElementById("categoryOption").value = "";
    }
    
    function eventcloseModal() {
        eventmodal.style.display = "none";
        clearEventForm();
    }
    if (closeeventmodal) closeeventmodal.addEventListener("click", eventcloseModal);
    
    
    // Function to fetch and display events from the API
    async function displayEvents() {
    try {
        // Fetch event data from the API
        const response = await fetch('https://demo-api-skills.vercel.app/api/SocialButterfly/events');
        
        // Check if the response status is ok (200)
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        // Parse the response as JSON
        const events = await response.json();

        // Get the container where events will be displayed
        const eventholder = document.getElementById('eventholder');

        // Clear any existing content
        eventholder.innerHTML = '';

        // Check if there are any events
        if (Array.isArray(events) && events.length > 0) {
            events.forEach(event => {
                // Create a new event container
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event-container');
                eventDiv.setAttribute("data-event-id", event.id); // Store event ID

                // Event content
                eventDiv.innerHTML = `
                    <div class="top"><i class="fa-solid fa-music"></i></div>
                    <div class="bottom">
                        <h1>${event.title}</h1>
                        <p>${event.description}</p>
                        <p><i class="fa-solid fa-location-dot"></i>${event.location}</p>
                        <p><i class="fa-solid fa-calendar"></i>${event.date}</p>
                    </div>
                    <div class="creator"><p><i class="fa-solid fa-user"></i>Hosted By: ${event.submittedBy}</p></div>
                `;

                eventDiv.addEventListener("click", function () {
                    const clickedEventId = this.getAttribute("data-event-id"); // Get event ID
                    console.log("Clicked Event ID:", clickedEventId); // Log the ID
                    document.getElementById('eventitle').textContent = event.title;
                    document.getElementById('eventlocation').innerHTML = `<i class="fa-solid fa-location-dot"></i>${event.location}`;

                    document.getElementById('eventdate').innerHTML = `<i class="fa-solid fa-calendar"></i>${event.date}`;
                    document.getElementById('eventgoing').innerHTML = `<i class="fa-solid fa-thumbs-up"></i>${event.going || 0} going`; // Add the number of people going
                    document.getElementById('eventdescription').textContent = event.description;

                    // Show the event modal and join event modal, hide the create event modal and form
                    eventmodal.style.display = "flex";
                    joinEventmodal.style.display = "flex";
                    createeventModal.style.display = "none";
                    form.style.display = "none";
                    localStorage.setItem('editEventId', clickedEventId);

                });

                const editBtn = document.getElementById("editBtn");
                if (localStorage.getItem("userId") === event.submittedBy) {
                    editBtn.style.display = 'flex';
                }

                editBtn.addEventListener('click', function () {
                    const eventDate = new Date(event.date); // Convert the string to a Date object
                    const formattedDate = eventDate.toISOString().split('T')[0]; // Get the date part (yyyy-mm-dd)
                    // Populate the form fields with the current event details
                    document.getElementById('eventTitle').value = event.title;
                    document.getElementById('eventCategory').value = event.category;
                    document.getElementById('eventDate').value = formattedDate;
                    document.getElementById('eventLocation').value = event.location;
                    document.getElementById('eventDescription').value = event.description;

                    // Show the form for editing
                    eventmodal.style.display = "flex";
                    createeventModal.style.display = "flex";
                    joinEventmodal.style.display = "none"
                    createEventform.style.display = "flex";
                    submitEvent.style.display = "flex";
                    form.style.display = "flex";
                    confirmationContainer.style.display = "none";
                    btnHolder.style.display = "none";
                    formBtn.style.backgroundColor= "rgb(205, 0, 130)";
                    formBtn.style.color= "whitesmoke";
                    formBtn.style.height= "2.3rem";
                    confirmationBtn.style.backgroundColor= "whitesmoke";
                    confirmationBtn.style.color= "rgb(205, 0, 130)";
                    confirmationBtn.style.height= "1.7rem";
                    categoryOption.style.display = "none";
                    eventCategory.style.display = "flex";
                    document.getElementById('confirmEvent').style.display = "none";
                    document.getElementById('editsubmit').style.display = "flex";

                });


document.getElementById("editsubmit").addEventListener("click", function () {
    // Collect updated data from the form
    const updatedEvent = {
        title: eventTitle,
      category: eventCategory,
        location:eventLocation,
        description: eventDescription,
        date: eventDate,
    };

    const eventId = localStorage.getItem("editEventId"); // Get event ID
    axios.put(`https://demo-api-skills.vercel.app/api/SocialButterfly/events/${eventId}`, updatedEvent)
        .then(response => {
            Swal.fire({
                title: "Event Updated!",
                text: "Your event has been successfully updated.",
                icon: "success",
                timer: 3000,
                showConfirmButton: false
            });
            eventmodal.style.display = "none";

            console.log("Response:", response);
        })
        .catch(error => {
            console.error("Error updating event:", error);
            console.error("Error Response:", error.response?.data || error.message);
            console.log("Sending Event Data:", updatedEvent);

            Swal.fire({
                title: "Error",
                text: "Failed to update event.",
                icon: "error"
            });
        });
});

                // Append the event to the container
                eventholder.appendChild(eventDiv);
            });
        } else {
            eventContainer.innerHTML = '<p>No events found.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to display events when the page loads
document.addEventListener('DOMContentLoaded', displayEvents);

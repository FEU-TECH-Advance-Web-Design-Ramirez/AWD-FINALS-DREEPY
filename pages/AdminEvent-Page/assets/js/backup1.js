const signOutButton = document.getElementById("signout");
const closeModalBtn = document.getElementById("closeModalBtn");
const confirmationContainer = document.getElementById("confirmationContainer");
const btnHolder = document.getElementById("btnHolder");
const formBtn = document.getElementById("formBtn");
const confirmationBtn = document.getElementById("confirmationBtn");
const form = document.getElementById("createEventform");
const confirmationContent = document.getElementById("confirmationContent");
const dropdown = document.getElementById("dropdown");
const closeeventmodal = document.getElementById("closeeventmodal");
const submitEvent = document.getElementById("submitEvent");
const fetchBtn = document.getElementById("fetch");
const eventsContainer = document.getElementById("eventsContainer");

document.getElementById("createEventBtn").addEventListener("click", () => {
  if (
    !localStorage.getItem("isLoggedIn") ||
    localStorage.getItem("isLoggedIn") === "false"
  ) {
    modal.style.display = "flex"; // Show login modal instead
    return; // Stop execution
  }

  document.getElementById("eventmodal").style.display = "flex";
  createEventform.style.display = "flex";
  submitEvent.style.display = "flex";
  form.style.display = "flex";
  confirmationContainer.style.display = "none";
  btnHolder.style.display = "none";
  formBtn.style.backgroundColor = "rgb(205, 0, 130)";
  formBtn.style.color = "whitesmoke";
  formBtn.style.height = "2.3rem";
  confirmationBtn.style.backgroundColor = "whitesmoke";
  confirmationBtn.style.color = "rgb(205, 0, 130)";
  confirmationBtn.style.height = "1.7rem";
  modalApproval.style.display = "none";
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

    if (
      !eventTitle ||
      !eventDescription ||
      !eventDate ||
      !eventLocation ||
      !eventCategory
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill out all the fields before submitting.",
        icon: "error",
      });
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
    Music: "fa-music",
    Sports: "fa-football-ball",
    Education: "fa-graduation-cap",
    Art: "fa-palette",
    Gaming: "fa-gamepad",
    Wellness: "fa-spa",
    "Outdoor & Travel": "fa-mountain-sun",
    "Community & Charity": "fa-hands-helping",
    "Business & Networking": "fa-briefcase",
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
  confirmationContainer.style.display = "flex";
  submitEvent.style.display = "none";
  btnHolder.style.display = "flex";
  formBtn.style.backgroundColor = "whitesmoke";
  formBtn.style.color = "rgb(205, 0, 130)";
  formBtn.style.height = "1.7rem";
  confirmationBtn.style.backgroundColor = "rgb(205, 0, 130)";
  confirmationBtn.style.height = "2.3rem";
  confirmationBtn.style.color = "whitesmoke";

  const newEvent = {
    title: eventTitle,
    description: eventDescription,
    date: eventDate,
    location: eventLocation,
    category: eventCategory,
    submittedBy: eventSubmittedBy,
  };

  const Event_API_URL =
    "https://demo-api-skills.vercel.app/api/SocialButterfly/events";
  document
    .getElementById("confirmEvent")
    .addEventListener("click", function () {
      axios
        .post(Event_API_URL, newEvent)
        .then((response) => {
          Swal.fire({
            title: "Event Created!",
            text: "Your event has been submitted successfully. Please wait for admin approval.",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
          eventmodal.style.display = "none";

          console.log("Response:", response);
        })
        .catch((error) => {
          console.error("Error creating event:", error);
          console.error(
            "Error Response:",
            error.response?.data || error.message
          );
          console.error("Full Error:", error);
          console.log("Sending Event Data:", newEvent);

          Swal.fire({
            title: "Error",
            text: "Failed to create event.",
            icon: "error",
          });
        });
    });
});

document
  .getElementById("backConfirmation")
  .addEventListener("click", function () {
    document.getElementById("createEventform").style.display = "flex";
    document.getElementById("confirmationContainer").style.display = "none";
    submitEvent.style.display = "flex";
    btnHolder.style.display = "none";
    formBtn.style.backgroundColor = "rgb(205, 0, 130)";
    formBtn.style.color = "whitesmoke";
    formBtn.style.height = "2.3rem";
    confirmationBtn.style.backgroundColor = "whitesmoke";
    confirmationBtn.style.color = "rgb(205, 0, 130)";
    confirmationBtn.style.height = "1.7rem";
  });

document
  .getElementById("categoryOption")
  .addEventListener("change", function () {
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

const Fetch_API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/admin/events";
let eventsData = [];
// Mapping categories to Font Awesome icons
const categoryIcons = {
  Music: "fa-music",
  Sports: "fa-football-ball",
  Education: "fa-graduation-cap",
  Art: "fa-palette",
  Gaming: "fa-gamepad",
  Wellness: "fa-spa",
  "Outdoor & Travel": "fa-mountain-sun",
  "Community & Charity": "fa-hands-helping",
  "Business & Networking": "fa-briefcase",
};
let categoryIcon = categoryIcons[eventCategory] || "fa-solid"; // Default icon if category isn't listed

// Fetch All Events
function fetchAllEvents() {
  axios
    .get(Fetch_API_URL)
    .then((response) => {
      eventsData = response.data;
      displayEvents(eventsData);
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch events.",
        icon: "error",
      });
    });
}
window.addEventListener("load", fetchAllEvents);

// Display Events
function displayEvents(events) {
  eventsContainer.innerHTML = "";
  eventsContainer.style.display = "flex";
  
  if (events.length > 0) {
    events.forEach((event) => {
      const eventContainer = document.createElement("div");
      eventContainer.classList.add("event-container");
      eventContainer.dataset.eventId = event.id;
      let categoryIcon = categoryIcons[event.category] || "fa-solid"; // Default icon if category isn't listed

      eventContainer.innerHTML = `
      <div class= "container">
              <div class="top"><i class="fa-solid ${categoryIcon}"></i></div>
                <div class="bottom">
                    <h1>${event.title}</h1>
                    <p>${event.id}</p>
                    <p><i class="fa-solid fa-location-dot"></i>${event.location}</p>
                    <p><i class="fa-solid fa-calendar"></i>${event.date}</p>
                    <p><i class="fa-solid fa-thumbs-up"></i>7 going</p>
                    <div class="button-holder"><button id="deny">Deny</button><button id="approve">Approve</button></div>
                </div>
                <div class="creator"><p><i class="fa-solid fa-user"></i>Hosted By: ${event.submittedBy}</p></div>
              </div>
            `;
            eventContainer.addEventListener("click", () => showEventModal(event));

      eventsContainer.appendChild(eventContainer);
    });
  } else {
    Swal.fire({
      title: "No Events Found",
      text: "No events to display.",
      icon: "warning",
    });
  }
}

fetchBtn.addEventListener("click", () => {
  fetchAllEvents();
});

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
    window.location.href = document.getElementById("default").href;
  }, 2000);
});

document.getElementById("validate").addEventListener("click", () => {
  document.getElementById("validateform").style.display = "flex";
});

document.getElementById("closevalidate").addEventListener("click", () => {
  document.getElementById("validateform").style.display = "none";
});

//validation for events
const API_BASE_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly";

// Validate Event (Admin Only)
document.getElementById("validateform").addEventListener("submit", async function (e) {
    e.preventDefault();

    const eventId = document.getElementById("validateinput").value.trim();
    const adminId = '620b24d1-db42-4347-aaa3-029fbc69a5c6';
    const validated = 'true';

    if (!eventId || !adminId) {
        alert("Event ID and Admin ID are required.");
        return;
    }
    const test = {id: eventId, adminId}

    console.log("Validating Event:", { eventId, adminId, validated }); // Debugging

    try {
        const response = await fetch(`${API_BASE_URL}/admin/events/${eventId}/validate`, {
            method: "POST",
            body: JSON.stringify(test)
        });

        const responseData = await response.json(); // Get response data
        console.log("API Response:", responseData); // Debugging

        if (!response.ok) {
            throw new Error(responseData.message || "Failed to validate event.");
        }

        alert("Event validated successfully!");
    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
    }
});

document.getElementById("validate").addEventListener("click", () => {
    document.getElementById("validateform").style.display = "flex";
});
const API_Fetch_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly";
const modalApproval = document.getElementById("modalApproval");

function showEventModal(event) {
  modalApproval.style.display = "flex";

};

eventsContainer.addEventListener("click", (e) => {
  if (e.target && e.target.id === "approve") {
    handleApprove(e);
  }
  if (e.target && e.target.id === "deny") {
    handleDeny(e);
  }
});
// Approve Event
function handleApprove(e) {
  const adminId = '620b24d1-db42-4347-aaa3-029fbc69a5c6';
  const validated = 'true';
  const eventId = eventContainer.dataset.eventId;

  // Validate event before approval
  const validationData = { id: eventId, adminId, validated };

  console.log("Validating Event:", validationData);

  fetch(`${API_BASE_URL}/admin/events/${eventId}/validate`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(validationData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Event validated successfully!");
        fetchAllEvents();  // Refresh event list after approval
      } else {
        alert("Failed to validate event.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while validating the event.");
    });
}

// Deny Event
function handleDeny(e) {
  const eventId = e.target.dataset.eventId;
  // Logic to handle event denial
  console.log("Deny Event ID:", eventId);
}
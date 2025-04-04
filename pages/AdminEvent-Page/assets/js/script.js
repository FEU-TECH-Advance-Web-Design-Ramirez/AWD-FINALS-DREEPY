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
const initial = document.getElementById("initial");

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

document.getElementById("backConfirmation").addEventListener("click", function () {
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

document.getElementById("categoryOption").addEventListener("change", function () {
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
      eventsData = response.data.filter(event => event.validated === false);
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
function fetchAllValidEvents() {
  axios
    .get(`${API_BASE_URL}/events`)
    .then((response) => {
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


// Display Events
function displayEvents(events) {
  eventsContainer.innerHTML = "";
  eventsContainer.style.display = "flex";

  if (events.length > 0) {
    const table = document.createElement("table");
    table.classList.add("table");

    // Create table headers
    table.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Category</th>
          <th>Location</th>
          <th>Date</th>
          <th>Host</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    // Populate table rows
    events.forEach((event, index) => {
      let categoryIcon = categoryIcons[event.category] || "fa-solid";
      const row = document.createElement("tr");
      row.dataset.eventId = event.id;
      row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${event.id || "N/A"}</td>
        <td>${event.title || "N/A"}</td>
        <td class="description">${event.description || "N/A"}</td>
        <td><i class="fa-solid ${categoryIcon}"></i> ${event.category || "N/A"}</td>
        <td>${event.location || "N/A"}</td>
        <td>${event.date || "N/A"}</td>
        <td>${event.submittedBy || "N/A"}</td>
        <td class="button-holder">
          <button class="deny-btn">Deny</button>
          <button class="approve-btn">Approve</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    eventsContainer.appendChild(table);
    initial.style.display = "none";
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
// Hardcoded Admin ID
// Hardcoded Admin ID

// Event delegation to handle button clicks
document.getElementById("eventsContainer").addEventListener("click", async function (e) {
  if (e.target.classList.contains("approve-btn") || e.target.classList.contains("deny-btn")) {
    const isApprove = e.target.classList.contains("approve-btn");
    const row = e.target.closest("tr");
    const eventId = row?.dataset.eventId;
    const adminId = '620b24d1-db42-4347-aaa3-029fbc69a5c6';
    const validated = 'true';  

    if (!eventId || !adminId) {
      alert("Missing event ID or admin ID.");
      return;
    }

    try {
      let response;
      if (isApprove) {
        // Approve with POST
        const validationData = { id: eventId, adminId, validated};
        
      fetch(`${API_BASE_URL}/admin/events/${eventId}/validate`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validationData),
      })

      } else {
        // Deny with DELETE
        response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
        method: "DELETE",
        });
      }

      Swal.fire({
        title: isApprove ? "Approved!" : "Denied!",
        text: `Event has been ${isApprove ? "approved" : "denied"} successfully.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        row.disable();
      });
      setTimeout(() => {
        window.location.reload();
        }, 2000);

    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  }
});

document.getElementById("validate").addEventListener("click", () => {
  fetchAllValidEvents();
});
const API_Fetch_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly";

const eventContainer = document.getElementById("eventsContainer");
eventContainer.addEventListener("click", function (event) {
  let eventContainer = event.target.closest(".container");

  if (eventContainer) {
        document.getElementById("modal").style.display = "flex";
        document.getElementById("modalApproval").style.display = "flex";
  }
});

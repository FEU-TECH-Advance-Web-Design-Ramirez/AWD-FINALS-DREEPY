const API_URL = "https://demo-api-skills.vercel.app/api/SocialButterfly/events";
const eventholder = document.getElementById("eventholder");
const eventModal = document.getElementById("eventModal");
const closeEventModalBtn = document.getElementById("closeEventModalBtn");
const updateForm = document.getElementById("updateEventForm");
const userId = localStorage.getItem("userId"); // Assuming this is stored during login
let eventsData = [];

window.addEventListener("load", fetchValidatedEvents);

// Fetch Validated Events
function fetchValidatedEvents() {
  axios
    .get(API_URL)
    .then((response) => {
      eventsData = response.data;
      displayEvents(eventsData);
    })
    .catch((error) => {
      console.error("Error fetching validated events:", error);
      Swal.fire("Error", "Failed to fetch events.", "error");
    });
}

function displayEvents(events) {
  eventholder.innerHTML = "";

  if (events.length === 0) {
    eventholder.innerHTML = "<p>No validated events found.</p>";
    return;
  }

  events.forEach((event) => {
    if (!event.validated) return;

    const eventCard = document.createElement("div");
    eventCard.classList.add("event-container");
    eventCard.dataset.eventId = event._id;
    eventCard.dataset.creatorId = event.submittedBy;

    eventCard.innerHTML = `
                <div class="top"><i class="fa-solid fa-music"></i></div>
                    <div class="bottom">
                        <h1>${event.title}</h1>
                        <p>${event.description}</p>
                        <p><i class="fa-solid fa-location-dot"></i>${event.location}</p>
                        <p><i class="fa-solid fa-calendar"></i>${event.date}</p>
                    </div>
                    <div class="creator"><p><i class="fa-solid fa-user"></i>Hosted By: ${event.submittedBy}</p></div>
                `;

    eventholder.appendChild(eventCard);
  });
}

// Open Modal for Editing
eventholder.addEventListener("click", function (event) {
  const target = event.target;
  const card = target.closest(".event-card");

  if (!card) return;

  const eventId = card.dataset.eventId;
  const creatorId = card.dataset.creatorId;

  if (target.classList.contains("editEvent")) {
    const eventToEdit = eventsData.find((e) => e._id === eventId);

    if (creatorId !== userId) {
      Swal.fire("Forbidden", "You can only edit your own events.", "error");
      return;
    }

    document.getElementById("eventId").value = eventToEdit._id;
    document.getElementById("eventTitle").value = eventToEdit.title;
    document.getElementById("eventDescription").value = eventToEdit.description;
    document.getElementById("eventDate").value = eventToEdit.date;
    document.getElementById("eventLocation").value = eventToEdit.location;

    eventModal.style.display = "flex";
  }

  if (target.classList.contains("deleteEvent")) {
    if (creatorId !== userId && localStorage.getItem("isAdmin") !== "true") {
      Swal.fire("Forbidden", "Only the creator or admin can delete.", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the event.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_URL}/${eventId}`)
          .then(() => {
            Swal.fire("Deleted!", "The event has been deleted.", "success");
            fetchValidatedEvents();
          })
          .catch((error) => {
            console.error("Error deleting event:", error);
            Swal.fire("Error", "Failed to delete event.", "error");
          });
      }
    });
  }
});

// Handle Update Submission
updateForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const eventId = document.getElementById("eventId").value;
  const updatedEvent = {
    title: document.getElementById("eventTitle").value,
    description: document.getElementById("eventDescription").value,
    date: document.getElementById("eventDate").value,
    location: document.getElementById("eventLocation").value,
  };

  axios
    .put(`${API_URL}/${eventId}`, updatedEvent)
    .then(() => {
      Swal.fire("Success", "Event updated successfully!", "success");
      eventModal.style.display = "none";
      fetchValidatedEvents();
    })
    .catch((error) => {
      console.error("Error updating event:", error);
      Swal.fire("Error", "Only the creator can update this event.", "error");
    });
});

// Close modal
closeEventModalBtn.addEventListener("click", () => {
  eventModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === eventModal) {
    eventModal.style.display = "none";
  }
});

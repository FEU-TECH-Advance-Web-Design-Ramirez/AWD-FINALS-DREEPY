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
        document.getElementById("validateEventForm").reset();
    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
    }
});


document.getElementById("validate").addEventListener("click", () => {
    document.getElementById("validateform").style.display = "flex";
});
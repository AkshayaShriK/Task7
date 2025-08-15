// Get elements
const userContainer = document.getElementById("userContainer");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

// Function to fetch user data
async function fetchUserData() {
    userContainer.innerHTML = "Loading...";
    errorMsg.textContent = "";

    try {
        // Fetch data from public API
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        // If response is not OK, throw error
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Parse JSON response
        const users = await response.json();

        // Display users in HTML
        displayUsers(users);

    } catch (error) {
        // Handle errors
        errorMsg.textContent = "❌ Failed to fetch data. Check your internet connection.";
        userContainer.innerHTML = "";
        console.error("Error:", error);
    }
}

// Function to display users
function displayUsers(users) {
    userContainer.innerHTML = "";
    users.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("user-card");
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;
        userContainer.appendChild(card);
    });
}

// Reload button click
reloadBtn.addEventListener("click", fetchUserData);

// Fetch data on page load
fetchUserData();

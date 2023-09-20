// script.js
// script.js
const githubForm = document.getElementById("form1");
const usernameInput = document.getElementById("username");
const userInfoCard = document.getElementById("userInfoCard");
const resetButton = document.getElementById("resetButton"); // Add this line
function resetForm() {
    githubForm.style.display = "block";
    userInfoCard.style.display = "none";
    resetButton.style.display = "none";
}

githubForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = usernameInput.value;

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();

        if (response.ok) {
            // Create a nicely designed card to display user information
            const userCardHTML = `
                <img src="${userData.avatar_url}" alt="User Avatar">
                <h2>${userData.login}</h2>
                <p>Name: ${userData.name || 'N/A'}</p>
                <p>Public Repos: ${userData.public_repos}</p>
                <p>Public Gists: ${userData.public_gists}</p>
                <p>Profile Created At: ${new Date(userData.created_at).toLocaleDateString('en-US')}</p>
            `;
            userInfoCard.innerHTML = userCardHTML;
            userInfoCard.style.display = "block";
            githubForm.style.display = "none";

            // Show the "Reset" button and add a click event listener
            resetButton.style.display = "block";
            resetButton.addEventListener("click",resetForm);
        } else {
            userInfoCard.innerHTML = "User not found";
            userInfoCard.style.display = "block";
            resetButton.style.display = "none"; // Hide the button if there's an error
        }
    } catch (error) {
        console.error(error);
    }
});

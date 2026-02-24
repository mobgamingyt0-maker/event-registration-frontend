const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
e.preventDefault();

const data = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
phone: document.getElementById("phone").value,
college: document.getElementById("college").value,
year: document.getElementById("year").value,
branch: document.getElementById("branch").value,
event: document.getElementById("event").value
};

try {

const res = await fetch("http://localhost:5000/register", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(data)
});

const result = await res.json();

successMessage.innerText = result.message;
form.reset();

} catch (error) {

successMessage.innerText = "❌ Server Error!";

}

});
// Show main after splash
setTimeout(() => {
    document.querySelector(".main-content").style.display = "block";
}, 6000);

// Toggle login/signup
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginBtn.onclick = () => {
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
};

signupBtn.onclick = () => {
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
};

// Show registration form after login/signup
function showRegistration() {
    document.querySelector(".auth-container").style.display = "none";
    document.getElementById("registrationSection").style.display = "block";
}
// Show main content after intro
setTimeout(() => {
    document.querySelector(".main-content").style.display = "block";
}, 6000);

// Login fade out effect
function loginEffect() {
    document.querySelector(".login-box").style.opacity = "0";
    document.querySelector(".login-box").style.transition = "1s";
    return false; // prevent actual submit
}
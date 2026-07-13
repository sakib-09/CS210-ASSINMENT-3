
document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.querySelector("#loginForm");
    const signupForm = document.querySelector("#signupForm");
    const userInfoForm = document.querySelector("#userInfoForm");

    if (loginForm) {
        loginForm.addEventListener("submit", validateLogin);
    }

    if (signupForm) {
        signupForm.addEventListener("submit", validateSignup);
    }

    if (userInfoForm) {
        userInfoForm.addEventListener("submit", validateUserInfo);
    }
});

/* ---------- Reusable Validation Functions ---------- */

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateNickname(nickname) {
    const nicknamePattern = /^[a-zA-Z0-9_]+$/;
    return nicknamePattern.test(nickname);
}

function validateAvatar(path) {
    const avatarPattern = /\.(png|jpg|jpeg|gif)$/i;
    return avatarPattern.test(path);
}

/* ---------- LOGIN VALIDATION ---------- */

function validateLogin(event) {
    event.preventDefault();
    clearErrors();

    let valid = true;

    const email = document.querySelector("#loginEmail");
    const password = document.querySelector("#loginPassword");

    if (!email.value || !validateEmail(email.value)) {
        showError(email, "Please enter a valid email address.");
        valid = false;
    }

    if (password.value.length < 6 || password.value.includes(" ")) {
        showError(password, "Password must be at least 6 characters and contain no spaces.");
        valid = false;
    }

    if (valid) {
        event.target.submit();
    }
}

/* ---------- SIGNUP VALIDATION ---------- */

function validateSignup(event) {
    event.preventDefault();
    clearErrors();

    let valid = true;

    const email = document.querySelector("#signupEmail");
    const nickname = document.querySelector("#signupNickname");
    const password = document.querySelector("#signupPassword");
    const confirm = document.querySelector("#confirmPassword");

    if (!email.value || !validateEmail(email.value)) {
        showError(email, "Enter a valid email address.");
        valid = false;
    }

    if (!nickname.value || !validateNickname(nickname.value)) {
        showError(nickname, "Nickname may contain only letters, numbers, and underscores.");
        valid = false;
    }

    if (password.value.length < 6 || !/[^a-zA-Z]/.test(password.value)) {
        showError(password, "Password must be at least 6 characters and contain a number or symbol.");
        valid = false;
    }

    if (!confirm.value || confirm.value !== password.value) {
        showError(confirm, "Passwords do not match.");
        valid = false;
    }

    if (valid) {
        event.target.submit();
    }
}

/* ---------- USER INFO VALIDATION ---------- */

function validateUserInfo(event) {
    event.preventDefault();
    clearErrors();

    let valid = true;

    const nickname = document.querySelector("#userNickname");
    const avatar = document.querySelector("#avatarPath");
    const dob = document.querySelector("#dob");

    if (!nickname.value || !validateNickname(nickname.value)) {
        showError(nickname, "Nickname may contain only letters, numbers, and underscores.");
        valid = false;
    }

    if (!avatar.value || !validateAvatar(avatar.value)) {
        showError(avatar, "Avatar must end with .png, .jpg, .jpeg, or .gif.");
        valid = false;
    }

    const selectedDate = new Date(dob.value);
    const today = new Date();

    if (!dob.value || isNaN(selectedDate) || selectedDate > today) {
        showError(dob, "Please enter a valid date in the past.");
        valid = false;
    }

    if (valid) {
        event.target.submit();
    }
}

/* ---------- ERROR HANDLING ---------- */

function showError(input, message) {
    input.classList.add("error");

    const error = document.createElement("div");
    error.className = "error-message";
    error.innerText = message;

    input.parentNode.appendChild(error);
}

function clearErrors() {
    document.querySelectorAll(".error-message").forEach(e => e.remove());
    document.querySelectorAll(".error").forEach(e => e.classList.remove("error"));
}
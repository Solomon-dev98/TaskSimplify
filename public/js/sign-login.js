// Get references to the icons and password field
let icon = document.getElementById("icon");
let password = document.getElementById("password");
let iconHide = document.getElementById("icon_hide");
let confirm_password = document.getElementById("confirm_password");
let confirm_iconone = document.getElementById("confirm_icon");
let confirm_icontwo = document.getElementById("confirm_icon_hide");

// Function to toggle icons and password visibility
function togglePasswordVisibility() {
  if (password.type === "password") {
    // Show password
    password.type = "text";
    icon.style.display = "none";
    iconHide.style.display = "block";
  } else {
    // Hide password
    password.type = "password";
    icon.style.display = "block";
    iconHide.style.display = "none";
  }
}

icon.onclick = togglePasswordVisibility;
iconHide.onclick = togglePasswordVisibility;


function toggleConfirm() {
  if (confirm_password.type === "password") {
    // Show password
    confirm_password.type = "text";
    confirm_iconone.style.display = "none";
    confirm_icontwo.style.display = "block";
  } else {
    // Hide password
    confirm_password.type = "password";
    confirm_iconone.style.display = "block";
    confirm_icontwo.style.display = "none";
  }
}

confirm_iconone.onclick = toggleConfirm;
confirm_icontwo.onclick = toggleConfirm;
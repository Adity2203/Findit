function togglePassword() {
  const passwordInput = document.getElementById("password");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

function generateCaptcha() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById("captchaText").textContent = captcha;
}

function validateLogin(event) {
  event.preventDefault();

  const userCaptcha = document.getElementById("captchaInput").value.trim().toUpperCase();
  const actualCaptcha = document.getElementById("captchaText").textContent.trim().toUpperCase();

  if (userCaptcha !== actualCaptcha) {
    alert("CAPTCHA does not match. Please try again.");
    generateCaptcha();
    return false;
  }

  // Simulate successful login
  alert("Login successful!");
  window.location.href = "homepage.html";
  return true;
}

// Initialize CAPTCHA on page load
window.onload = generateCaptcha;

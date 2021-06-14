const togglePassword = document.querySelector(".togglePassword");
const password = document.querySelector(".password");

togglePassword.addEventListener("click", (e) => {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute('type', type);
  togglePassword.classList.toggle('bi-eye')
});

document.querySelectorAll("nav a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const status = document.getElementById("formStatus");

        if (!name || !email || !message) {
            status.textContent = "Заполните все поля!";
            status.style.color = "red";
            return;
        }

        status.textContent = "Сообщение отправлено!";
        status.style.color = "green";

        form.reset();
    });
}

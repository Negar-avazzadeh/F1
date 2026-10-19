"use strict";
// start Hamburger Menu
const menuBtn = document.querySelector(".menu-btn");
const mainMenu = document.querySelector(".main-menu");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  mainMenu.classList.toggle("active");

  menuBtn.innerHTML = mainMenu.classList.contains("active") ? "✕" : "☰";
});

mainMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", () => {
  mainMenu.classList.remove("active");
  menuBtn.innerHTML = "☰";
});
// end Hamburger Menu
// start Signin
const signinBtn = document.querySelector(".signin");
const logoutBtn = document.querySelector(".logout");
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  signinBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
}
signinBtn.addEventListener("click", () => {
  loginModal.classList.add("active");
});
loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove("active");
  }
});
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    message.style.color = "red";
    message.textContent =
      "Password باید حداقل 8 کاراکتر، یک حرف بزرگ، یک حرف کوچک و یک عدد داشته باشد";
    return;
  }
  message.style.color = "#000";
  message.innerHTML = '<span class="loading">Loading...</span>';
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: email,
      }),
    );
    message.style.color = "green";
    message.textContent = "Login Successful ✅";
    setTimeout(() => {
      loginModal.classList.remove("active");
      signinBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      loginForm.reset();
      message.textContent = "";
    }, 1000);
  } catch (err) {
    console.error(err);
    message.style.color = "red";
    message.textContent = "Login Failed ❌";
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  signinBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
  alert("Logged Out ✅");
});
// end Signin
// start Slider
const slides = document.querySelectorAll(".hero-card");
const dots = document.querySelectorAll(".hero-dots span");

let current = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  current = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

setInterval(() => {
  current++;
  if (current >= slides.length) current = 0;
  showSlide(current);
}, 5000);
// end Slider
// start scroll slider-1
const slider = document.getElementById("videoSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateButtons() {
  prevBtn.classList.toggle("disabled", slider.scrollLeft <= 0);

  nextBtn.classList.toggle(
    "disabled",
    slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5,
  );
}

nextBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: 1000,
    behavior: "smooth",
  });
});

prevBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: -1000,
    behavior: "smooth",
  });
});

slider.addEventListener("scroll", updateButtons);

window.addEventListener("load", updateButtons);
window.addEventListener("resize", updateButtons);
// end scroll slider-1
// start scroll-2const
// ===== 2026 Highlights Slider =====

const slider1 = document.getElementById("videoSlider-1");
const prevBtn1 = document.getElementById("prevBtn-1");
const nextBtn1 = document.getElementById("nextBtn-1");

function updateButtons1() {
  prevBtn1.classList.toggle("disabled", slider1.scrollLeft <= 0);

  nextBtn1.classList.toggle(
    "disabled",
    slider1.scrollLeft + slider1.clientWidth >= slider1.scrollWidth - 5,
  );
}

nextBtn1.addEventListener("click", () => {
  slider1.scrollBy({
    left: 1000,
    behavior: "smooth",
  });
});

prevBtn1.addEventListener("click", () => {
  slider1.scrollBy({
    left: -1000,
    behavior: "smooth",
  });
});

slider1.addEventListener("scroll", updateButtons1);

window.addEventListener("load", updateButtons1);

window.addEventListener("resize", updateButtons1);
// end scroll slider-2
// start change tab
const seasonTabs = document.querySelectorAll(".season .tab");
const seasonContents = document.querySelectorAll(".season .tab-content");

seasonTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    seasonTabs.forEach((btn) => btn.classList.remove("active"));
    seasonContents.forEach((c) => c.classList.remove("active"));

    tab.classList.add("active");

    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");

    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });

    document.getElementById(tab.dataset.tab).classList.add("active");

    document.querySelectorAll(".standing-content").forEach((content) => {
      content.classList.remove("active");
    });

    document.getElementById(tab.dataset.tab + "-table").classList.add("active");
  });
});
// end change tab
// start dark mode & light mode
const displayBtn = document.querySelector(".display-mode");
const menu = document.querySelector(".mode-menu");
const darkBtn = document.getElementById("darkMode");
const lightBtn = document.getElementById("lightMode");

// اگر قبلاً دارک مود ذخیره شده بود
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// باز و بسته شدن منو
displayBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// دارک مود
darkBtn.addEventListener("click", () => {
  document.body.classList.add("dark");
  localStorage.setItem("theme", "dark");
  menu.style.display = "none";
});

// لایت مود
lightBtn.addEventListener("click", () => {
  document.body.classList.remove("dark");
  localStorage.setItem("theme", "light");
  menu.style.display = "none";
});

// بستن منو با کلیک بیرون
document.addEventListener("click", (e) => {
  if (!e.target.closest(".display-container")) {
    menu.style.display = "none";
  }
});
// end dark mode & light mode
// start show more
const showBtn = document.querySelector(".show-all");
const hiddenRows = document.querySelectorAll(".hidden-row");

let opened = false;

showBtn.addEventListener("click", () => {
  opened = !opened;

  hiddenRows.forEach((row) => {
    row.style.display = opened ? "table-row" : "none";
  });

  showBtn.textContent = opened ? "Show less" : "Show all";
});
// end show more




'use strict';




const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});




const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}





const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);


const themeToggleBtn = document.getElementById("theme-toggle");


const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggleBtn.textContent = "Light Mode";
}


themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");


  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggleBtn.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

 
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});





const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});





const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);



let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);




const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscribe-form');
  const emailInput = document.querySelector('#subscribe-form .input-field');
  const formMessage = document.getElementById('form-message');

  console.log('Form:', form);
  console.log('Email Input:', emailInput);
  console.log('Form Message:', formMessage);


  const savedEmail = localStorage.getItem('userEmail');
  if (savedEmail) {
    formMessage.textContent = `Welcome back! You previously subscribed with: ${savedEmail}`;
    formMessage.style.color = 'green';
    console.log('Previously saved email found:', savedEmail);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Submit event triggered');

    const email = emailInput.value.trim();
    console.log('Entered Email:', email);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      console.log('Validation: Email is empty');
      formMessage.textContent = 'Email is required!';
      formMessage.classList.remove('success');
      formMessage.classList.add('error');
      return;
    }

    if (!emailRegex.test(email)) {
      console.log('Validation: Invalid email format');
      formMessage.textContent = 'Please enter a valid email address!';
      formMessage.classList.remove('success');
      formMessage.classList.add('error');
      return;
    }

    
    localStorage.setItem('userEmail', email);
    console.log('Email saved to localStorage:', email);

    formMessage.textContent = 'Thank you for subscribing!';
    formMessage.classList.remove('error');
    formMessage.classList.add('success');

    emailInput.value = ''; 
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const recipesContainer = document.getElementById('recipes-container');

  
  fetch('https://dummyjson.com/recipes')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const limitedRecipes = data.recipes.slice(0, 15); 
      displayRecipes(limitedRecipes);
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
      recipesContainer.innerHTML = `<p style="color: red;">Failed to load recipes. Please try again later.</p>`;
    });

  
  function displayRecipes(recipes) {
    recipesContainer.innerHTML = ''; 
    recipes.forEach(recipe => {
      const recipeElement = document.createElement('div');
      recipeElement.className = 'recipe';
      recipeElement.innerHTML = `
        <h3 class="recipe-title">${recipe.name}</h3>
        <p class="recipe-details">Prep Time: ${recipe.prepTimeMinutes} mins</p>
        <p class="recipe-difficulty">Difficulty: ${recipe.difficulty}</p>
      `;
      recipesContainer.appendChild(recipeElement);
    });
  }
});


const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {
  button.addEventListener("click", function () {
    this.classList.toggle("liked"); 
    
    
    const isLiked = this.classList.contains("liked");
    const itemName = this.previousElementSibling.textContent; 
    
    if (isLiked) {
      localStorage.setItem(itemName, "liked");
    } else {
      localStorage.removeItem(itemName);
    }
  });
});


likeButtons.forEach(button => {
  const itemName = button.previousElementSibling.textContent; 
  if (localStorage.getItem(itemName) === "liked") {
    button.classList.add("liked");
  }
});









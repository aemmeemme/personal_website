document.addEventListener("DOMContentLoaded", function () {
  let contentData = {};

  // Fetch the JSON content from content.json
  fetch("content.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      contentData = data;
      // Load the default section (e.g., "about") without flip animation on page load
      updateContent("about", false);
      // Populate the skills section from JSON
      updateSkills();
    })
    .catch(error => {
      console.error("Error fetching JSON content:", error);
      document.getElementById("main-content").innerHTML = "<p>Error loading content.</p>";
      document.getElementById("skills").innerHTML = "<p>Error loading skills.</p>";
    });

  // Set up click event listeners on each navbar link for the main content
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor navigation
      const section = this.getAttribute("href").substring(1);
      updateContent(section);
    });
  });

  // Function to update the #main-content area with a flip animation
  // The second parameter, animate, defaults to true
  function updateContent(section, animate = true) {
    const mainContent = document.getElementById("main-content");
    if (!contentData[section]) {
      mainContent.innerHTML = "<p>Content not available.</p>";
      return;
    }
    const { title, content } = contentData[section];
    const newContent = `<h2>${title}</h2>${content}`;

    if (!animate) {
      // Update immediately without animation (for initial load)
      mainContent.innerHTML = newContent;
      return;
    }

    // Start the flip-out animation
    mainContent.classList.add("flip-out");

    // When the flip-out animation ends, update the content and start the flip-in animation
    mainContent.addEventListener("animationend", function flipOutHandler(e) {
      if (e.animationName === "flipOut") {
        mainContent.removeEventListener("animationend", flipOutHandler);
        // Update content while hidden
        mainContent.innerHTML = newContent;
        mainContent.classList.remove("flip-out");
        mainContent.classList.add("flip-in");

        // Clean up after the flip-in animation completes
        mainContent.addEventListener("animationend", function flipInHandler(e2) {
          if (e2.animationName === "flipIn") {
            mainContent.classList.remove("flip-in");
            mainContent.removeEventListener("animationend", flipInHandler);
          }
        });
      }
    });
  }

  // Function to update the "skills" section using JSON data
  function updateSkills() {
    const skillsElement = document.getElementById("skills");
    if (contentData["skills"]) {
      const { title, content } = contentData["skills"];
      skillsElement.innerHTML = `<h2>${title}</h2>${content}`;
    } else {
      skillsElement.innerHTML = "<p>No skills available.</p>";
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');
  // When the checkbox changes, update the body classes accordingly.
  themeToggle.addEventListener('change', function () {
    if (this.checked) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  });
});

// Function that generates a 150x150 image composed of a 10x10 grid of squares
    // Each square is filled with a random color.
    function generateRandomGridImageBase64() {
      // Create a canvas element of size 150x150
      const canvas = document.createElement('canvas');
      canvas.width = 150;
      canvas.height = 150;
      const ctx = canvas.getContext('2d');

      const numSquares = 10;           // 10 squares per side
      const squareSize = canvas.width / numSquares; // 15 pixels per square

      // Loop over each row and column in the grid
      for (let row = 0; row < numSquares; row++) {
        for (let col = 0; col < numSquares; col++) {
          // Generate random values for red, green, and blue
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);

          // Set the fill style to the random color
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

          // Draw the square at the correct position
          ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
      }

      // Convert the canvas content to a base64 encoded PNG image
      return canvas.toDataURL('image/png');
    }

// When the DOM is loaded, set the background image of the div
document.addEventListener('DOMContentLoaded', function() {
  const randomDiv = document.getElementById('random-image');
  if (randomDiv) {
    const base64Image = generateRandomGridImageBase64();
    // Set the generated base64 string as the background image of the div
    randomDiv.style.backgroundImage = `url(${base64Image})`;
  }
});

document.addEventListener('mousemove', (e) => {
  const circle = document.getElementById('circle');
  const height = circle.offsetHeight;
  const width = circle.offsetWidth;

  if (e.target.tagName === 'A' ||
      e.target.tagName === 'BUTTON' ||
      e.target.parentNode.tagName === 'BUTTON') {
      circle.classList.add('big');
  } else {
      circle.classList.remove('big');
  }

  setTimeout(() => { 
      circle.style.left = `${e.pageX - width/2}px`;
      circle.style.top = `${e.pageY - height/2}px`;
  }, 80);
});
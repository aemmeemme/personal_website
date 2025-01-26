const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// Check for saved theme preference in localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    moonIcon.style.display = 'none'; // Hide moon icon in dark mode
    sunIcon.style.display = 'inline'; // Show sun icon in dark mode
}

// Toggle between dark and light mode
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline';
    } else {
        localStorage.setItem('theme', 'light');
        moonIcon.style.display = 'inline';
        sunIcon.style.display = 'none';
    }
});

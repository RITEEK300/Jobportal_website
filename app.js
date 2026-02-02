document.addEventListener('DOMContentLoaded', () => {
  // Navbar Toggle
  const navbar = document.querySelector('.header .flex .navbar');
  document.querySelector('.menu-btn').onclick = () => {
    navbar.classList.toggle('active');
  };
  window.onscroll = () => {
    navbar.classList.remove('active');
  };

  // Input Number Length Restriction
  document.querySelectorAll('input[type="number"]').forEach((inputNumber) => {
    inputNumber.oninput = () => {
      if (inputNumber.value.length > inputNumber.maxLength) {
        inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
      }
    };
  });

  // Heart Icon Toggle
  const heartIcons = document.querySelectorAll('.fa-heart');
  heartIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('active');
      icon.classList.toggle('fas');
      icon.classList.toggle('far');
      if (icon.classList.contains('active')) {
        icon.style.color = 'red';
        icon.style.backgroundColor = 'transparent';
        icon.style.transform = 'scale(1.3)';
      } else {
        icon.style.color = '';
        icon.style.backgroundColor = '';
        icon.style.transform = 'scale(1)';
      }
    });
  });

  // Dropdown Handling
  const handleDropdownClick = (dropdown) => {
    const output = dropdown.querySelector('.output');
    const lists = dropdown.querySelector('.lists');
    const items = lists.querySelectorAll('.items');

    // Toggle dropdown list visibility
    output.addEventListener('click', () => {
      lists.classList.toggle('active');
    });

    // Handle item selection
    items.forEach(item => {
      item.addEventListener('click', () => {
        output.value = item.textContent;
        lists.classList.remove('active');
      });
    });
  };

  // Initialize Dropdowns
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => handleDropdownClick(dropdown));

  // Close dropdowns when clicking outside
  document.addEventListener('click', (event) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(event.target)) {
        dropdown.querySelector('.lists').classList.remove('active');
      }
    });
  });

  // Form Submission
  const form = document.getElementById('jobFilterForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Gather form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      // Handle the data as needed (e.g., send to server, display results, etc.)
      console.log('Form Data:', data);
  
      // Optionally, display the filtered results
      displayFilteredResults(data);
    });
  }

  // Back Button Handling
  const backButton = document.getElementById('backButton');
  if (backButton) {
    backButton.addEventListener('click', () => {
      // Go back to the previous state in history
      history.back();
    });
  }

  // Function to display filtered results
  function displayFilteredResults(data) {
    // Implement your logic to display the filtered job results
    // For example, you might fetch data from a server and update the DOM
    const resultsContainer = document.createElement('div');
    resultsContainer.innerHTML = `<h2>Filtered Results:</h2><pre>${JSON.stringify(data, null, 2)}</pre>`;
    document.body.appendChild(resultsContainer);
  }

  // Job Title and Location Dropdown Handling
  const jobTitleInput = document.getElementById('job-title');
  const jobLocationInput = document.getElementById('job-location');

  const jobTitleList = document.getElementById('job-title-list');
  const jobLocationList = document.getElementById('job-location-list');

  const jobTitleItems = jobTitleList.querySelectorAll('.items');
  const jobLocationItems = jobLocationList.querySelectorAll('.items');

  const handleItemSelection = (input, list, items) => {
    items.forEach(item => {
      item.addEventListener('click', () => {
        input.value = item.textContent;
        list.style.display = 'none';
      });
    });

    input.addEventListener('focus', () => {
      list.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !list.contains(e.target)) {
        list.style.display = 'none';
      }
    });
  };

  handleItemSelection(jobTitleInput, jobTitleList, jobTitleItems);
  handleItemSelection(jobLocationInput, jobLocationList, jobLocationItems);
});

function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const hamburger = document.getElementById("hamburger");
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// Close the menu when clicking outside of it
document.addEventListener("click", function (event) {
  const navMenu = document.getElementById("navMenu");
  const hamburger = document.getElementById("hamburger");

  // Check if the click was outside the hamburger and the nav menu
  if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});
// This is for to update subject dynamically

let subjectCount = 0; // To keep track of the number of subjects

function createSubjectElement(index) {
  // Create a container for the subject
  const subjectDiv = document.createElement("div");
  subjectDiv.className = "subject-container";
  subjectDiv.classList.add("subject"); // This for to apply same styles for every new subject whch create
  subjectDiv.id = `subject${index}`;

  // Create the label
  const label = document.createElement("label");
  label.innerHTML = `<b>SELECT YOUR SUBJECT ${index} GRADE</b>`;
  label.style.fontFamily = "Arial, Helvetica, sans-serif";
  if (index > 9) {
    label.classList.add("small"); // Add the small class for font size
  }
  subjectDiv.appendChild(label);
  // Create a separate div for the select element
  const selectDiv = document.createElement("div");
  selectDiv.className = "select-container";

  // Create the select element
  const select = document.createElement("select");
  select.name = `SUBJECT${index}`;
  select.id = `subject${index}`;
  select.className = "subject-selection";
  select.innerHTML = `
    <option value="" selected>Select an option</option>
    <option value="O">O - OUTSTANDING</option>
    <option value="A+">A+ - EXCELLENT</option>
    <option value="A">A - VERY GOOD</option>
    <option value="B+">B+ - GOOD</option>
    <option value="B">B - ABOVE AVG</option>
    <option value="C">C - AVERAGE</option>
    <option value="D">D - PASS</option>
    <option value="F">F - FAIL</option>
    <option value="AB">AB - ABSENT</option>
`;

  // Append the select to the selectDiv
  selectDiv.appendChild(select);
  subjectDiv.appendChild(selectDiv);

  // Create the credit container
  const creditContainer = document.createElement("div");
  creditContainer.className = "credit-container";

  const creditInput = document.createElement("input");
  creditInput.type = "number";
  creditInput.id = `credit${index}`;
  creditInput.className = "credit-value";
  creditInput.value = 3;
  creditInput.step = 0.5;
  creditInput.min = 0;
  creditInput.max = 10;
  creditContainer.appendChild(creditInput);

  const minusButton = document.createElement("button");
  minusButton.className = "credit-button";
  minusButton.innerText = "-";
  minusButton.onclick = () => changeCredit(creditInput, -0.5);
  creditContainer.appendChild(minusButton);

  const plusButton = document.createElement("button");
  plusButton.className = "credit-button";
  plusButton.innerText = "+";
  plusButton.onclick = () => changeCredit(creditInput, 0.5);
  creditContainer.appendChild(plusButton);

  subjectDiv.appendChild(creditContainer);

  // Create a remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove Subject";
  removeButton.id="removebutton";
  removeButton.onclick = () => removeSubject(subjectDiv);
  subjectDiv.appendChild(removeButton);
  // Position the remove button in the grid

  return subjectDiv;
}
function setNumberOfSubjects() {
  // Get the number of subjects from the input field
  const inputCount = parseInt(document.getElementById("numSubjects").value);

  // Clear the existing subjects
  const subjectContainer = document.getElementById("subjectContainer");
  subjectContainer.innerHTML = ""; // Clear previous subjects
  // Append the "Add Subject" button after adding new subjects
  appendAddSubjectButton();
  // Update the subject count
  subjectCount = inputCount;

  // Create new subjects based on the input count
  for (let i = 1; i <= subjectCount; i++) {
    const newSubject = createSubjectElement(i);
    subjectContainer.appendChild(newSubject);
  }
  // Append the "Add Subject" button after adding new subjects
  appendAddSubjectButton();
  // Update the grid layout after setting the number of subjects
  updateGridLayout();
}
function addSubject() {
  subjectCount++;
  const subjectContainer = document.getElementById("subjectContainer");
  const newSubject = createSubjectElement(subjectCount);
  subjectContainer.appendChild(newSubject);
  // Add the "Add Subject" button to the end of the grid after the new subject is added
  appendAddSubjectButton();
  // Update the grid layout after adding a new subject
  updateGridLayout();
}
function appendAddSubjectButton() {
  const subjectContainer = document.getElementById("subjectContainer");
  // Check if the button container div already exists
  let buttonContainer = document.getElementById("buttonContainer");

  // If the button container doesn't exist, create it
  if (!buttonContainer) {
    buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer"; // Set an ID for the button container
    // Create the button
    const addButton = document.createElement("button");
    addButton.id = "addSubjectButton";
    addButton.innerText = "Add Subject";
    addButton.onclick = addSubject;

    const generateResults=document.createElement("button");
    generateResults.id="resultsDisplay";
    generateResults.innerText="CALCULATE RESULTS";
    generateResults.onclick = calculateCGPA;

    // Append the button to the button container
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(generateResults);
  } else {
    // If the button container already exists, remove it from its current position
    subjectContainer.removeChild(buttonContainer);
  }

  // Append the button container to the end of the subjectContainer
  subjectContainer.appendChild(buttonContainer);
}

function removeSubject(subjectDiv) {
  subjectDiv.remove();
  updateSubjectNumbers();
  updateGridLayout();
}

function updateSubjectNumbers() {
  const subjects = document.querySelectorAll(".subject-container");
  subjectCount = subjects.length; // Update the subject count
  subjects.forEach((subject, index) => {
    const newIndex = index + 1; // New index for the subject
    subject.id = `subject${newIndex}`;
    const label = subject.querySelector("label");
    label.innerHTML = `<b>SELECT YOUR SUBJECT ${newIndex} GRADE</b>`;
    const select = subject.querySelector("select");
    select.name = `SUBJECT${newIndex}`;
    select.id = `subject${newIndex}`;
    const creditInput = subject.querySelector('input[type="number"]');
    creditInput.id = `credit${newIndex}`;
  });
}

function changeCredit(input, change) {
  let currentValue = parseFloat(input.value);
  currentValue = Math.max(0, Math.min(10, currentValue + change)); // Ensure value stays within bounds
  input.value = currentValue.toFixed(1); // Update the input value
}
// Initialize with 7 subjects
for (let i = 0; i < 7; i++) {
  addSubject();
}
//LAYOUT FOR GRID HERE
function updateGridLayout() {
  const subjectContainer = document.getElementById("subjectContainer");
  const numberOfRows = Math.ceil(subjectCount / 1); // Assuming 1 column
  subjectContainer.style.gridTemplateRows = `repeat(${numberOfRows}, 75px) 50px` ; // Set row height to 75px
  if (window.innerWidth <= 780) {
    subjectContainer.style.gridTemplateRows = `repeat(${numberOfRows}, 160px) 50px`; // Increase height to 150px
  }
}
// Call updateGridLayout on window resize
window.addEventListener("resize", updateGridLayout);

// Call updateGridLayout initially to set the layout correctly on page load
updateGridLayout();


//CGPA CALCULATION SECTION
const gradeValues = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "D": 4,
  "F": 0,
  "AB": 0
};
function calculateCGPA() {
  let totalPoints = 0;
  let totalCredits = 0;
  let hasFailOrAbsent = false; // Flag to check for F or AB grades
  let allGradesSelected = true; // Flag to check if all grades are selected

  const subjects = document.querySelectorAll(".subject-container");
  subjects.forEach(subject => {
    const select = subject.querySelector("select");
    const creditInput = subject.querySelector('input[type="number"]');
    
    const grade = select.value;
    const credits = parseFloat(creditInput.value);

    // Check if a grade is selected
    if (grade === "") {
      allGradesSelected = false; // Set the flag if no grade is selected
    }

    if (credits > 0) { // Only consider subjects with positive credits
      if (grade === "F" || grade === "AB") {
        hasFailOrAbsent = true; // Set the flag if F or AB is found
      } else {
        totalPoints += gradeValues[grade] * credits;
        totalCredits += credits;
      }
    }
  });

  // Check if all grades are selected first
  if (!allGradesSelected) {
    alert("Please select a grade for every subject.");
    return; // Exit the function without calculating CGPA
  }

  // Check if there is any failing or absent grade
  if (hasFailOrAbsent) {
    const resultDisplay = document.getElementById("resultDisplay");
    resultDisplay.innerText = "You cannot calculate SGPA because you have a failing grade (F) or are marked absent (AB).";
    
    // Show the results div and hide the calculator
    document.getElementById("results").classList.remove("hidden");
    document.getElementById("cgpacalculator").classList.add("hidden");
    return; // Exit the function without calculating SGPA
  }

  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

// Round to one decimal place
const roundedCgpa = Math.round(cgpa * 10) / 10;

// Display the result in the resultDisplay paragraph
const resultDisplay = document.getElementById("resultDisplay");
resultDisplay.innerText = `Your SGPA is: ${roundedCgpa}`;

// Show the results div and hide the calculator
document.getElementById("results").classList.remove("hidden");
document.getElementById("cgpacalculator").classList.add("hidden");
}

//For dynamic loading of anchor tags
function showSections(section) {
  const sections = document.querySelectorAll('main > div');
  sections.forEach((sec) => {
      sec.classList.add('hidden'); // Hide each section
  });
  const selectedSection = document.getElementById(section);
  if (selectedSection) {
      selectedSection.classList.remove('hidden'); // Show the selected section
  }
}
// Initial display setup
showSections('cgpacalculator'); // Show calculator by default

// Function to handle back button clicks
function handleBackButtonClick() {
    showSections('cgpacalculator'); // Go back to calculator
}

// Set up event listeners for back buttons
document.getElementById('backButton').addEventListener('click', handleBackButtonClick);
document.getElementById('backToCalculatorFromGrades').addEventListener('click', handleBackButtonClick);
document.getElementById('backToCalculatorFromCredits').addEventListener('click', handleBackButtonClick);
document.getElementById('backToCalculatorFromAbout').addEventListener('click', handleBackButtonClick);




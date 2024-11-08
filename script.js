// Global variable to store profile image HTML
let existingImage = "";

// Function to load and preview the profile image
function loadImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      existingImage = `<img src="${e.target.result}" alt="Profile Image" style="width: 100px; height: 100px; border-radius: 50%;">`;
      // Display image immediately in the preview section
      document.getElementById("profile-image-container").innerHTML =
        existingImage;
    };
    reader.readAsDataURL(file);
  }
}

// Validation functions for name, contact, and email
function validateName() {
  const name = document.getElementById("name").value;
  const nameError = document.getElementById("name-error");

  if (name.trim() === "") {
    nameError.textContent = "Name is required.";
    nameError.style.display = "block";
  } else {
    nameError.style.display = "none";
  }
}

// New validation function for designation
function validateDesignation() {
  const designation = document.getElementById("designation").value;
  const designationError = document.getElementById("designation-error");

  if (designation.trim() === "") {
    designationError.textContent = "Designation is required.";
    designationError.style.display = "block";
  } else {
    designationError.style.display = "none";
  }
}

function validateContact() {
  const contact = document.getElementById("contact").value;
  const contactError = document.getElementById("contact-error");

  const phonePattern = /^[0-9]{11,12}$/;
  if (!phonePattern.test(contact)) {
    contactError.textContent =
      "Please enter a valid contact number (11-12 digits).";
    contactError.style.display = "block";
  } else {
    contactError.style.display = "none";
  }
}

function validateEmail() {
  const email = document.getElementById("email").value;
  const emailError = document.getElementById("email-error");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }
}
const validateForm = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Please fill out all required fields.");
    return false;
  }
  return true;
};

// Function to update the resume preview
function updateResume() {
  console.log("Update Resume button clicked");

  // Fetch input values
  const name = document.getElementById("name").value;
  const jobTitle = document.getElementById("designation").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const about = document.getElementById("about").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value.split("\n");
  const skillsInput = document.getElementById("skills").value;

  // Parse skills input into skill-progress pairs with default values for missing levels
  const skills = skillsInput.split(",").map((skill) => {
    const [name, level] = skill.split("-").map((s) => s.trim());
    return { name: name || "Unknown Skill", level: level || 50 }; // Default level 50 if empty
  });

  // Create the preview container with structured content
  const preview = document.getElementById("resume-preview");
  const educationList = education
    .split("\n")
    .map((item) => `<li>${item}</li>`)
    .join("");
  preview.innerHTML = `
    <div class="resume-container">
      <div class="resume-left">
        <div id="profile-image-container">${existingImage}</div>
        <h2>${name}</h2>
        <p>${jobTitle}</p>
        <div class="contact-info">
          <p><i class="fas fa-phone"></i> ${contact}</p>
          <p><i class="fas fa-envelope"></i> ${email}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${address}</p>
        </div>
      </div>
      <div class="resume-right">
        <div class="section about">
          <h3>About Me</h3>
          <p>${about}</p>
        </div>
        <div class="section education">
          <h3>Education</h3>
          <ul>${educationList}</ul>
        </div>
        <div class="section experience">
          <h3>Experience</h3>
          <ul>${experience.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
        <div class="section skills">
          <h3>Professional Skills</h3>
          ${skills
            .map(
              (skill) => `
            <div class="skill">
              <p>${skill.name}</p>
              <progress value="${skill.level}" max="100"></progress>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

// Function to download the resume as a PDF
function downloadPDF() {
  const resumeContent = document.getElementById("resume-preview");
  const options = {
    margin: 1,
    filename: "resume.pdf",
    html2canvas: { scale: 3 }, // Improved scale for higher quality
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().from(resumeContent).set(options).save();
}

// Edit button (just focus back on the form)
document.getElementById("go-back").onclick = () => {
  document.getElementById("resume-form").scrollIntoView();
};

// Generate Link (mock functionality)
document.getElementById("Linkbtn").onclick = () => {
  alert("Generate link functionality coming soon!");
};
const generatePDF = () => {
  const doc = new jsPDF();
  doc.text("Your Resume Content", 20, 30); // Add content dynamically
  doc.save("resume.pdf");
};

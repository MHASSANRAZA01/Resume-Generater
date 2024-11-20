const ResumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const ResumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
const ProfilePic = document.getElementById("profilePic") as HTMLImageElement;
const SkillsSection = document.getElementById("skill") as HTMLElement;

// Adding the resume generation logic
ResumeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Gather input values
  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const linkedin = (document.getElementById("linkedin") as HTMLInputElement)
    .value;
  const education = (document.getElementById("education") as HTMLInputElement)
    .value;
  const skills = (
    document.getElementById("skills") as HTMLInputElement
  ).value.split(",");
  const workExperience = (
    document.getElementById("workExperience") as HTMLTextAreaElement
  ).value;

  // Profile Image
  const profileImage = (
    document.getElementById("profileImage") as HTMLInputElement
  ).files?.[0];
  if (profileImage) {
    ProfilePic.src = URL.createObjectURL(profileImage);
  }

  // Populate resume sections
  document.getElementById("personalInfo")!.innerHTML = `
      <b>Name:</b> ${name}<br><br>
      <b>Phone:</b> ${phone}<br><br>
      <b>Email:</b> <a href="mailto:${email}">${email}</a><br><br>
      <b>LinkedIn:</b> <a href="${linkedin}" target="_blank">LinkedIn Profile</a>
  `;

  document.getElementById("educationInfo")!.innerText = education;
  const skillsHTML = skills.map((skill) => `<li>${skill.trim()}</li>`).join("");
  document.getElementById("skillsInfo")!.innerHTML = `<ul>${skillsHTML}</ul>`;
  document.getElementById("workExperienceInfo")!.innerText = workExperience;

  // Display the resume
  ResumeOutput.style.display = "block";

  // Dynamically create the shareable link and PDF download button
  createShareableLink(username);
});

// Function to dynamically create shareable link and PDF download button
function createShareableLink(username: string) {
  const shareableContainer = document.getElementById(
    "shareable-link-container"
  )!;
  shareableContainer.style.display = "block"; // Show the container

  // Generate a unique shareable link
  const baseURL = window.location.href;
  const shareableLink = `${baseURL}?username=${encodeURIComponent(username)}`;
  document.getElementById("shareable-link")!.textContent = shareableLink;
  document
    .getElementById("shareable-link")!
    .setAttribute("href", shareableLink);

  // Add PDF download functionality
  const downloadButton = document.getElementById("download-pdf")!;
  downloadButton.addEventListener("click", () => {
    downloadResumeAsPDF();
  });
}

// Function to download the resume as PDF
function downloadResumeAsPDF() {
  const { jsPDF } = window.jspdf; // Access the jsPDF object
  const resumeElement = document.getElementById("resumeOutput")!;

  // Use html2canvas to render the resume to an image
  html2canvas(resumeElement).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0); // Add image to PDF
    pdf.save("resume.pdf"); // Save the PDF
  });
}

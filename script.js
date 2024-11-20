var ResumeForm = document.getElementById("resumeForm");
var ResumeOutput = document.getElementById("resumeOutput");
var ProfilePic = document.getElementById("profilePic");
var SkillsSection = document.getElementById("skill");
// Adding the resume generation logic
ResumeForm.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    // Gather input values
    var username = document.getElementById("username")
        .value;
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var linkedin = document.getElementById("linkedin")
        .value;
    var education = document.getElementById("education")
        .value;
    var skills = document.getElementById("skills").value.split(",");
    var workExperience = document.getElementById("workExperience").value;
    // Profile Image
    var profileImage = (_a = document.getElementById("profileImage").files) === null || _a === void 0 ? void 0 : _a[0];
    if (profileImage) {
        ProfilePic.src = URL.createObjectURL(profileImage);
    }
    // Populate resume sections
    document.getElementById("personalInfo").innerHTML = "\n      <b>Name:</b> ".concat(name, "<br><br>\n      <b>Phone:</b> ").concat(phone, "<br><br>\n      <b>Email:</b> <a href=\"mailto:").concat(email, "\">").concat(email, "</a><br><br>\n      <b>LinkedIn:</b> <a href=\"").concat(linkedin, "\" target=\"_blank\">LinkedIn Profile</a>\n  ");
    document.getElementById("educationInfo").innerText = education;
    var skillsHTML = skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join("");
    document.getElementById("skillsInfo").innerHTML = "<ul>".concat(skillsHTML, "</ul>");
    document.getElementById("workExperienceInfo").innerText = workExperience;
    // Display the resume
    ResumeOutput.style.display = "block";
    // Dynamically create the shareable link and PDF download button
    createShareableLink(username);
});
// Function to dynamically create shareable link and PDF download button
function createShareableLink(username) {
    var shareableContainer = document.getElementById("shareable-link-container");
    shareableContainer.style.display = "block"; // Show the container
    // Generate a unique shareable link
    var baseURL = window.location.href;
    var shareableLink = "".concat(baseURL, "?username=").concat(encodeURIComponent(username));
    document.getElementById("shareable-link").textContent = shareableLink;
    document
        .getElementById("shareable-link")
        .setAttribute("href", shareableLink);
    // Add PDF download functionality
    var downloadButton = document.getElementById("download-pdf");
    downloadButton.addEventListener("click", function () {
        downloadResumeAsPDF();
    });
}
// Function to download the resume as PDF
function downloadResumeAsPDF() {
    var jsPDF = window.jspdf.jsPDF; // Access the jsPDF object
    var resumeElement = document.getElementById("resumeOutput");
    // Use html2canvas to render the resume to an image
    html2canvas(resumeElement).then(function (canvas) {
        var imgData = canvas.toDataURL("image/png");
        var pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0); // Add image to PDF
        pdf.save("resume.pdf"); // Save the PDF
    });
}

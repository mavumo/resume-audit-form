let currentStep = 0;
const steps = document.querySelectorAll(".form-step");
const form = document.getElementById("auditForm");

function nextStep() {
  if (currentStep === 2) {
    // Start analysis
    steps[currentStep].classList.remove("active");
    currentStep++;
    steps[currentStep].classList.add("active");
    analyzeResume();
  } else {
    steps[currentStep].classList.remove("active");
    currentStep++;
    steps[currentStep].classList.add("active");
  }
}

function analyzeResume() {
  const formData = new FormData(form);
  fetch("https://resume-audit-form.onrender.com", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        showResults(data);
      }, 2000); // simulate loading
    });
}

function showResults(data) {
  steps[currentStep].classList.remove("active");
  currentStep++;
  steps[currentStep].classList.add("active");

  document.getElementById("score").innerText = data.score;
  document.getElementById("feedback").innerHTML = `
    <strong>Feedback:</strong><br>${data.summary}<br><ul>
    ${data.suggestions.map(s => `<li>${s}</li>`).join('')}
    </ul>
  `;

  if (data.score <= 6) {
    document.getElementById("upsell").innerHTML = `
      <h3>Improve Your Resume & Boost Your Chances</h3>
      <p>Join <strong>Jobbyist Pro</strong> for a resume rewrite and personalized job matching.</p>
      <a href="https://careers.jobbyist.co.za/upgrade" class="button">Upgrade Now</a>
    `;
  } else {
    document.getElementById("upsell").innerHTML = `
      <p>Nice work! Want to share your results or help a friend?</p>
    `;
  }
}

function addSubjectRow() {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" class="subjectName"></td>
    <td><input type="number" class="halfObt"></td>
    <td><input type="number" class="halfMax"></td>
    <td><input type="number" class="annualObt"></td>
    <td><input type="number" class="annualMax"></td>
    <td><button onclick="this.parentElement.parentElement.remove()">❌</button></td>
  `;
  document.getElementById("subjectBody").appendChild(row);
}

function generateMarksheet() {
  const schoolType = document.getElementById("schoolType").value;
  document.getElementById("displaySchoolType").textContent = schoolType;

  document.getElementById("displayMobile").textContent = document.getElementById("mobileNo").value;
  document.getElementById("displayUdise").textContent = document.getElementById("udiseCode").value;
  document.getElementById("displaySerial").textContent = document.getElementById("serialNo").value;

  document.getElementById("dName").textContent = document.getElementById("studentName").value;
  document.getElementById("dFather").textContent = document.getElementById("fatherName").value;
  document.getElementById("dMother").textContent = document.getElementById("motherName").value;
  document.getElementById("dDOB").textContent = document.getElementById("dob").value;
  document.getElementById("dClass").textContent = document.getElementById("className").value;
  document.getElementById("dRoll").textContent = document.getElementById("rollNo").value;
  document.getElementById("dPen").textContent = document.getElementById("penNumber").value;
  document.getElementById("dAttendance").textContent = document.getElementById("attendance").value;
  document.getElementById("dClassPosition").textContent = document.getElementById("classPosition").value;

  const photo = document.getElementById("studentPhoto").files[0];
  const logo = document.getElementById("schoolLogo").files[0];

  if (photo) {
    const reader = new FileReader();
    reader.onload = () => document.getElementById("displayPhoto").src = reader.result;
    reader.readAsDataURL(photo);
  }

  if (logo) {
    const reader = new FileReader();
    reader.onload = () => {
      const logoURL = reader.result;
      document.getElementById("displayLogo").src = logoURL;
      document.documentElement.style.setProperty('--bg-watermark', `url(${logoURL})`);
    };
    reader.readAsDataURL(logo);
  }

  let totalCombined = 0, totalMaxCombined = 0;
  const displaySubjects = document.getElementById("displaySubjects");
  displaySubjects.innerHTML = "";

  document.querySelectorAll("#subjectBody tr").forEach(row => {
    const subject = row.querySelector(".subjectName").value;
    const halfObt = parseFloat(row.querySelector(".halfObt").value) || 0;
    const halfMax = parseFloat(row.querySelector(".halfMax").value) || 0;
    const annualObt = parseFloat(row.querySelector(".annualObt").value) || 0;
    const annualMax = parseFloat(row.querySelector(".annualMax").value) || 0;

    const totalObt = halfObt + annualObt;
    const totalMax = halfMax + annualMax;
    const percent = (totalObt / totalMax) * 100;
    const grade = getGrade(percent);
    const passFail = totalObt >= totalMax * 0.33 ? "✔️" : "❌";

    totalCombined += totalObt;
    totalMaxCombined += totalMax;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${subject}</td>
      <td>${halfObt}/${halfMax}</td>
      <td>${annualObt}/${annualMax}</td>
      <td>${totalObt}</td>
      <td>${totalMax}</td>
      <td>${grade}</td>
      <td>${passFail}</td>
    `;
    displaySubjects.appendChild(tr);
  });

  const finalPercentage = (totalCombined / totalMaxCombined * 100).toFixed(2);
  document.getElementById("totalCombined").textContent = totalCombined;
  document.getElementById("totalMaxCombined").textContent = totalMaxCombined;
  document.getElementById("percentage").textContent = finalPercentage + "%";
  document.getElementById("grade").textContent = getGrade(finalPercentage);
  document.getElementById("division").textContent = getDivision(finalPercentage);

  document.getElementById("marksheet").style.display = "block";
}

function getGrade(p) {
  p = parseFloat(p);
  if (p >= 91) return "A1";
  if (p >= 81) return "A2";
  if (p >= 71) return "B1";
  if (p >= 61) return "B2";
  if (p >= 51) return "C1";
  if (p >= 41) return "C2";
  if (p >= 33) return "D";
  return "E";
}

function getDivision(p) {
  p = parseFloat(p);
  if (p >= 60) return "First";
  if (p >= 45) return "Second";
  if (p >= 33) return "Third";
  return "Fail";
}

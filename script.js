const form = document.getElementById("resultForm");
const clearBtn = document.getElementById("clearBtn");
const newStudentBtn = document.getElementById("newStudentBtn");
const resultSection = document.getElementById("resultSection");
const resultTable = document.getElementById("resultTable");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();

    const marks = [
        Number(document.getElementById("subject1").value),
        Number(document.getElementById("subject2").value),
        Number(document.getElementById("subject3").value),
        Number(document.getElementById("subject4").value),
        Number(document.getElementById("subject5").value)
    ];

    // Validate student details
    if (name === "" || roll === "") {
        alert("Please enter student name and roll number.");
        return;
    }

    // Validate marks
    const markInputs = [
        document.getElementById("subject1"),
        document.getElementById("subject2"),
        document.getElementById("subject3"),
        document.getElementById("subject4"),
        document.getElementById("subject5")
    ];

    for (let input of markInputs) {
        if (input.value === "" || input.value < 0 || input.value > 100) {
            alert("Please enter marks between 0 and 100 for all subjects.");
            return;
        }
    }

    // Calculate total
    const total = marks.reduce((sum, mark) => sum + mark, 0);

    // Calculate percentage
    const percentage = total / marks.length;

    // Calculate grade
    let grade;

    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    // Pass/Fail
    const result = marks.every(mark => mark >= 35)
        ? "PASS"
        : "FAIL";

    // Display result
    resultTable.innerHTML = `
        <tr>
            <td>${name}</td>
            <td>${roll}</td>
            <td>${total} / 500</td>
            <td>${percentage.toFixed(2)}%</td>
            <td>${grade}</td>
            <td>${result}</td>
        </tr>
    `;

    resultSection.style.display = "block";
});

// Clear form
clearBtn.addEventListener("click", function () {
    form.reset();
    resultSection.style.display = "none";
    resultTable.innerHTML = "";
});

// Enter another student
newStudentBtn.addEventListener("click", function () {
    form.reset();
    resultTable.innerHTML = "";
    resultSection.style.display = "none";

    document.getElementById("name").focus();
});
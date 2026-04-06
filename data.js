let chart;

function searchStudent(){

let searchValue = document.getElementById("studentSearch").value.trim().toLowerCase();
let details = document.getElementById("studentDetails");

fetch("Student_Performance_Dataset.csv")
.then(response => response.text())
.then(text => {

let rows = text.trim().split("\n");
let found = false;

for(let i=1;i<rows.length;i++){

let cols = rows[i].trim().split(",");

let student = {
id: cols[0],
age: cols[1],
gender: cols[2],
class: cols[3],
study: cols[4],
math: cols[5],
final: cols[13],
performance: cols[14],
status: cols[15]
};

if(student.id.toLowerCase() === searchValue){

found = true;

details.innerHTML = `
<h3>Student Details</h3>

<p><b>Student ID:</b> ${student.id}</p>
<p><b>Age:</b> ${student.age}</p>
<p><b>Gender:</b> ${student.gender}</p>
<p><b>Class:</b> ${student.class}</p>

<p><b>Study Hours:</b> ${student.study}</p>

<p><b>Math Score:</b> ${student.math}</p>

<p><b>Final Percentage:</b> ${student.final}</p>

<p><b>Performance Level:</b> ${student.performance}</p>

<p><b>Status:</b> ${student.status}</p>
`;

const ctx = document.getElementById("performanceChart").getContext("2d");

if(chart){
chart.destroy();
}

chart = new Chart(ctx,{
type:"bar",
data:{
labels:["Math Score","Final Percentage"],
datasets:[{
label:"Student Performance",
data:[student.math, student.final],
backgroundColor:["blue","green"]
}]
},
options:{
scales:{
y:{
beginAtZero:true,
max:100
}
}
}
});

break;
}

}

if(!found){
details.innerHTML = "<p>Student not found</p>";
}

});

}
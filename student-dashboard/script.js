let csvData = [];

/* LOAD DATASET */

fetch("student_dataset_100.csv")
.then(res => res.text())
.then(data => {

csvData = data.trim().split("\n").slice(1).map(r => r.split(","));

console.log("Dataset Loaded:", csvData.length);

loadDashboard();
loadCharts();
loadRiskStudents();
loadTopStudents();

})
.catch(error => console.error("CSV Loading Error:", error));


/* SECTION NAVIGATION */

function showSection(id){

["dashboardSection","performanceSection","reportsSection"]
.forEach(s => document.getElementById(s).style.display = "none");

document.getElementById(id).style.display = "block";

}

showSection("dashboardSection");


/* NAVBAR STUDENT NAME */

let studentId = localStorage.getItem("studentId");

if(studentId){
document.getElementById("studentName").innerText = studentId;
}


/* LOGOUT */

function logout(){

localStorage.clear();
window.location = "login.html";

}


/* DASHBOARD STATS */

function loadDashboard(){

document.getElementById("totalStudents").innerText = csvData.length;

let pass = 0;

csvData.forEach(r => {
if(parseFloat(r[7]) >= 5) pass++;
});

let fail = csvData.length - pass;

document.getElementById("passStudents").innerText = pass;
document.getElementById("failStudents").innerText = fail;

document.getElementById("passRate").innerText =
((pass/csvData.length)*100).toFixed(1) + "%";

}


/* CHARTS */

function loadCharts(){

let pass = 0, fail = 0;

csvData.forEach(r => {

if(parseFloat(r[7]) >= 5) pass++;
else fail++;

});

new Chart(document.getElementById("overallChart"),{

type:"pie",

data:{
labels:["Pass","Fail"],
datasets:[{
data:[pass,fail],
backgroundColor:["green","red"]
}]
}

});


/* CGPA DISTRIBUTION */

let ranges=[0,0,0,0];

csvData.forEach(r=>{

let cgpa=parseFloat(r[7]);

if(cgpa < 5) ranges[0]++;
else if(cgpa < 7) ranges[1]++;
else if(cgpa < 9) ranges[2]++;
else ranges[3]++;

});

new Chart(document.getElementById("cgpaChart"),{

type:"bar",

data:{
labels:["<5","5-7","7-9","9+"],
datasets:[{
label:"Students",
data:ranges,
backgroundColor:"#177a6b"
}]
}

});

}


/* AT RISK STUDENTS */

function loadRiskStudents(){

let table = document.getElementById("riskTable");

csvData.forEach(r => {

let cgpa = parseFloat(r[7]);

if(cgpa < 5){

let row = table.insertRow();

row.insertCell(0).innerText = r[0];
row.insertCell(1).innerText = r[1];
row.insertCell(2).innerText = cgpa;
row.insertCell(3).innerText = "At Risk";

}

});

}


/* TOP 10 STUDENTS */

function loadTopStudents(){

let table = document.getElementById("topStudents");

let sorted = [...csvData].sort((a,b) => parseFloat(b[7]) - parseFloat(a[7]));

sorted.slice(0,10).forEach((s,i)=>{

let row = table.insertRow();

row.insertCell(0).innerText = i+1;
row.insertCell(1).innerText = s[0];
row.insertCell(2).innerText = s[7];

});

}


/* SEARCH STUDENT */

function searchStudent(){

let id = document.getElementById("searchId").value.trim().toUpperCase();

let student = csvData.find(r => r[0].toUpperCase() === id);

let result = document.getElementById("studentResult");

if(student){

result.innerHTML = `
<b>Name:</b> ${student[1]} <br>
<b>Gender:</b> ${student[2]} <br>
<b>CGPA:</b> ${student[7]}
`;

}else{

result.innerHTML = "<span style='color:red'>Student Not Found</span>";

}

}
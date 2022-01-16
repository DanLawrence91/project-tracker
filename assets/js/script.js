// When a user opens site they should see ticking clock, date and table header with card on right hand side with an input and button
var timer = $("#dateTime")
// Time shows hh mm ss and date shows day month and year
setInterval(function() {
    var timeDate = moment().format("HH:mm:ss, Do MMMM YYYY")
    timer.text(timeDate)
}, 1000)


// When page loads time starts 
// timer is element that updates every second

// Card has instructions on info needed and a button. only button on first page

// When clicked - show dialog and a form appears with 4 inputs for Project Name, Type, Wage and Due date
// Project Name is text
// Type is dropdown
// Wage is number
// Due date is calendar

// This form has two buttons - submit and close

// If close pressed it just closes and doesnt save

// If submit pressed close dialog and the information input forms a row on the table 
// and the other three columns also filled out based on info

// Table has 7 columns: project name, project type, hourly wage, due date, days until due date, total earnings, delete
// If i click on delete - delete an entry
// When a user opens site they should see ticking clock, date and table header with card on right hand side with an input and button
var timer = $("#dateTime")
var projectName = $("#project-name-input")
var projectType = $("#project-type-input")
var hourlyRate = $("#hourly-rate-input")
var dueDate = $("#due-date-input")
var projectDisplay = $("#project-display")
var projectModal = $("#project-modal")
var projectForm = $("#project-form")
var daysDiff = ""
var totalEarnings;


// When page loads time starts 
// timer is element that updates every second
function startTimer() {
    setInterval(function() {
        var timeDate = moment().format("HH:mm:ss, Do MMMM YYYY");
        timer.text(timeDate);
    }, 1000)    
}

startTimer()

function init() {
    displayData = JSON.parse(localStorage.getItem('project-data'));

    console.log(displayData.name)

    var projectRow = $("<tr>").addClass('pRow');
    var projectNameData = $("<td>").addClass('p-2').text(displayData.name)
    var projectTypeData = $("<td>").addClass('p-2').text(displayData.type)
    var hourlyRateData = $("<td>").addClass('p-2').text("$" + displayData.rate)
    var projectDueData = $("<td>").addClass('p-2').text(displayData.due)
    var daysLeft = $("<td>").addClass('p-2').text(displayData.daysleft)
    var potentialEarnings = $("<td>").addClass('p-2').text("$" + displayData.earnings)
    var deleteRow = $("<td>").addClass("BTN-delete-project text-center p-2").text("X")
    
    projectRow.append(
        projectNameData,
        projectTypeData,
        hourlyRateData,
        projectDueData,
        daysLeft,
        potentialEarnings,
        deleteRow
    );

    projectDisplay.append(projectRow);
    
}

// When data added to modal create rows in table based on this info
function createRow (pName, pType, pRate, pDate,) {
    var projectRow = $("<tr>").addClass('pRow');
    var projectNameData = $("<td>").addClass('p-2').text(pName)
    var projectTypeData = $("<td>").addClass('p-2').text(pType)
    var hourlyRateData = $("<td>").addClass('p-2').text("$" + pRate)
    var projectDueData = $("<td>").addClass('p-2').text(pDate)

    // works out how many days until project due
    daysDiff = moment(pDate, "MM/DD/YYYY").diff(moment(), "days");
    var daysLeft = $("<td>").addClass('p-2').text(daysDiff)

    // work out potential earnings
    totalEarnings = calculateEarnings(pRate, daysDiff);
    var potentialEarnings = $("<td>").addClass('p-2').text("$" + totalEarnings)

    var deleteRow = $("<td>").addClass("BTN-delete-project text-center p-2").text("X")

    // add rows to table based on inputs from modal
    projectRow.append(
        projectNameData,
        projectTypeData,
        hourlyRateData,
        projectDueData,
        daysLeft,
        potentialEarnings,
        deleteRow
    );

    projectDisplay.append(projectRow);

    projectModal.modal('hide');

}

// work out earnings for project based on 8 hour work day
function calculateEarnings (rate, days) {
    var dailyTotal = rate * 8;
    var projectTotal = dailyTotal * days;
    return projectTotal;
}

// function to delete the area clicked
function handleRemoveItem(event) {
    var btnClicked = $(event.target);
    btnClicked.parent('tr').remove();
}

function handleFormSubmission(event) {
    event.preventDefault();

    var projectNameEl = projectName.val();
    var projectTypeEl = projectType.val();
    var projectRateEl = hourlyRate.val();
    var dueDateEl = dueDate.val();

    createRow(projectNameEl, projectTypeEl, projectRateEl, dueDateEl)

    projectForm[0].reset();

    var data = {
        name: projectNameEl,
        type: projectTypeEl,
        rate: projectRateEl,
        due: dueDateEl,
        daysleft: daysDiff,
        earnings: totalEarnings
    }

    localStorage.setItem('project-data', JSON.stringify(data))
}

projectForm.on("submit", handleFormSubmission)
// delete row when clicked using event delegation
projectDisplay.on("click", ".BTN-delete-project", handleRemoveItem)
// calendar to pick due date from
dueDate.datepicker({ minDate: 1 });
init()
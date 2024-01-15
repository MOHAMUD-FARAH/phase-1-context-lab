// Helper function to calculate hours between two timestamps
const hoursWorkedBetween = (timeIn, timeOut) => {
    const startTime = new Date(timeIn);
    const endTime = new Date(timeOut);
    const timeDiff = endTime - startTime;
    return timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours
};

// Function to create an employee record
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

// Function to add a timeIn event to an employee's record
function createTimeInEvent(dateTime) {
    const [date, hour] = dateTime.split(' ');
    this.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour, 10),
    });
    return this;
}

// Function to add a timeOut event to an employee's record
function createTimeOutEvent(dateTime) {
    const [date, hour] = dateTime.split(' ');
    this.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour, 10),
    });
    return this;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);
    return hoursWorkedBetween(timeInEvent.hour, timeOutEvent.hour);
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
}

// Function to calculate all wages for an employee
function allWagesFor() {
    return this.timeInEvents.reduce((totalWages, timeInEvent) => {
        const date = timeInEvent.date;
        return totalWages + wagesEarnedOnDate.call(this, date);
    }, 0);
}

// Function to calculate payroll for an array of employee records
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
}

// Exporting functions for testing
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll,
};

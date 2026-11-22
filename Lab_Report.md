## Full Lab Report


## Abstract
 This project offers an employees presence and leave management system for offices, universityes, NGOs and small businesses, which is implemented using semantic HTML, CSS, Grid/Flexbox and vanilla JavaScript. The prototype functions without a server because sample bangladeshi employe name and local initial based avatar are given and leave request are stored in the browser local storage. 


## Table of Contents

1. Introduction and Objectives  
2. Tools and Technologies  
3. Website Design  
4. Implementation with Code and Output  
5. Final Website Screenshots  
6. Main Website Pages  
7. Responsiveness  
8. Limitations and Future Improvements  
9. Conclusion

## 1. Introduction and Objectives

Paper-based attendance and leave management systems have a tendency to produce errors and double bookings and can delay leave approvals. The aim of this project is to take the help of one simple MIS interface to the administrator to maintain the status of the employee and to check attendance and submit leave requests daily. 

The main objectives are to:

•	Provide a prominent and clear attendance report. 
•	Keep an up-to-date and available list of employees. 
•	Show daily check-in / check-out / work hour information 
•	Use a Leave Request Form to collect leave requests 
•	Temporary archive prototype submissions locally. 
•	Make an interface available for the desktop and mobile device. 

## 2. Tools and Technologies

- **HTML5:** page structure and accessible form elements.
- **CSS3:** layout, colors, cards, tables, responsive breakpoints and visual states.
- **JavaScript (ES6):** view navigation, search/filter, dynamic rendering, form handling and localStorage.
- **Browser localStorage:** temporary client-side persistence for leave requests.
- **Headless Chromium:** output and responsive screenshot testing.

## 3. Website Design

Design a navy sidebar, a light work space background. The fixed navigation menu are used to access dashboard, employe, attendance and leave request table and for the structure record, a table is used. The green, orange and red badge provide information on active, delayed and missed states. 
 The 8 fictional employee records included in the are: Arafat Hossain, Nusrat Jahan, Tanvir Ahmed, Sumaiya Rahman, Sakib Khan, Moumita Das, Fahim Chowdhury and Jannatul Ferdous. The avatar is not a photo of real people, but a local initial based one and UI asset. 

## 4. Implementation with Code and Output

The website is divided into three main source files:

- `index.html` contains the application shell, sidebar, topbar and script/style references.
- `style.css` contains theme variables, cards, tables, forms and responsive rules.
- `app.js` contains demo data and the four rendered views.

Important implementation features include:

```js
let leaves = JSON.parse(localStorage.getItem('attendease_leaves') || '[]');

function filterEmployees(q) {
  const list = employees.filter(e =>
    `${e.name} ${e.role} ${e.dept}`.toLowerCase().includes(q.toLowerCase())
  );
  document.getElementById('employeeRows').innerHTML = employeeRows(list);
}
```

The code uses client-side rendering for quick navigation. The leave form adds a new request to an array and saves it with `localStorage.setItem()`. The output is a working front-end demo; it does not yet include authentication or a database.

## 5. Final Website Screenshots

### Dashboard — Desktop

![Dashboard desktop](screenshots/dashboard-desktop.png)

### Employees — Desktop

![Employees desktop](screenshots/employees-desktop.png)

### Leave Requests — Desktop

![Leave request page](screenshots/leave-desktop.png)

### Dashboard — Mobile

![Dashboard mobile](screenshots/dashboard-mobile.png)

## 6. Main Website Pages

### Dashboard

On the Dashboard you'll see the overall employee, present employee, pending leave item and absence. It also has a small attendance list and recent activity panel. 

### Employees

In the Employee page, 8 sample records will be displayed with the following details: Bangla name, Department, Job role, Email, Status. Search box filter by name, role or department and the dropdown filter department. 

### Attendance

The attendance page display a daily register with employee, date, check in, check-out, work hours and status. The export button is a d action that can be later bound with the CSV and PDF generation. 


### Leave Requests

The leave request page includes an employee selector, leave type, date and reason field, when the request is submitted it will show in the status panel and be stored in local storage. 

## 7. Responsiveness on Different Devices

But in smaller screens (<900px) the sidebar slides to the side using the menu button, on screens <570px forms take up 1 column while the text is scaled down, and desktop-only date control is hidden. The mobile screenshot confirmed  the dashboard remain read able  390px viewport.
.

## 8. Limitations and Future Improvements

This prototype has no server side database, authentication, permission control  and biometric integration. Only data for the same browser is saved. The attendance record is a sample record and not related to a clock in device. In the next version, it could introduce a NodeJS and PHP backend, a MySQL database, role based access, real approval state, CSV/PDF export, email notification and secure password handling. 

## 9. Conclusion

The prototype of the Attend Ease system has been developed to fulfill the primary requirement that is a small employee attendance and leave management system. It shows a clean information design, valuable MIS dashboard, interactive filtering, local leave submission, and responsive design. The source file are easy to extend by future students and developers to become a production system. 
 Academic integrity note: This is an original project and a report must be reviewed, edited with the student's observation and submitted as per the institute's policy. No service can guarantee, and ethically remove, the outcome of the AI detection and it's the student's responsibility to be the author and the citers.

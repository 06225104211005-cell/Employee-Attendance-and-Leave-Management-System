
/* ==========================================
   STAFFDESK - EMPLOYEE MANAGEMENT SYSTEM
   Main JavaScript File
   Admin: Shahinur
========================================== */


/* ==========================================
   1. LOCAL STORAGE SETUP
========================================== */

const STORAGE_KEYS = {
    employees: "staffdesk_employees",
    attendance: "staffdesk_attendance",
    leaves: "staffdesk_leaves"
};

function loadData(key, fallback = []) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
        console.error("Could not load saved data:", error);
        return fallback;
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


/* ==========================================
   2. DATE AND HELPER FUNCTIONS
========================================== */

function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getCurrentMonth() {
    return getToday().slice(0, 7);
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function formatDate(date) {
    if (!date) return "-";

    const parts = date.split("-");

    if (parts.length !== 3) return date;

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function getEmployee(id) {
    return employees.find(emp => emp.id === id);
}

function getEmployeeName(id) {
    const employee = getEmployee(id);
    return employee ? employee.name : "Unknown Employee";
}

function getEmployeePhoto(employee) {
    return employee.photo ||
        `https://i.pravatar.cc/100?u=${encodeURIComponent(employee.id)}`;
}

function createId(prefix) {
    return prefix + Date.now() + Math.floor(Math.random() * 1000);
}

function showMessage(message) {
    alert(message);
}


/* ==========================================
   3. DEMO EMPLOYEE DATA
========================================== */

const defaultEmployees = [

    {
        id: "EMP001",
        name: "Ayesha Rahman",
        department: "Human Resources",
        position: "HR Manager",
        phone: "01712345601",
        photo: "https://i.pravatar.cc/100?img=47"
    },

    {
        id: "EMP002",
        name: "Arif Hossain",
        department: "IT Department",
        position: "Software Developer",
        phone: "01712345602",
        photo: "https://i.pravatar.cc/100?img=12"
    },

    {
        id: "EMP003",
        name: "Nusrat Jahan",
        department: "Finance",
        position: "Accountant",
        phone: "01712345603",
        photo: "https://i.pravatar.cc/100?img=44"
    },

    {
        id: "EMP004",
        name: "Tanvir Ahmed",
        department: "Marketing",
        position: "Marketing Executive",
        phone: "01712345604",
        photo: "https://i.pravatar.cc/100?img=13"
    },

    {
        id: "EMP005",
        name: "Sadia Islam",
        department: "Administration",
        position: "Office Executive",
        phone: "01712345605",
        photo: "https://i.pravatar.cc/100?img=49"
    },

    {
        id: "EMP006",
        name: "Rakib Hasan",
        department: "IT Department",
        position: "Web Designer",
        phone: "01712345606",
        photo: "https://i.pravatar.cc/100?img=14"
    },

    {
        id: "EMP007",
        name: "Mim Akter",
        department: "Human Resources",
        position: "HR Assistant",
        phone: "01712345607",
        photo: "https://i.pravatar.cc/100?img=45"
    },

    {
        id: "EMP008",
        name: "Sabbir Ahmed",
        department: "Finance",
        position: "Finance Officer",
        phone: "01712345608",
        photo: "https://i.pravatar.cc/100?img=15"
    },

    {
        id: "EMP009",
        name: "Farzana Akter",
        department: "Marketing",
        position: "Sales Executive",
        phone: "01712345609",
        photo: "https://i.pravatar.cc/100?img=48"
    },

    {
        id: "EMP010",
        name: "Mehedi Hasan",
        department: "Operations",
        position: "Operations Manager",
        phone: "01712345610",
        photo: "https://i.pravatar.cc/100?img=11"
    },

    {
        id: "EMP011",
        name: "Jannatul Ferdous",
        department: "Administration",
        position: "Receptionist",
        phone: "01712345611",
        photo: "https://i.pravatar.cc/100?img=43"
    },

    {
        id: "EMP012",
        name: "Imran Hossain",
        department: "Operations",
        position: "Office Assistant",
        phone: "01712345612",
        photo: "https://i.pravatar.cc/100?img=16"
    }

];


/* ==========================================
   4. LOAD APPLICATION DATA
========================================== */

let employees = loadData(
    STORAGE_KEYS.employees,
    defaultEmployees
);

let attendance = loadData(
    STORAGE_KEYS.attendance,
    []
);

let leaves = loadData(
    STORAGE_KEYS.leaves,
    []
);


/* ==========================================
   5. DEMO ATTENDANCE DATA
========================================== */

if (!localStorage.getItem(STORAGE_KEYS.attendance)) {

    const today = getToday();

    attendance = [

        {
            id: createId("ATT"),
            employeeId: "EMP001",
            date: today,
            checkIn: "09:00",
            checkOut: "17:00",
            status: "Present"
        },

        {
            id: createId("ATT"),
            employeeId: "EMP002",
            date: today,
            checkIn: "09:15",
            checkOut: "17:00",
            status: "Late"
        },

        {
            id: createId("ATT"),
            employeeId: "EMP003",
            date: today,
            checkIn: "08:55",
            checkOut: "17:10",
            status: "Present"
        },

        {
            id: createId("ATT"),
            employeeId: "EMP004",
            date: today,
            checkIn: "",
            checkOut: "",
            status: "Absent"
        },

        {
            id: createId("ATT"),
            employeeId: "EMP005",
            date: today,
            checkIn: "09:05",
            checkOut: "17:00",
            status: "Present"
        },

        {
            id: createId("ATT"),
            employeeId: "EMP006",
            date: today,
            checkIn: "09:20",
            checkOut: "17:00",
            status: "Late"
        }

    ];

    saveData(STORAGE_KEYS.attendance, attendance);
}


/* ==========================================
   6. DEMO LEAVE DATA
========================================== */

if (!localStorage.getItem(STORAGE_KEYS.leaves)) {

    leaves = [

        {
            id: createId("LEV"),
            employeeId: "EMP003",
            type: "Sick Leave",
            start: getToday(),
            end: getToday(),
            reason: "Feeling unwell.",
            status: "Pending"
        },

        {
            id: createId("LEV"),
            employeeId: "EMP007",
            type: "Casual Leave",
            start: getToday(),
            end: getToday(),
            reason: "Personal work.",
            status: "Approved"
        },

        {
            id: createId("LEV"),
            employeeId: "EMP009",
            type: "Annual Leave",
            start: getToday(),
            end: getToday(),
            reason: "Family visit.",
            status: "Pending"
        }

    ];

    saveData(STORAGE_KEYS.leaves, leaves);
}


/* ==========================================
   7. SAVE ALL DATA
========================================== */

function saveAllData() {

    saveData(STORAGE_KEYS.employees, employees);

    saveData(STORAGE_KEYS.attendance, attendance);

    saveData(STORAGE_KEYS.leaves, leaves);

}


/* ==========================================
   8. NAVIGATION SYSTEM
========================================== */

const pageTitles = {

    dashboard: "Dashboard Overview",

    employees: "Employee Management",

    attendance: "Attendance Management",

    leaves: "Leave Management",

    reports: "Monthly Attendance Reports"

};


function showSection(sectionId, clickedLink) {

    const section = document.getElementById(sectionId);

    if (!section) return;

    document.querySelectorAll(".section").forEach(item => {
        item.classList.remove("active");
    });

    section.classList.add("active");


    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });


    if (clickedLink && clickedLink.classList.contains("nav-link")) {

        clickedLink.classList.add("active");

    } else {

        document.querySelectorAll(".nav-link").forEach(link => {

            const action = link.getAttribute("onclick") || "";

            if (action.includes(`'${sectionId}'`)) {
                link.classList.add("active");
            }

        });

    }


    document.getElementById("pageTitle").textContent =
        pageTitles[sectionId] || "StaffDesk";


    if (sectionId === "dashboard") {
        updateDashboard();
    }

    if (sectionId === "employees") {
        renderEmployees();
    }

    if (sectionId === "attendance") {
        renderAttendance();
    }

    if (sectionId === "leaves") {
        renderLeaves();
    }

    if (sectionId === "reports") {
        renderReports();
    }

}


/* ==========================================
   9. EMPLOYEE SELECT OPTIONS
========================================== */

function updateEmployeeOptions() {

    const attendanceSelect = document.getElementById("attEmployee");

    const leaveSelect = document.getElementById("leaveEmployee");


    const options = employees.map(emp => {

        return `
            <option value="${escapeHTML(emp.id)}">
                ${escapeHTML(emp.id)} - ${escapeHTML(emp.name)}
            </option>
        `;

    }).join("");


    attendanceSelect.innerHTML =
        `<option value="">Select Employee</option>` + options;

    leaveSelect.innerHTML =
        `<option value="">Select Employee</option>` + options;

}


/* ==========================================
   10. EMPLOYEE TABLE
========================================== */

function renderEmployees() {

    const table = document.getElementById("employeeTable");

    const search = document
        .getElementById("employeeSearch")
        .value
        .toLowerCase()
        .trim();


    const filteredEmployees = employees.filter(emp => {

        return (

            emp.name.toLowerCase().includes(search) ||

            emp.id.toLowerCase().includes(search) ||

            emp.department.toLowerCase().includes(search) ||

            emp.position.toLowerCase().includes(search)

        );

    });


    if (filteredEmployees.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    No employees found.
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML = filteredEmployees.map(emp => {

        return `

            <tr>

                <td>

                    <div class="employee-cell">

                        <img
                            src="${escapeHTML(getEmployeePhoto(emp))}"
                            alt="${escapeHTML(emp.name)}"
                            onerror="this.src='https://i.pravatar.cc/100?img=1'"
                        >

                        <div>

                            <b>${escapeHTML(emp.name)}</b>

                            <small>${escapeHTML(emp.department)}</small>

                        </div>

                    </div>

                </td>

                <td>${escapeHTML(emp.id)}</td>

                <td>${escapeHTML(emp.department)}</td>

                <td>${escapeHTML(emp.position)}</td>

                <td>${escapeHTML(emp.phone)}</td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="btn btn-light"
                            onclick="editEmployee('${escapeHTML(emp.id)}')">
                            Edit
                        </button>

                        <button
                            class="btn btn-danger"
                            onclick="deleteEmployee('${escapeHTML(emp.id)}')">
                            Delete
                        </button>

                    </div>

                </td>

            </tr>

        `;

    }).join("");

}


/* ==========================================
   11. OPEN EMPLOYEE MODAL
========================================== */

function openEmployeeModal() {

    document.getElementById("modalTitle").textContent =
        "Add New Employee";

    document.getElementById("editEmployeeId").value = "";

    document.getElementById("empName").value = "";

    document.getElementById("empDepartment").value =
        "Human Resources";

    document.getElementById("empPosition").value = "";

    document.getElementById("empPhone").value = "";

    document.getElementById("empPhoto").value = "";


    document.getElementById("employeeModal")
        .classList.add("show");

}


function closeEmployeeModal() {

    document.getElementById("employeeModal")
        .classList.remove("show");

}


/* ==========================================
   12. SAVE NEW OR EDIT EMPLOYEE
========================================== */

function saveEmployee() {

    const editId = document.getElementById("editEmployeeId").value;

    const name = document.getElementById("empName").value.trim();

    const department =
        document.getElementById("empDepartment").value;

    const position =
        document.getElementById("empPosition").value.trim();

    const phone =
        document.getElementById("empPhone").value.trim();

    const photo =
        document.getElementById("empPhoto").value.trim();


    if (!name || !position || !phone) {

        showMessage("Please fill in all required fields.");

        return;
    }


    if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {

        showMessage("Please enter a valid phone number.");

        return;
    }


    if (photo && !/^https?:\/\//i.test(photo)) {

        showMessage("Please enter a valid photo URL.");

        return;
    }


    if (editId) {

        const employee = getEmployee(editId);

        if (!employee) return;

        employee.name = name;

        employee.department = department;

        employee.position = position;

        employee.phone = phone;

        if (photo) {
            employee.photo = photo;
        }

        showMessage("Employee information updated successfully.");

    } else {

        const newEmployee = {

            id: createId("EMP"),

            name: name,

            department: department,

            position: position,

            phone: phone,

            photo: photo || ""

        };

        employees.push(newEmployee);

        showMessage("New employee added successfully.");

    }


    saveAllData();

    closeEmployeeModal();

    renderEmployees();

    updateEmployeeOptions();

    updateDashboard();

    renderReports();

}


/* ==========================================
   13. EDIT EMPLOYEE
========================================== */

function editEmployee(id) {

    const employee = getEmployee(id);

    if (!employee) return;


    document.getElementById("modalTitle").textContent =
        "Edit Employee Information";


    document.getElementById("editEmployeeId").value = employee.id;

    document.getElementById("empName").value = employee.name;

    document.getElementById("empDepartment").value =
        employee.department;

    document.getElementById("empPosition").value =
        employee.position;

    document.getElementById("empPhone").value =
        employee.phone;

    document.getElementById("empPhoto").value =
        employee.photo || "";


    document.getElementById("employeeModal")
        .classList.add("show");

}


/* ==========================================
   14. DELETE EMPLOYEE
========================================== */

function deleteEmployee(id) {

    const employee = getEmployee(id);

    if (!employee) return;


    const confirmDelete = confirm(

        `Are you sure you want to delete ${employee.name}?`

    );


    if (!confirmDelete) return;


    employees = employees.filter(emp => emp.id !== id);

    attendance = attendance.filter(
        record => record.employeeId !== id
    );

    leaves = leaves.filter(
        leave => leave.employeeId !== id
    );


    saveAllData();

    renderEmployees();

    renderAttendance();

    renderLeaves();

    updateEmployeeOptions();

    updateDashboard();

    renderReports();


    showMessage("Employee deleted successfully.");

}


/* ==========================================
   15. SAVE ATTENDANCE
========================================== */

function saveAttendance() {

    const employeeId =
        document.getElementById("attEmployee").value;

    const date =
        document.getElementById("attDate").value;

    const checkIn =
        document.getElementById("checkIn").value;

    const checkOut =
        document.getElementById("checkOut").value;

    const status =
        document.getElementById("attStatus").value;


    if (!employeeId || !date) {

        showMessage("Please select an employee and date.");

        return;
    }


    if (!getEmployee(employeeId)) {

        showMessage("Selected employee does not exist.");

        return;
    }


    if (date > getToday()) {

        showMessage("Attendance cannot be recorded for a future date.");

        return;
    }


    if (checkIn && checkOut && checkOut <= checkIn) {

        showMessage("Check-out time must be later than check-in time.");

        return;
    }


    if (status === "Absent" && (checkIn || checkOut)) {

        showMessage("Absent employees should not have check-in or check-out times.");

        return;
    }


    if (status !== "Absent" && !checkIn) {

        showMessage("Please enter the check-in time.");

        return;
    }


    const existingRecord = attendance.find(record => {

        return record.employeeId === employeeId &&
               record.date === date;

    });


    if (existingRecord) {

        existingRecord.checkIn = checkIn;

        existingRecord.checkOut = checkOut;

        existingRecord.status = status;

        showMessage("Attendance record updated successfully.");

    } else {

        attendance.push({

            id: createId("ATT"),

            employeeId: employeeId,

            date: date,

            checkIn: checkIn,

            checkOut: checkOut,

            status: status

        });

        showMessage("Attendance saved successfully.");

    }


    saveAllData();

    renderAttendance();

    updateDashboard();

    renderReports();


    document.getElementById("attEmployee").value = "";

    document.getElementById("checkIn").value = "";

    document.getElementById("checkOut").value = "";

    document.getElementById("attStatus").value = "Present";

}


/* ==========================================
   16. ATTENDANCE HISTORY TABLE
========================================== */

function renderAttendance() {

    const table = document.getElementById("attendanceTable");

    const records = [...attendance].sort((a, b) =>
        b.date.localeCompare(a.date)
    );


    if (records.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    No attendance records available.
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML = records.map(record => {

        return `

            <tr>

                <td>${escapeHTML(getEmployeeName(record.employeeId))}</td>

                <td>${formatDate(record.date)}</td>

                <td>${escapeHTML(record.checkIn || "-")}</td>

                <td>${escapeHTML(record.checkOut || "-")}</td>

                <td>

                    <span class="status ${record.status.toLowerCase()}">

                        ${escapeHTML(record.status)}

                    </span>

                </td>

            </tr>

        `;

    }).join("");

}


/* ==========================================
   17. SUBMIT LEAVE APPLICATION
========================================== */

function submitLeave() {

    const employeeId =
        document.getElementById("leaveEmployee").value;

    const type =
        document.getElementById("leaveType").value;

    const start =
        document.getElementById("leaveStart").value;

    const end =
        document.getElementById("leaveEnd").value;

    const reason =
        document.getElementById("leaveReason").value.trim();


    if (!employeeId || !start || !end || !reason) {

        showMessage("Please complete all leave application fields.");

        return;
    }


    if (!getEmployee(employeeId)) {

        showMessage("Please select a valid employee.");

        return;
    }


    if (start > end) {

        showMessage("End date cannot be earlier than start date.");

        return;
    }


    if (start < getToday()) {

        showMessage("Please select today or a future start date.");

        return;
    }


    const newLeave = {

        id: createId("LEV"),

        employeeId: employeeId,

        type: type,

        start: start,

        end: end,

        reason: reason,

        status: "Pending"

    };


    leaves.push(newLeave);

    saveAllData();

    renderLeaves();

    updateDashboard();


    document.getElementById("leaveEmployee").value = "";

    document.getElementById("leaveStart").value = "";

    document.getElementById("leaveEnd").value = "";

    document.getElementById("leaveReason").value = "";


    showMessage("Leave application submitted successfully.");

}


/* ==========================================
   18. LEAVE APPLICATION TABLE
========================================== */

function renderLeaves() {

    const table = document.getElementById("leaveTable");


    if (leaves.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    No leave applications found.
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML = [...leaves].reverse().map(leave => {

        let actions = `<span class="status ${leave.status.toLowerCase()}">
            ${escapeHTML(leave.status)}
        </span>`;


        if (leave.status === "Pending") {

            actions = `

                <div class="action-buttons">

                    <button
                        class="btn btn-success"
                        onclick="updateLeaveStatus('${escapeHTML(leave.id)}','Approved')">
                        Approve
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="updateLeaveStatus('${escapeHTML(leave.id)}','Rejected')">
                        Reject
                    </button>

                </div>

            `;

        }


        return `

            <tr>

                <td>${escapeHTML(getEmployeeName(leave.employeeId))}</td>

                <td>${escapeHTML(leave.type)}</td>

                <td>${formatDate(leave.start)}</td>

                <td>${formatDate(leave.end)}</td>

                <td>${escapeHTML(leave.reason)}</td>

                <td>

                    <span class="status ${leave.status.toLowerCase()}">

                        ${escapeHTML(leave.status)}

                    </span>

                </td>

                <td>${actions}</td>

            </tr>

        `;

    }).join("");

}


/* ==========================================
   19. APPROVE OR REJECT LEAVE
========================================== */

function updateLeaveStatus(id, newStatus) {

    const leave = leaves.find(item => item.id === id);

    if (!leave) return;


    if (!["Approved", "Rejected"].includes(newStatus)) {
        return;
    }


    const confirmAction = confirm(

        `Are you sure you want to ${newStatus.toLowerCase()} this leave request?`

    );


    if (!confirmAction) return;


    leave.status = newStatus;

    saveAllData();

    renderLeaves();

    updateDashboard();


    showMessage(`Leave request ${newStatus.toLowerCase()} successfully.`);

}


/* ==========================================
   20. DASHBOARD UPDATE
========================================== */

function updateDashboard() {

    const today = getToday();

    const todayRecords = attendance.filter(
        record => record.date === today
    );


    const present = todayRecords.filter(
        record => record.status === "Present"
    ).length;

    const absent = todayRecords.filter(
        record => record.status === "Absent"
    ).length;

    const late = todayRecords.filter(
        record => record.status === "Late"
    ).length;

    const pending = leaves.filter(
        leave => leave.status === "Pending"
    ).length;


    document.getElementById("totalEmployees").textContent =
        employees.length;

    document.getElementById("presentCount").textContent =
        present;

    document.getElementById("absentCount").textContent =
        absent;

    document.getElementById("pendingCount").textContent =
        pending;


    /* Attendance Overview */

    const total = employees.length || 1;

    const presentPercent = (present / total) * 100;

    const absentPercent = (absent / total) * 100;

    const latePercent = (late / total) * 100;


    document.getElementById("presentChartValue").textContent =
        present;

    document.getElementById("absentChartValue").textContent =
        absent;

    document.getElementById("lateChartValue").textContent =
        late;


    document.getElementById("presentBar").style.width =
        presentPercent + "%";

    document.getElementById("absentBar").style.width =
        absentPercent + "%";

    document.getElementById("lateBar").style.width =
        latePercent + "%";


    /* Recent Attendance */

    const recentTable = document.getElementById("recentAttendance");


    if (todayRecords.length === 0) {

        recentTable.innerHTML = `
            <tr>
                <td colspan="3" class="empty">
                    No attendance records today.
                </td>
            </tr>
        `;

    } else {

        recentTable.innerHTML = todayRecords.slice(0, 6).map(record => {

            const employee = getEmployee(record.employeeId);

            if (!employee) return "";


            return `

                <tr>

                    <td>

                        <div class="employee-cell">

                            <img
                                src="${escapeHTML(getEmployeePhoto(employee))}"
                                alt="${escapeHTML(employee.name)}"
                            >

                            <div>
                                <b>${escapeHTML(employee.name)}</b>
                                <small>${escapeHTML(employee.department)}</small>
                            </div>

                        </div>

                    </td>

                    <td>${escapeHTML(record.checkIn || "-")}</td>

                    <td>

                        <span class="status ${record.status.toLowerCase()}">
                            ${escapeHTML(record.status)}
                        </span>

                    </td>

                </tr>

            `;

        }).join("");

    }

}


/* ==========================================
   21. MONTHLY REPORT GENERATION
========================================== */

function renderReports() {

    const monthInput = document.getElementById("reportMonth");

    const month = monthInput.value || getCurrentMonth();

    const monthlyRecords = attendance.filter(record =>
        record.date.startsWith(month)
    );


    const total = monthlyRecords.length;

    const present = monthlyRecords.filter(
        record => record.status === "Present"
    ).length;

    const absent = monthlyRecords.filter(
        record => record.status === "Absent"
    ).length;

    const late = monthlyRecords.filter(
        record => record.status === "Late"
    ).length;


    document.getElementById("reportTotal").textContent = total;

    document.getElementById("reportPresent").textContent = present;

    document.getElementById("reportAbsent").textContent = absent;

    document.getElementById("reportLate").textContent = late;


    /* Employee-wise Report */

    const reportTable = document.getElementById("reportTable");


    if (employees.length === 0) {

        reportTable.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    No employee information available.
                </td>
            </tr>
        `;

        return;
    }


    reportTable.innerHTML = employees.map(employee => {

        const records = monthlyRecords.filter(
            record => record.employeeId === employee.id
        );


        const empPresent = records.filter(
            record => record.status === "Present"
        ).length;

        const empAbsent = records.filter(
            record => record.status === "Absent"
        ).length;

        const empLate = records.filter(
            record => record.status === "Late"
        ).length;


        const attendanceRate = records.length > 0

            ? Math.round((empPresent + empLate) / records.length * 100)

            : 0;


        return `

            <tr>

                <td>${escapeHTML(employee.name)}</td>

                <td>${empPresent}</td>

                <td>${empAbsent}</td>

                <td>${empLate}</td>

                <td>

                    <b>${attendanceRate}%</b>

                    <div class="progress">

                        <div style="width:${attendanceRate}%"></div>

                    </div>

                </td>

            </tr>

        `;

    }).join("");

}


/* ==========================================
   22. DOWNLOAD MONTHLY CSV REPORT
========================================== */

function downloadCSV() {

    const month =
        document.getElementById("reportMonth").value ||
        getCurrentMonth();


    const records = attendance.filter(record =>
        record.date.startsWith(month)
    );


    if (records.length === 0) {

        showMessage("There are no attendance records for this month.");

        return;
    }


    const rows = [

        [
            "Employee ID",
            "Employee Name",
            "Department",
            "Date",
            "Check In",
            "Check Out",
            "Status"
        ]

    ];


    records.forEach(record => {

        const employee = getEmployee(record.employeeId);

        if (!employee) return;


        rows.push([

            employee.id,

            employee.name,

            employee.department,

            record.date,

            record.checkIn || "",

            record.checkOut || "",

            record.status

        ]);

    });


    const csvContent = "\uFEFF" + rows.map(row => {

        return row.map(value => {

            return `"${String(value).replace(/"/g, '""')}"`;

        }).join(",");

    }).join("\r\n");


    const blob = new Blob(

        [csvContent],

        { type: "text/csv;charset=utf-8;" }

    );


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");


    link.href = url;

    link.download = `StaffDesk_Attendance_${month}.csv`;


    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);


    showMessage("Monthly CSV report downloaded successfully.");

}


/* ==========================================
   23. SET DEFAULT DATE VALUES
========================================== */

function setDefaultDates() {

    const today = getToday();

    document.getElementById("attDate").value = today;

    document.getElementById("reportMonth").value =
        getCurrentMonth();


    document.getElementById("todayDate").textContent =
        new Date().toLocaleDateString("en-US", {

            weekday: "long",

            year: "numeric",

            month: "long",

            day: "numeric"

        });

}


/* ==========================================
   24. CLOSE MODAL BY CLICKING OUTSIDE
========================================== */

document.getElementById("employeeModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeEmployeeModal();

        }

    });


/* ==========================================
   25. APPLICATION INITIALIZATION
========================================== */

function initializeStaffDesk() {

    setDefaultDates();

    updateEmployeeOptions();

    renderEmployees();

    renderAttendance();

    renderLeaves();

    renderReports();

    updateDashboard();

    console.log("StaffDesk started successfully!");

}


/* Start the application */

document.addEventListener("DOMContentLoaded", initializeStaffDesk);

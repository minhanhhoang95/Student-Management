class Student {
    constructor(studentId, studentName, date, gender, grade, img) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.date = date;
        this.gender = gender;
        this.grade = grade;
        this.img = img;
    }
}
var students = [
    // new Student(1, "Hoàng Anh Minh", "23/07/1995", true, "C0322G1", "https://ca.slack-edge.com/TEZB2M9GC-U03928J3C02-1ef40ed0fe04-48"),
    // new Student(2, "Lê Minh Trí", "12/11/1991", true, "C0322G1", "https://ca.slack-edge.com/TEZB2M9GC-U038MLB4B9D-2930c27932fb-72"),
    // new Student(3, "Đào Xuân Trí", "18/09/1993", true, "C0322G1", "https://ca.slack-edge.com/TEZB2M9GC-U039ESP2T4H-e762100c053c-72"),

];
const key_data = "student_data";

// render học viên
/**
 * Param: listStudents
 */
function renderStudents(listStudents) {

    let student = document.getElementById("list-student");
    let htmls = listStudents.map(function (std, index) {
        return `
        <tr id="tr_${std.studentId}" class="tr-1">
                        <td>${std.studentId}</td>
                        <td>${std.studentName}</td>
                        <td>${std.date}</td>
                        <td>${std.gender ? 'Nam' : 'Nữ'}</td>
                        <td>${std.grade}</td>
                        <td><img src='${std.img}' class="img-change"></td>
                        <td id="action_${std.studentId}">
                            <button style="background-color: red; color: white " class="d-none-remove-edit" type="button" onclick="removeStudentById(${std.studentId})">Remove</button>
                            <button class="btn btn-primary d-none" style="background-color: orange" onclick="updateStudent(${std.studentId})">Update</button>
                            <button class="btn btn-warning d-none" style="background-color: red" onclick="resetRow(${std.studentId})">Cancel</button>
                            <button class="d-none-remove-edit" style="background-color: orange ; color: white" type="button" onclick="Change(${std.studentId})">Edit</button>
                        </td>
                    </tr>
        `
    })

    student.innerHTML = htmls.join("");
    setData(key_data, students);
}

// thêm học viên

function addStudent() {
    // b1: lấy value từ các field
    // b2: tạo ra 1 đối tượng Product
    // b3: thêm vào students
    // b4: renderStudents()
    // b5: reset/clear form
    let id = getLastestId() + 1;
    let name = document.getElementById("fullname").value;

    let date = document.getElementById("date").value;
    let gender = document.getElementById("gender").value;
    let grade = document.getElementById("grade").value;
    let img = document.getElementById("img").value;
    if (!validation(name && date && gender && grade && img)) {
        alert("Student name is required!")
        return;
    }
    let newStudent = new Student(id, name, date, gender, grade, img)
    students.push(newStudent);
    setData(key_data, students);
    renderStudents(students);
    resetStudent();
}
//biện luận khỏi khoảng trống
function validation(field) {
    return field != null && field.trim() != '';
}
//tìm ID lớn nhất
function getLastestId() {
    let studentTemp = [...students];
    let maxId = studentTemp.sort(function (std1, std2) {
        return std2.studentId - std1.studentId
    })[0].studentId
    return maxId;
}
//reset lại form
function resetStudent() {
    // document.getElementById("id").value = "";
    document.getElementById("fullname").value = "";
    document.getElementById("date").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("grade").value = "";
    document.getElementById("img").value = "";
}
//remove 
// removeStudent
function removeStudentById(studentId) {
    let confirmed = window.confirm('Do you want to delete this student ???')
    if (confirmed) {
        let findId = students.findIndex(function (std) {
            return std.studentId == studentId;
        })
        students.splice(findId, 1);
        // console.log(findId);
        setData(key_data, students);
        renderStudents(students);
    }
}
// edit chỉnh sửa thông tin học viên
function Change(stdId) {
    let student = getStudentById(stdId);
    let tr = document.getElementById(`tr_${student.studentId}`);
    // console.log(tr);
    //lấy thông tin gắn lại 
    tr.children[1].innerHTML = `<input class='form-control-md' type='text' value='${student.studentName}' />`
    tr.children[2].innerHTML = `<input class='form-control-md' type='text' value='${student.date}' />`
    tr.children[3].innerHTML = `<input class='form-control-md' type='text' value='${student.gender}' />`
    tr.children[4].innerHTML = `<input class='form-control-md' type='text' value='${student.grade}' />`
    tr.children[5].innerHTML = `<input class='form-control-md' type='text' value='${student.img}' />`
    //ẩn hiện các nút
    let action = document.getElementById(`action_${student.studentId}`)
    action.children[0].classList.add('d-none');
    action.children[1].classList.remove('d-none');
    action.children[2].classList.remove('d-none');
    action.children[3].classList.add('d-none');
}
// tạo hàm lấy thông tin từ students
function getStudentById(stdId) {
    let getId = students.find(function (student) {
        return student.studentId == stdId;
    })
    return getId;
    // console.log(getId);
}
//cancel
function resetRow(stdId) {
    let student = getStudentById(stdId);
    let tr = document.getElementById(`tr_${student.studentId}`);
    tr.children[1].innerHTML = student.studentName;
    tr.children[2].innerHTML = student.date;
    tr.children[3].innerHTML = student.gender;
    tr.children[4].innerHTML = student.grade;
    let strImg = `<img src="${student.img}" class="img-change">`;
    tr.children[5].innerHTML = strImg;
    let action = document.getElementById(`action_${student.studentId}`)
    action.children[0].classList.remove('d-none');
    action.children[1].classList.add('d-none');
    action.children[2].classList.add('d-none');
    action.children[3].classList.remove('d-none');
}
// update thông tin mới nhất của học viên
function updateStudent(stdId) {
    let student = getStudentById(stdId);
    let tr = document.getElementById(`tr_${student.studentId}`);
    let newStudentName = tr.children[1].children[0].value;
    let newDate = tr.children[2].children[0].value;
    let newGender = tr.children[3].children[0].value;
    let newGrade = tr.children[4].children[0].value;
    let newImg = tr.children[5].children[0].value;
    student.studentName = newStudentName;
    student.date = newDate;
    student.gender = newGender;
    student.grade = newGrade;
    student.img = newImg;
    setData(key_data, students);
    resetRow(stdId);
}
// tìm kiếm học viên 
function search() {

    let keywork = document.getElementById('keyword').value;
    let result = students.filter(function (student, index) {
        return student.studentName.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    // console.log(result);
    // 2 student
    renderStudents(result);
}
// tạo vùng nhớ localStorage
function init() {
    if (getData(key_data) == null) {
        students = [
            new Student(1, "Hoàng Anh Minh", "23/07/1995", true, "C0322G1", "https://ca.slack-edge.com/TEZB2M9GC-U03928J3C02-1ef40ed0fe04-512"),
            new Student(2, "Lê Minh Trí", "12/11/1991", true, "C0322G1", "https://ca.slack-edge.com/TEZB2M9GC-U038MLB4B9D-2930c27932fb-72"),
            new Student(3, "Đào Xuân Trí", "18/09/1993", true, "C0322G1", "https://ca.slack-edge.com/TEZB2M9GC-U039ESP2T4H-e762100c053c-72"),
            new Student(4, "Trần Hồng Phong", "05/01/1997", true, "C0322G1", "https://ca.slack-edge.com/TEZB2M9GC-U039S1M1GU8-71fd3f6a89af-72")
        ];
        setData(key_data, students);
    }
    else {
        students = getData(key_data);
    }
}
//lấy về
function getData(key) {
    return JSON.parse(localStorage.getItem(key))
}
//lưu lên
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}


//khởi tạo
function ready() {
    init();
    renderStudents(students);
}

ready();


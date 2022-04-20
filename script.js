var employee = new Array();
var id = 0;
var filterMap = new Map();
var parent = new Array();

var jobtitle;
var office;
var department;
var selectedPrefix;
var selectedId;

var deptCollection = ["IT", "Human Resources", "MD", "Sales"];
var officeCollection = ["Seattle", "India"];
var jobtitleCollection = ["SharePoint Practice Head", ".Net Development Lead", "Recruiting Expert", "BI Developer", "Business Analyst"];

document.onclick = function (event) {
    var target = event.target || event.srcElement;
    if (contains(deptCollection, target)) {
        operation("department", target);
        filter(true);
    }
    else if (contains(officeCollection, target)) {
        operation("office", target);
        filter(true);
    }
    else if (contains(jobtitleCollection, target)) {
        operation("jobtitle", target);
        filter(true);
    }
};

function filter(pass) {
    clearError();
    var parents = document.getElementById('bottom');
    var child = parents.getElementsByTagName('div');
    var size = child.length;
    while (size-- > 0) {
        parents.removeChild(child[0]);
    }

    var temp = new Array();
    var deptarray = filterMap.get("department");
    var offarray = filterMap.get("office");
    var jtarray = filterMap.get("jobtitle");

    if (deptarray.length > 0 && deptarray[0].check == false) {
        for (let i = 0; i < employee.length; i++) if ((deptarray[0].tar).innerHTML == employee[i].department) temp.push(employee[i].id);
    }

    let t = new Array();
    if (offarray.length > 0 && offarray[0].check == false) {
        if (temp.length == 0) {
            for (let i = 0; i < employee.length; i++) if ((offarray[0].tar).innerHTML == employee[i].office) t.push(employee[i].id);
        }
        else {
            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < employee.length; j++) {
                    if (employee[j].id == temp[i] && employee[j].office == (offarray[0].tar).innerHTML) t.push(temp[i]);
                }
            }
        }
        temp = new Array();
        for (let i = 0; i < t.length; i++) temp.push(t[i]);
    }

    t = new Array();
    if (jtarray.length > 0 && jtarray[0].check == false) {
        if (temp.length == 0) {
            for (let i = 0; i < employee.length; i++) if ((jtarray[0].tar).innerHTML == employee[i].jobtitle) t.push(employee[i].id);
        }
        else {
            for (let i = 0; i < temp.length; i++) {
                let flag = true;
                for (let j = 0; j < employee.length; j++) {
                    if (employee[j].id == temp[i] && employee[j].jobtitle == (jtarray[0].tar).innerHTML) t.push(temp[i]);
                }
            }
        }
        temp = new Array();
        for (let i = 0; i < t.length; i++) temp.push(t[i]);
    }

    console.log(temp);
    t = new Array();
    var f = true;
    console.log(selectedPrefix);
    if (selectedPrefix != undefined && pass == true) {
        f = false;
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < employee.length; j++) {
                if (temp[i] == employee[j].id) {
                    if (field == 'firstname') {
                        if ((employee[j].fname).startsWith(selectedPrefix)) t.push(temp[i]);
                    }
                    else if (field == 'lastname') {
                        if ((employee[j].lname).startsWith(selectedPrefix)) t.push(temp[i]);
                    }
                }
            }
        }
        temp = new Array();
        for (let i = 0; i < t.length; i++) temp.push(t[i]);
    }

    console.log(temp);

    parent = new Array();
    if ((deptarray.length == 1 && deptarray[0].check == true) || (offarray.length == 1 && offarray[0].check == true) || (jtarray.length == 1 && jtarray[0].check == true)) temp = new Array();

    if ((deptarray.length + offarray.length + jtarray.length == 0)) {
        if (f == true) {
            for (let i = 0; i < employee.length; i++) {
                show(employee[i].id);
                parent.push(employee[i].id);
            }
        }
        else {
            for (let i = 0; i < employee.length; i++) {
                if (field == 'firstname') {
                    if ((employee[i].fname).startsWith(selectedPrefix)) {
                        show(employee[i].id);
                    }
                }
                else if (field == 'lastname') {
                    if ((employee[i].lname).startsWith(selectedPrefix)) {
                        show(employee[i].id);
                    }
                }
            }
        }
    }
    else {
        for (let i = 0; i < temp.length; i++) {
            parent.push(temp[i]);
            show(temp[i]);
        }
    }
}

function contains(collection, tar) {
    for (let i = 0; i < collection.length; i++) {
        if (collection[i] + "P" == tar.getAttribute('id')) {
            return true;
        }
    }
    return false;
}

function operation(prop, target) {
    let arr = filterMap.get(prop);
    if (arr.length == 1 && arr[0].tar == target) { target.style.fontWeight = "normal"; filterMap.set(prop, new Array()); }
    else {
        if (arr.length == 1) (arr[0].tar).style.fontWeight = "normal";
        let check = true;
        for (let i = 0; i < employee.length; i++) {
            if (employee[i].department == target.innerHTML || employee[i].office == target.innerHTML || employee[i].jobtitle == target.innerHTML) {
                check = false;
                break;
            }
        }
        let inner;
        if (check == false) {
            target.style.fontWeight = "bold";
            inner = { "tar": target, "check": false }
            arr[0] = inner;
        }
        else {
            target.style.fontWeight = "bold";
            inner = { "tar": target, "check": true }
            arr[0] = inner;
        }
        // console.log(arr);
    }
}

function renderJS() {
    filterMap.set("department", new Array());
    filterMap.set("office", new Array());
    filterMap.set("jobtitle", new Array());
    showDepartment();
    showOffice();
    showJobTitle();

    let inner1 = {
        "id": ++id,
        "fname": "ajay",
        "lname": "singh",
        "pname": "ajay singh",
        "mail": "ajays@gmail.com",
        "jobtitle": ".Net Development Lead",
        "office": "Seattle",
        "department": "IT",
        "phonenumber": "9079027168"
    }
    department = inner1.department;
    office = inner1.office;
    jobtitle = inner1.jobtitle;
    employee.push(inner1);
    countSet(true);
    let inner2 = {
        "id": ++id,
        "fname": "fsdasd",
        "lname": "fdassa",
        "pname": "fsdasd fdassa",
        "mail": "ajayss@gmail.com",
        "jobtitle": "SharePoint Practice Head",
        "office": "India",
        "department": "Sales",
        "phonenumber": "5079027168"
    }
    department = inner2.department;
    office = inner2.office;
    jobtitle = inner2.jobtitle;
    employee.push(inner2);
    countSet(true);
    let inner3 = {
        "id": ++id,
        "fname": "dfsfsd",
        "lname": "ajdfjd",
        "pname": "dfsfsd ajdfjd",
        "mail": "ajaysss@gmail.com",
        "jobtitle": ".Net Development Lead",
        "office": "Seattle",
        "department": "MD",
        "phonenumber": "6073027168"
    }
    department = inner3.department;
    office = inner1.office;
    jobtitle = inner1.jobtitle;
    employee.push(inner3);
    countSet(true);
    let inner4 = {
        "id": ++id,
        "fname": "dfdsa",
        "lname": "hedjdjd",
        "pname": "dfdsa hedjdjd",
        "mail": "ajayssss@gmail.com",
        "jobtitle": ".Net Development Lead",
        "office": "Seattle",
        "department": "IT",
        "phonenumber": "7073027168"
    }
    department = inner4.department;
    office = inner4.office;
    jobtitle = inner4.jobtitle;
    employee.push(inner4);
    countSet(true);
    let inner5 = {
        "id": ++id,
        "fname": "dfafas",
        "lname": "sfddasfa",
        "pname": "dfafas sfddasfa",
        "mail": "ajaysssss@gmail.com",
        "jobtitle": "Recruiting Expert",
        "office": "India",
        "department": "Sales",
        "phonenumber": "8073027168"
    }
    department = inner5.department;
    office = inner5.office;
    jobtitle = inner5.jobtitle;
    employee.push(inner5);
    countSet(true);
    show(1);
    show(2);
    show(3);
    show(4);
    show(5);
}

function showDepartment() {
    var departmentDiv = document.querySelector('.department');
    // departmentDiv.style.display="flex";
    for (let i = 0; i < deptCollection.length; i++) {
        // const head=departmentDiv.getElementsByTagName('h3');
        const parent = document.createElement('p');
        parent.style.display = 'inline';
        parent.style.cursor = "pointer";
        parent.setAttribute("id", deptCollection[i] + "P");
        const textnode = document.createTextNode(deptCollection[i]);
        parent.appendChild(textnode);

        const span = document.createElement('span');
        const spantextnode = document.createTextNode('(0)');
        span.setAttribute("id", deptCollection[i]);
        span.style.display = 'inline';
        span.appendChild(spantextnode);
        
        const br = document.createElement('br');

        const div=document.createElement('div');
        div.appendChild(parent);
        div.appendChild(span);
        div.appendChild(br);
        div.style.paddingTop='4px';
        
        departmentDiv.appendChild(div);
    }
}

function showOffice() {
    var officeDiv = document.querySelector('.offices');
    // departmentDiv.style.display="flex";
    for (let i = 0; i < officeCollection.length; i++) {
        // const head=departmentDiv.getElementsByTagName('h3');
        const parent = document.createElement('p');
        parent.style.display = 'inline';
        parent.style.cursor = "pointer";
        parent.setAttribute("id", officeCollection[i] + "P");
        const textnode = document.createTextNode(officeCollection[i]);
        parent.appendChild(textnode);

        const span = document.createElement('span');
        const spantextnode = document.createTextNode('(0)');
        span.style.display = 'inline';
        span.setAttribute("id", officeCollection[i]);
        span.appendChild(spantextnode);

        const br = document.createElement('br');

        const div=document.createElement('div');
        div.appendChild(parent);
        div.appendChild(span);
        div.appendChild(br);
        div.style.paddingTop='4px';

        officeDiv.appendChild(div);
    }
}

function showJobTitle() {
    var jobtitlesDiv = document.querySelector('.jobtitles');
    // departmentDiv.style.display="flex";
    for (let i = 0; i < jobtitleCollection.length; i++) {
        // const head=departmentDiv.getElementsByTagName('h3');
        const parent = document.createElement('p');
        parent.style.display = 'inline';
        parent.style.cursor = "pointer";
        parent.setAttribute("id", jobtitleCollection[i] + "P");
        const textnode = document.createTextNode(jobtitleCollection[i]);
        parent.appendChild(textnode);

        const span = document.createElement('span');
        const spantextnode = document.createTextNode('(0)');
        span.style.display = 'inline';
        span.setAttribute("id", jobtitleCollection[i]);
        span.appendChild(spantextnode);

        const br = document.createElement('br');
        br.setAttribute("id", jobtitleCollection[i] + "b");

        if (i >= 3) {
            parent.style.display = "none";
            span.style.display = "none";
            br.style.display = "none";
        }

        const div=document.createElement('div');
        div.appendChild(parent);
        div.appendChild(span);
        div.appendChild(br);
        div.style.paddingTop='4px';  
        jobtitlesDiv.appendChild(div);  
    }
    const para = document.createElement('a');
    para.style.cursor = 'pointer';
    para.style.color = '#00b1fc';
    // para.addEventListener('onclick',change());
    para.setAttribute('id', 'vmore');
    para.setAttribute('onclick', 'change()');
    const tnode = document.createTextNode("View More");
    para.appendChild(tnode);
    jobtitlesDiv.appendChild(para);
}

function fn1() {
    clearForm();
    clearError();
    document.querySelector('.bg-model').style.display = 'flex';
}

function fn2() {
    document.querySelector('.bg-model').style.display = 'none';
}

function show(id) {
    let nametext, jobtitletext, departmenttext;
    for (let i = 0; i < employee.length; i++) if (employee[i].id == id) { nametext = employee[i].pname; jobtitletext = employee[i].jobtitle; departmenttext = employee[i].department; }
    const img = new Image(55, 80); // width, height
    img.src = "person_icon.png";
    const name = document.createElement('h3');
    const nametextnode = document.createTextNode(nametext);
    name.style.cursor = 'pointer';
    name.setAttribute("id", id);
    name.setAttribute("onclick", "popup(id)");
    name.style.paddingLeft = "7px";
    name.style.color = "#666666";
    name.appendChild(nametextnode);

    const jobtitle = document.createElement('p');
    const jobtitletextnode = document.createTextNode(jobtitletext);
    jobtitle.style.paddingLeft = "7px";
    jobtitle.style.color = "#a6a6a6";
    jobtitle.appendChild(jobtitletextnode);

    const department = document.createElement('p');
    const departmenttextnode = document.createTextNode(departmenttext);
    department.style.paddingLeft = "7px";
    department.style.color = "#a6a6a6";
    department.appendChild(departmenttextnode);

    const phoneIcon = new Image(20, 20);
    phoneIcon.src = 'phone_icon.png';
    phoneIcon.style.marginLeft = "6px";
    const mailIcon = new Image(20, 20);
    mailIcon.src = 'mail_icon.png';
    mailIcon.style.marginLeft = "3px";
    const messageIcon = new Image(20, 20);
    messageIcon.src = 'message_icon.png';
    messageIcon.style.marginLeft = "3px";
    const starIcon = new Image(20, 20);
    starIcon.src = 'star_icon.png';
    starIcon.style.marginLeft = "3px";
    const loveIcon = new Image(20, 20);
    loveIcon.src = 'love_icon.png';
    loveIcon.style.marginLeft = "3px";

    const mdiv = document.createElement('mdiv');
    mdiv.appendChild(name);
    mdiv.appendChild(jobtitle);
    mdiv.appendChild(department);
    mdiv.appendChild(phoneIcon);
    mdiv.appendChild(mailIcon);
    mdiv.appendChild(messageIcon);
    mdiv.appendChild(starIcon);
    mdiv.appendChild(loveIcon);
    // mdiv.appendChild(icons);

    const div = document.createElement('div');
    div.style.display = "flex";
    // div.style.flex="2 0 21%";
    div.style.backgroundColor = "#e9e8e8";
    // div.style.display = "inlineBlock";
    div.style.width = "243px";
    // div.style.height="100px";
    div.style.padding = "8px";
    div.style.marginRight = "9px";
    div.style.marginBottom = "8px";
    div.style.marginTop='7px';
    // div.alignIterm="center";
    div.appendChild(img);
    div.appendChild(mdiv);
    // div.setAttribute("id",id);

    const element = document.getElementById('bottom');
    // element.style.backgroundColor = "red";
    element.appendChild(div);
}

function setError(id, error) {
    document.getElementsByClassName('formerror')[id].innerHTML = error;
}

function clearError() {
    var arr = document.getElementsByClassName('formerror');
    for (let i = 0; i < arr.length; i++) {
        arr[i].innerHTML = "";
    }
    document.getElementById('filtererror').innerHTML = "";
}

function clearForm() {
    document.querySelector('#firstname').value = "";
    document.querySelector('#lastname').value = "";
    // document.querySelector('#preferredname').value="";
    document.querySelector('#mail').value = "";
    document.querySelector('#jobtitle').value = "";
    document.querySelector('#office').value = "";
    document.querySelector('#department').value = "";
    document.querySelector('#phonenumber').value = "";
    document.querySelector('#jobtitleother').value = "";
    document.querySelector('#officeother').value = "";
    document.querySelector('#departmentother').value = "";
}

function onFormSubmit() {
    clearError();
    var returnVal = true;

    var fname = document.querySelector('#firstname').value;
    fname = fname.trim();
    if (fname.length < 3) {
        setError(0, "*Length of first name is too short");
        returnVal = false;
    }
    if (fname.length > 15) {
        setError(0, "Length of first name is too long");
        returnVal = false;
    }

    var lname = document.querySelector('#lastname').value;
    lname = lname.trim();
    if (lname.length < 3) {
        setError(1, "*Length of last name is too short");
        returnVal = false;
    }
    if (lname.length > 15) {
        setError(1, "*Length of last name is too long");
        returnVal = false;
    }

    var pname = fname + " " + lname;

    if (jobtitle == 'Other') {
        jobtitle = document.getElementById('jobtitleother').value;
    }
    if (office == 'Other') {
        office = document.getElementById('officeother').value;
    }
    if (department == 'Other') {
        department = document.getElementById('departmentother').value;
    }

    var mail = document.querySelector('#mail').value;
    mail = mail.trim();
    if (mail.length > 20) {
        setError(2, "*Please enter the valid email");
        returnVal = false;
    }

    var phonenumber = document.querySelector('#phonenumber').value;
    phonenumber = phonenumber.trim();

    if (phonenumber.length != 10) {
        setError(6, "*Phone number should be of 10 digit");
        returnVal = false;
    }
    if (isNaN(phonenumber) == true) {
        setError(6, "*Please enter digit only in phone number");
        returnVal = false;
    }

    if (returnVal == true) {
        let inner = {
            "id": ++id,
            "fname": fname,
            "lname": lname,
            "pname": pname,
            "mail": mail,
            "jobtitle": jobtitle,
            "office": office,
            "department": department,
            "phonenumber": phonenumber
        }

        employee.push(inner);
        countSet(true);

        clearForm();
        filter(true);
        document.querySelector('.bg-model').style.display = 'none';
        document.getElementById('jobtitleother').style.display = "none";
        document.getElementById('officeother').style.display = 'none';
        document.getElementById('departmentother').style.display = 'none';
    }
}

function countSet(flag) {
    let chk = true;
    for (let i = 0; i < deptCollection.length; i++) {
        if (deptCollection[i] == department) {
            chk = false;
            let number = document.getElementById(deptCollection[i]);
            if (flag) number.innerHTML = "(" + (number.innerHTML[1] - '0' + 1) + ")";
            else number.innerHTML = "(" + (number.innerHTML[1] - '0' - 1) + ")";
        }
    }
    if (chk == true) {
        deptCollection.push(department);
        var departmentDiv = document.querySelector('.department');
        const parent = document.createElement('p');
        parent.style.display = 'inline';
        parent.style.cursor = "pointer";
        parent.setAttribute("id", department + "P");
        const textnode = document.createTextNode(department);
        parent.appendChild(textnode);

        const span = document.createElement('span');
        const spantextnode = document.createTextNode('(1)');
        span.setAttribute("id", department);
        span.style.display = 'inline';
        span.appendChild(spantextnode);

        const spann = document.createElement('span');

        const br = document.createElement('br');
        
        
        const div=document.createElement('div');
        div.appendChild(parent);
        div.appendChild(span);
        div.appendChild(br);
        div.style.paddingTop='4px'; 

        departmentDiv.appendChild(div);
    }
    chk = true;
    for (let i = 0; i < officeCollection.length; i++) {
        if (officeCollection[i] == office) {
            chk = false;
            let number = document.getElementById(officeCollection[i]);
            if (flag) number.innerHTML = "(" + (number.innerHTML[1] - '0' + 1) + ")";
            else number.innerHTML = "(" + (number.innerHTML[1] - '0' - 1) + ")";
        }
    }
    if (chk == true) {
        officeCollection.push(office);
        var officeDiv = document.querySelector('.offices');
        const parent = document.createElement('p');
        parent.style.display = 'inline';
        parent.style.cursor = "pointer";
        parent.setAttribute("id", office + "P");
        const textnode = document.createTextNode(office);
        parent.appendChild(textnode);

        const span = document.createElement('span');
        const spantextnode = document.createTextNode('(1)');
        span.style.display = 'inline';
        span.setAttribute("id", office);
        span.appendChild(spantextnode);

        const br = document.createElement('br');

        
        const div=document.createElement('div');
        div.appendChild(parent);
        div.appendChild(span);
        div.appendChild(br);
        div.style.paddingTop='4px'; 

        officeDiv.appendChild(div);
    }
    chk = true;
    for (let i = 0; i < jobtitleCollection.length; i++) {
        if (jobtitleCollection[i] == jobtitle) {
            chk = false;
            let number = document.getElementById(jobtitleCollection[i]);
            if (flag) number.innerHTML = "(" + (number.innerHTML[1] - '0' + 1) + ")";
            else number.innerHTML = "(" + (number.innerHTML[1] - '0' - 1) + ")";
        }
    }
    if (chk == true) {
        jobtitleCollection.push(jobtitle)
        var jobtitlesDiv = document.querySelector('.jobtitles');
        jobtitlesDiv.removeChild(document.getElementById('vmore'));

        const parent = document.createElement('p');
        parent.style.display = 'inline';
        parent.style.cursor = "pointer";
        parent.setAttribute("id", jobtitle + "P");
        const textnode = document.createTextNode(jobtitle);
        parent.appendChild(textnode);

        const span = document.createElement('span');
        const spantextnode = document.createTextNode('(1)');
        span.style.display = 'inline';
        span.setAttribute("id", jobtitle);
        span.appendChild(spantextnode);

        const br = document.createElement('br');
        br.setAttribute("id", jobtitle + "b");

        parent.style.display = "none";
        span.style.display = "none";
        br.style.display = "none";

        
        const div=document.createElement('div');
        div.appendChild(parent);
        div.appendChild(span);
        div.appendChild(br);
        div.style.paddingTop='4px'; 
        jobtitlesDiv.appendChild(div);

        const para = document.createElement('a');
        para.style.cursor = 'pointer';
        para.style.color = '#00b1fc';
        // para.addEventListener('onclick',change());
        para.setAttribute('id', 'vmore');
        para.setAttribute('onclick', 'change()');
        const tnode = document.createTextNode("View More");
        para.appendChild(tnode);
        jobtitlesDiv.appendChild(para);
    }
}

function vis(id, otherid) {
    if (id == 'jobtitle') jobtitle = document.getElementById(id).value;
    if (id == 'office') office = document.getElementById(id).value;
    if (id == 'department') department = document.getElementById(id).value;

    if (jobtitle == "Other" || office == "Other" || department == "Other") {
        document.getElementById(otherid).style.display = "block";
    }
    else {
        document.getElementById(otherid).style.display = "none";
    }

}

let field;
function filterByPrefix(prefix, id) {
    if (document.getElementById('prefsearch').value != '') {
        document.getElementById('prefsearch').value = "";
        selectedPrefix = undefined;
        selectedId = undefined;
    }

    field = document.getElementById('filter').value;
    if (selectedPrefix == undefined || selectedPrefix == '') {
        filter(false);
        document.getElementById(id).style.backgroundColor = "red";
        selectedPrefix = prefix;
        selectedId = id;
    }
    else {
        if (prefix == selectedPrefix) {
            document.getElementById(id).style.background = "#00b1fc";
            selectedPrefix = undefined;
            selectedId = undefined;
            filter(true);
            return;
        }
        else {
            filter(false);
            document.getElementById(selectedId).style.backgroundColor = "#00b1fc";
            document.getElementById(id).style.backgroundColor = "red";
            selectedPrefix = prefix;
            selectedId = id;
        }
    }
    clearError();
    var parents = document.getElementById('bottom');
    var child = parents.getElementsByTagName('div');
    var size = child.length;
    while (size-- > 0) {
        parents.removeChild(child[0]);
    }

    var temp = new Array();
    for (let i = 0; i < parent.length; i++) {
        for (let j = 0; j < employee.length; j++) {
            if (field == "firstname") {
                if (employee[j].id == parent[i] && (employee[j].fname).startsWith(selectedPrefix)) temp.push(employee[j].id);
            }
            else if (field == "lastname") {
                if (employee[j].id == parent[i] && (employee[j].lname).startsWith(selectedPrefix)) temp.push(employee[j].id);
            }
        }
    }

    for (let i = 0; i < temp.length; i++) show(temp[i]);

    parent = new Array();
    for (let i = 0; i < temp.length; i++) parent.push(temp[i]);
}

function cler() {
    document.querySelector('#prefsearch').value = "";
    showAll();
}

function change() {
    var text = document.getElementById('vmore');
    var vmore = document.getElementById('vmore');
    if (text.innerText == "View More") {
        for (let i = 3; i < jobtitleCollection.length; i++) {
            let p = document.getElementById(jobtitleCollection[i] + "P");
            let spn = document.getElementById(jobtitleCollection[i]);
            let a = document.getElementById(jobtitleCollection[i] + "b");
            p.style.display = "inline";
            spn.style.display = "inline";
            a.style.display = "inline";
        }
        vmore.innerHTML = "View Less";
    }
    else {
        for (let i = 3; i < jobtitleCollection.length; i++) {
            let p = document.getElementById(jobtitleCollection[i] + "P");
            let spn = document.getElementById(jobtitleCollection[i]);
            let a = document.getElementById(jobtitleCollection[i] + "b");
            p.style.display = "none";
            spn.style.display = "none";
            a.style.display = "none";
        }
        vmore.innerHTML = "View More";
    }
}

let opid;
function popup(id) {
    document.querySelector('.popup').style.display = 'flex';
    let ftextarea = document.getElementById('namefirst');
    ftextarea.style.display = 'block';
    document.getElementById('namefirsth').value = '';
    document.getElementById('namefirsth').style.display = 'none';

    let ltextarea = document.getElementById('namelast');
    ltextarea.style.display = 'block';
    document.getElementById('namelasth').value = '';
    document.getElementById('namelasth').style.display = 'none';

    let mtextarea = document.getElementById('maill');
    mtextarea.style.display = 'block';
    document.getElementById('maillh').value = '';
    document.getElementById('maillh').style.display = 'none';

    let jttextarea = document.getElementById('jobtitlel');
    jttextarea.style.display = 'block';
    document.getElementById('jobtitlelh').value = '';
    document.getElementById('jobtitlelh').style.display = 'none';

    let otextarea = document.getElementById('officel');
    otextarea.style.display = 'block';
    document.getElementById('officelh').value = '';
    document.getElementById('officelh').style.display = 'none';

    let dtextarea = document.getElementById('departmentl');
    dtextarea.style.display = 'block';
    document.getElementById('departmentlh').value = '';
    document.getElementById('departmentlh').style.display = 'none';


    let ptextarea = document.getElementById('phonenumberl');
    ptextarea.style.display = 'block';
    document.getElementById('phonenumberlh').value = '';
    document.getElementById('phonenumberlh').style.display = 'none';

    let fname, lname, email, jobtitle, office, department, phonenumber;
    for (let i = 0; i < employee.length; i++) if (employee[i].id == id) { fname = employee[i].fname; lname = employee[i].lname; email = employee[i].mail; jobtitle = employee[i].jobtitle; office = employee[i].office; department = employee[i].department; phonenumber = employee[i].phonenumber; }
    ftextarea.innerHTML = fname;
    ltextarea.innerHTML = lname;
    mtextarea.innerHTML = email;
    jttextarea.innerHTML = jobtitle;
    otextarea.innerHTML = office;
    dtextarea.innerHTML = department;
    ptextarea.innerHTML = phonenumber;
    opid = id;
}
function xclose() {
    document.querySelector('.popup').style.display = 'none';
}

function edit(first, second) {
    // alert("running");
    document.querySelector(first).style.display = 'none'
    document.querySelector(second).style.display = 'inline';
}
function remove() {
    let idx = -1;
    for (let i = 0; i < employee.length; i++) {
        if (opid == employee[i].id) { idx = i; department = employee[i].department; office = employee[i].office; jobtitle = employee[i].jobtitle; }
    }
    xclose();
    countSet(false);
    employee.splice(idx, 1);
    filter(true);
}

function updatea() {
    let fname, lname, mail, phonenumber;
    let dname = document.getElementById('departmentl').innerHTML;
    let dnameval1 = document.getElementById(dname).innerHTML[1] - '0';
    document.getElementById(dname).innerHTML = "(" + (dnameval1 - 1) + ")";
    let oname = document.getElementById('officel').innerHTML;
    let onameval1 = document.getElementById(oname).innerHTML[1] - '0';
    document.getElementById(oname).innerHTML = "(" + (onameval1 - 1) + ")";
    let jname = document.getElementById('jobtitlel').innerHTML;
    let jnameval1 = document.getElementById(jname).innerHTML[1] - '0';
    document.getElementById(jname).innerHTML = "(" + (jnameval1 - 1) + ")";


    if (document.getElementById('namefirsth').value == '') {
        fname = document.getElementById('namefirst').innerHTML;
    }
    else {
        fname = document.getElementById('namefirsth').value;
    }

    if (document.getElementById('namelasth').value == '') {
        lname = document.getElementById('namelast').innerHTML;
    }
    else {
        lname = document.getElementById('namelasth').value;
    }

    if (document.getElementById('maillh').value == '') {
        mail = document.getElementById('maill').innerHTML;
    }
    else {
        mail = document.getElementById('maillh').value;
    }

    if (document.getElementById('jobtitlelh').value == '') {
        jobtitle = document.getElementById('jobtitlel').innerHTML;
    }
    else {
        jobtitle = document.getElementById('jobtitlelh').value;
    }

    if (document.getElementById('officelh').value == '') {
        office = document.getElementById('officel').innerHTML;
    }
    else {
        office = document.getElementById('officelh').value;
    }

    if (document.getElementById('departmentlh').value == '') {
        department = document.getElementById('departmentl').innerHTML;
    }
    else {
        department = document.getElementById('departmentlh').value;
    }

    if (document.getElementById('phonenumberlh').value == '') {
        phonenumber = document.getElementById('phonenumberl').innerHTML;
    }
    else {
        phonenumber = document.getElementById('phonenumberlh').value;
    }

    for (let i = 0; i < employee.length; i++) {
        if (employee[i].id == opid) {
            employee[i].fname = fname;
            employee[i].lname = lname;
            employee[i].pname = fname + " " + lname;
            employee[i].mail = mail;
            employee[i].jobtitle = jobtitle;
            employee[i].office = office;
            employee[i].department = department;
            employee[i].phonenumber = phonenumber;
        }
    }

    dnameval1 = document.getElementById(department).innerHTML[1] - '0';
    document.getElementById(department).innerHTML = "(" + (dnameval1 + 1) + ")";

    onameval1 = document.getElementById(office).innerHTML[1] - '0';
    document.getElementById(office).innerHTML = "(" + (onameval1 + 1) + ")";

    jnameval1 = document.getElementById(jobtitle).innerHTML[1] - '0';
    document.getElementById(jobtitle).innerHTML = "(" + (jnameval1 + 1) + ")";

    xclose();
    filter(true);
}

function filterBySearch() {
    if (selectedPrefix != undefined && selectedId != undefined) {
        document.getElementById(selectedId).style.background = "#00b1fc";
        selectedPrefix = undefined;
        selectedId = undefined;
    }

    filter(false);
    selectedPrefix = document.getElementById('prefsearch').value;
    let field = document.getElementById('filter').value;
    clearError();
    var parents = document.getElementById('bottom');
    var child = parents.getElementsByTagName('div');
    var size = child.length;
    while (size-- > 0) {
        parents.removeChild(child[0]);
    }

    var temp = new Array();
    for (let i = 0; i < parent.length; i++) {
        for (let j = 0; j < employee.length; j++) {
            if (field == "firstname") {
                if (employee[j].id == parent[i] && (employee[j].fname).startsWith(selectedPrefix)) temp.push(employee[j].id);
            }
            else if (field == "lastname") {
                if (employee[j].id == parent[i] && (employee[j].lname).startsWith(selectedPrefix)) temp.push(employee[j].id);
            }
        }
    }
    for (let i = 0; i < temp.length; i++) show(temp[i]);

    parent = new Array();
    for (let i = 0; i < temp.length; i++) parent.push(temp[i]);
}

function showAll(){
    if(filterMap.get('department').length==1){
        document.getElementById((filterMap.get('department')[0].tar.innerHTML)+'P').style.fontWeight='normal';
        filterMap.set('department',new Array());
    }

    if(filterMap.get('office').length==1){
        document.getElementById((filterMap.get('office')[0].tar.innerHTML)+'P').style.fontWeight='normal';
        filterMap.set('office',new Array());
    }
    
    if(filterMap.get('jobtitle').length==1){
        document.getElementById((filterMap.get('jobtitle')[0].tar.innerHTML)+'P').style.fontWeight='normal';
        filterMap.set('jobtitle',new Array());
    }
    if(selectedPrefix!=undefined && selectedId!=undefined){
        document.getElementById(selectedId).style.background = "#00b1fc";
        selectedPrefix = undefined;
        selectedId = undefined;
    }
    document.querySelector('#prefsearch').value = "";
    selectedPrefix=undefined;
    filter(false);
}
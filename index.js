const submitModButton = document.getElementById("submitHeaderButton");
const readModButton = document.getElementById("readHeaderButton");

let searchSubmit = document.getElementById("search_button");
let submitButton //= document.getElementById('submit_button');

let searchInput = document.getElementById('search_input');
let shipName //= document.getElementById('ship_name_submit');
let shipPort //= document.getElementById('ship_port_submit');
let shipDescription //= document.getElementById('ship_description_submit');

const loginSubmit = document.getElementById('loginSubmit');
loginSubmit.addEventListener('click' ,()=>{loginAttempt()})

const tag = document.getElementById('tag_link');
tag.href = "http://"+tag.innerText;

let user ={};

searchSubmit.addEventListener('click', (e)=>{
    e.preventDefault();

    const value = searchInput.value;

    fetch(`http://localhost:5000/getShip/${value}`)
    .then(response=>response.json())
    .then(data=>LoadSearchData(data["data"]))
})/*
submitButton.addEventListener('click',(e)=>{
    e.preventDefault();
    AddData();
})
*/
function LoadSearchData(data){


    const table = document.querySelector('table tbody');
    let tableHtml = "";
    data.forEach(Ship => {
        tableHtml+= "<tr>";
        tableHtml+= `<td>${Ship.Ship}</td>`
        tableHtml+= `<td>${Ship.Port}</td>`
        tableHtml+= `<td>${Ship.Description} - ${Ship.User}</td>`
    tableHtml+= "</tr>";
    });

    table.innerHTML=tableHtml;
}


tag.addEventListener('click', (e)=>{

})

function AddData(){
    const data = {
        ship:shipName.value,
        port:shipPort.value,
        description:shipDescription.value,
        username:user.name
    }
    fetch('http://localhost:5000/insert', {
        headers:{
            'Content-type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify(
            {ship:data}
            )
    })
    .then(response => response.json())
    .then(data => {
        //insertRowIntoTable(data['data'])
        console.log(data);
    })
}



submitModButton.addEventListener('click', (e)=>{
    const main = document.getElementById("forms");
    const div = document.createElement('div');
        while (main.lastChild){main.removeChild(main.lastChild)}
    div.innerHTML = SubmitModule();
    main.prepend(div);

    resetForms();
    resetSubmit();
})
readModButton.addEventListener('click', () => {
    const main = document.getElementById('forms');
        while (main.lastChild){main.removeChild(main.lastChild)}
    const div = document.createElement('div');

    div.innerHTML=ReadModule();
    main.prepend(div);

    resetForms();
    resetSearch();
})

function SubmitModule(){
    let mod = "";
    mod += `<form id="submit_form">
    <input id="ship_name_submit" placeholder="Ship Name">
    <input id="ship_port_submit" placeholder="Home Port">
    <textarea id="ship_description_submit" placeholder="Ship Description"></textarea>
    <button id="submit_button">Submit</button>
    </form>`

    return mod;
}
function ReadModule(){
    let mod  = "";
    mod +=`<form id="search_form">
    <input id="search_input" placeholder="Search">
    <button id="search_button">Submit</button>
    </form>`

    return mod;
}

function resetForms(){
 searchSubmit = document.getElementById("search_button");
 submitButton = document.getElementById('submit_button');

 searchInput = document.getElementById('search_input');
 shipName = document.getElementById('ship_name_submit');
 shipPort = document.getElementById('ship_port_submit');
 shipDescription = document.getElementById('ship_description_submit');
}
function resetSubmit(){
    submitButton.addEventListener('click',(e)=>{
        e.preventDefault();
        AddData();
    })
}
function resetSearch(){
    searchSubmit.addEventListener('click', (e)=>{
        e.preventDefault();
    
        const value = searchInput.value;
    
        fetch(`http://localhost:5000/getShip/${value}`)
        .then(response=>response.json())
        .then(data=>LoadSearchData(data["data"]))
    })
}

function loginAttempt(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`http://localhost:5000/loginAttempt/${username}/${password}`)
    .then(response=>response.json())
    .then(data=>{
        loginSuccess(data);
    })
    
}
function loginSuccess(data){
    if(!!data.data[0]){
        user.name = data.data[0].Username;
        document.getElementById('body').classList.remove('hidden');
        document.getElementById('loginBox').classList.add('hidden');
    }
    else{
        document.getElementById('errorBox').innerHTML = "na u fucke dup homie";
    }
}
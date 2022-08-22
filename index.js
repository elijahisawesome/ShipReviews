import { initializeApp } from 'firebase/app';
import {collection,addDoc,query,getDocs,where,} from 'firebase/firestore';
import db from './Firebase/firebase-config';
import page from "./page.html";
import style from "./style.css";

  document.querySelector("body").innerHTML = page;
  document.querySelector('body').classList.add('hidden');

const submitModButton = document.getElementById("submitHeaderButton");
const readModButton = document.getElementById("readHeaderButton");

let searchSubmit = document.getElementById("search_button");
let submitButton;

let searchInput = document.getElementById('search_input');
let shipName;
let shipPort;
let shipDescription;

const loginSubmit = document.getElementById('loginSubmit');
loginSubmit.addEventListener('click' ,()=>{loginAttempt()})

const tag = document.getElementById('tag_link');
tag.href = "http://"+tag.innerText;

let user ={};

searchSubmit.addEventListener('click', (e)=>{
    e.preventDefault();

    const value = searchInput.value.toUpperCase();
    const q = query(collection(db,"ships"), where("Ship", "==", value));

    const mySnap = getDocs(q,(val)=>{
        const data = Promise.resolve(val);
        return data;
    })
    mySnap.then(data=>{
        if(!data.empty){
            LoadSearchData(data.docs)
        }
    })
    .catch(e=>{
        console.log(e)
    })
})


async function setData(data){
    await addDoc(collection(db, 'ships'), {
        Description:data.description,
        Port:data.port,
        Ship:data.ship.toUpperCase(),
        User:user.name
    })
    .then(()=>{
        console.log("success");

        const forms = document.getElementById('forms');
        const main = document.getElementById('main');
        const thankyou = document.createElement('div');
        thankyou.id = "thankyouBox";

        forms.remove();
        thankyou.innerText = "Submission Success, Thanks!";
        main.append(thankyou);
    });
}
async function loadData(name){
    await getDocs(collection(db,"ships"),(data)=>{
    })
    .then(data=>{
        console.log(data);
    })
}

function LoadSearchData(data){
    
    const info = data;

    const table = document.querySelector('table tbody');
    let tableHtml = "";

    info.forEach(ship=>{
        tableHtml+= "<tr>";
            tableHtml+= `<td>${ship._document.data.value.mapValue.fields.Ship.stringValue}</td>`;
            tableHtml+= `<td>${ship._document.data.value.mapValue.fields.Port.stringValue}</td>`;
            tableHtml+= `<td>${ship._document.data.value.mapValue.fields.Description.stringValue} - ${ship._document.data.value.mapValue.fields.User.stringValue}</td>`;
        tableHtml+= "<tr>";
    })

    table.innerHTML=tableHtml;
}


function AddData(){
    const data = {
        ship:shipName.value,
        port:shipPort.value,
        description:shipDescription.value,
        username:user.name
    }

    setData(data);
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
    searchSubmit.addEventListener('click', (e)=>{
        e.preventDefault();

        const value = searchInput.value.toUpperCase();
        const q = query(collection(db,"ships"), where("Ship", "==", value));

        const mySnap = getDocs(q,(val)=>{
            const data = Promise.resolve(val);
            return data;
        })
        mySnap.then(data=>{
            if(!data.empty){
                LoadSearchData(data.docs)
            }
        })
        .catch(e=>{
            console.log(e)
        })
    })
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

function loginAttempt(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const q = query(collection(db,"Ids"), where("name", "==", username.toUpperCase()));

    const mySnap = getDocs(q,(val)=>{
        const data = Promise.resolve(val);
        return data;
    })
    mySnap.then((val)=>{
        console.log(val);
        let combo = val.docs[0]._document.data.value.mapValue.fields;
        if(!val.empty && combo.password.stringValue == password)
        {
            console.log("success");
            loginSuccess(true, combo.name.stringValue );
        }
        else{
            console.log("wrong PW");
            loginSuccess(false);
        }
    })
}

function loginSuccess(success, name){
    if(success){
        user.name = name;
        document.querySelector('body').classList.remove('hidden');
        document.getElementById('loginBox').classList.add('hidden');
    }
    else{
        document.getElementById('errorBox').innerHTML = "na u fucke dup homie";
    }
}
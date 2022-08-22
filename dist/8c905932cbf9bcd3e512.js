import{initializeApp}from"firebase/app";import{collection,addDoc,query,getDocs,where}from"firebase/firestore";import db from"./Firebase/firebase-config";import page from"./page.html";import style from"./style.css";document.querySelector("body").innerHTML=page,document.querySelector("body").classList.add("hidden");const submitModButton=document.getElementById("submitHeaderButton"),readModButton=document.getElementById("readHeaderButton");let submitButton,shipName,shipPort,shipDescription,searchSubmit=document.getElementById("search_button"),searchInput=document.getElementById("search_input");const loginSubmit=document.getElementById("loginSubmit");loginSubmit.addEventListener("click",(()=>{loginAttempt()}));const tag=document.getElementById("tag_link");tag.href="http://"+tag.innerText;let user={};async function setData(e){await addDoc(collection(db,"ships"),{Description:e.description,Port:e.port,Ship:e.ship.toUpperCase(),User:user.name}).then((()=>{console.log("success");const e=document.getElementById("forms"),t=document.getElementById("main"),n=document.createElement("div");n.id="thankyouBox",e.remove(),n.innerText="Submission Success, Thanks!",t.append(n)}))}async function loadData(e){await getDocs(collection(db,"ships"),(e=>{})).then((e=>{console.log(e)}))}function LoadSearchData(e){const t=e,n=document.querySelector("table tbody");let o="";t.forEach((e=>{o+="<tr>",o+=`<td>${e._document.data.value.mapValue.fields.Ship.stringValue}</td>`,o+=`<td>${e._document.data.value.mapValue.fields.Port.stringValue}</td>`,o+=`<td>${e._document.data.value.mapValue.fields.Description.stringValue} - ${e._document.data.value.mapValue.fields.User.stringValue}</td>`,o+="<tr>"})),n.innerHTML=o}function AddData(){setData({ship:shipName.value,port:shipPort.value,description:shipDescription.value,username:user.name})}function SubmitModule(){let e="";return e+='<form id="submit_form">\n    <input id="ship_name_submit" placeholder="Ship Name">\n    <input id="ship_port_submit" placeholder="Home Port">\n    <textarea id="ship_description_submit" placeholder="Ship Description"></textarea>\n    <button id="submit_button">Submit</button>\n    </form>','<form id="submit_form">\n    <input id="ship_name_submit" placeholder="Ship Name">\n    <input id="ship_port_submit" placeholder="Home Port">\n    <textarea id="ship_description_submit" placeholder="Ship Description"></textarea>\n    <button id="submit_button">Submit</button>\n    </form>'}function ReadModule(){let e="";return e+='<form id="search_form">\n    <input id="search_input" placeholder="Search">\n    <button id="search_button">Submit</button>\n    </form>','<form id="search_form">\n    <input id="search_input" placeholder="Search">\n    <button id="search_button">Submit</button>\n    </form>'}function resetForms(){searchSubmit=document.getElementById("search_button"),submitButton=document.getElementById("submit_button"),searchInput=document.getElementById("search_input"),shipName=document.getElementById("ship_name_submit"),shipPort=document.getElementById("ship_port_submit"),shipDescription=document.getElementById("ship_description_submit")}function resetSubmit(){submitButton.addEventListener("click",(e=>{e.preventDefault(),AddData()}))}function loginAttempt(){const e=document.getElementById("username").value,t=document.getElementById("password").value,n=query(collection(db,"Ids"),where("name","==",e.toUpperCase()));getDocs(n,(e=>Promise.resolve(e))).then((e=>{console.log(e);let n=e.docs[0]._document.data.value.mapValue.fields;e.empty||n.password.stringValue!=t?(console.log("wrong PW"),loginSuccess(!1)):(console.log("success"),loginSuccess(!0,n.name.stringValue))}))}function loginSuccess(e,t){e?(user.name=t,document.querySelector("body").classList.remove("hidden"),document.getElementById("loginBox").classList.add("hidden")):document.getElementById("errorBox").innerHTML="na u fucke dup homie"}searchSubmit.addEventListener("click",(e=>{e.preventDefault();const t=searchInput.value.toUpperCase(),n=query(collection(db,"ships"),where("Ship","==",t));getDocs(n,(e=>Promise.resolve(e))).then((e=>{e.empty||LoadSearchData(e.docs)})).catch((e=>{console.log(e)}))})),submitModButton.addEventListener("click",(e=>{const t=document.getElementById("forms"),n=document.createElement("div");for(;t.lastChild;)t.removeChild(t.lastChild);n.innerHTML=SubmitModule(),t.prepend(n),resetForms(),resetSubmit()})),readModButton.addEventListener("click",(()=>{const e=document.getElementById("forms");for(;e.lastChild;)e.removeChild(e.lastChild);const t=document.createElement("div");t.innerHTML=ReadModule(),e.prepend(t),resetForms(),searchSubmit.addEventListener("click",(e=>{e.preventDefault();const t=searchInput.value.toUpperCase(),n=query(collection(db,"ships"),where("Ship","==",t));getDocs(n,(e=>Promise.resolve(e))).then((e=>{e.empty||LoadSearchData(e.docs)})).catch((e=>{console.log(e)}))}))}));
function submitRequest(e){
    e.preventDefault();
 const name = document.querySelector('.name').value;
 const teamSize = document.querySelector('.teamsize').value;
 const email = document.querySelector('.email').value;
 const collegeName = document.querySelector('.collegename').value;
 const teamName = document.querySelector('.teamname').value;
 const phoneNumber = document.querySelector('.phonenumber').value;
 const event = document.querySelector('.event').value;
const messageBox = document.querySelector('.message');
messageBox.textContent="";
messageBox.style.color="#333";
 const data={
    fullName:name,
    teamSize:teamSize,
    email:email,
    teamName:teamName,
    phoneNumber:phoneNumber,
    event:event,
    collegeName:collegeName
 };
 fetch("https://roboyudh-backend-production.up.railway.app/roboyudh26/submitDetails"
,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
 })
 .then(async (response)=>{
    const message= await response.text();
    if(response.status===409){
        messageBox.textContent="Phone Number Already Exists";
        messageBox.style.color="red";
    }else if(response.ok){
        messageBox.textContent="Registration Successfull"
        messageBox.style.color="green";
    }else{
        messageBox.textContent="Something Went Wrong,Try Again after Sometime."
        messageBox.style.color = "orange";
    }
 })
 .catch(()=>{
    messageBox.textContent="Server Error,Try Again After Sometime.";
    messageBox.style.color="Red";
 })
}

document.querySelector(".register-form").addEventListener("submit", submitRequest);
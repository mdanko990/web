let signup = document.getElementById('signupLink');
let login = document.getElementById('loginLink');
let loginEmail = document.getElementById('login-email');
let signupEmail = document.getElementById('signup-email');
let loginPass = document.getElementById('login-password');
let signupPass = document.getElementById('signup-password');
let searchInput = document.getElementById('search-input');
let repeatPass = document.getElementById('repeat-password');

document.getElementById('signup-block').style.display='none';

signup.addEventListener('click', changeLoginToSignUp); 
login.addEventListener('click', changeSignUpToLogin);
loginEmail.addEventListener('input', validateEmail);
signupEmail.addEventListener('input', validateEmail);
loginPass.addEventListener('input', validatePassword);
signupPass.addEventListener('input', validatePassword);
searchInput.addEventListener('input', validation);

function validation(){
  if(loginEmail.style.borderBottomColor === "green" && loginPass.style.borderBottomColor === "green"){
    document.getElementById('login-btn').disabled = false;
  }else if(signupEmail.style.borderBottomColor === "green" && signupPass.style.borderBottomColor === "green"){
    document.getElementById('signup-btn').disabled = false;
  }else if(searchInput.value !== ''){
    document.getElementById('search-btn').disabled = false;
  }
}

function checkRepeat(){
  console.log(repeatPass.style.borderBottom);
  if(repeatPass.value === signupPass.value){
    signupPass.style.borderBottom = "2px solid";
    signupPass.style.borderBottomColor = "green";
  }else{
    signupPass.style.borderBottom = "2px solid";
    signupPass.style.borderBottomColor = "red";
  }
}

function changeLoginToSignUp(){
  document.getElementById('login-block').style.display='none';
  document.getElementById('signup-block').style.display='block';
}

function changeSignUpToLogin(){
  document.getElementById('signup-block').style.display='none';
  document.getElementById('login-block').style.display='block';
}

function validateEmail(event){
  let emailInput = event.target;
  let pattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  if(pattern.test(emailInput.value)){
    emailInput.style.borderBottom= "2px solid";
    emailInput.style.borderBottomColor = "green";
    validation();
  }else{
    emailInput.style.borderBottom = "2px solid";
    emailInput.style.borderBottomColor = "red";
  }
}

function validatePassword(event){
  let passInput = event.target;
  let pattern = /^[a-zA-Z0-9_-]{6,18}$/;
  if(pattern.test(passInput.value)){
    passInput.style.borderBottom = "2px solid";
    passInput.style.borderBottomColor = "green";
    validation();
  }else{
    passInput.style.borderBottom = "2px solid";
    passInput.style.borderBottomColor = "red";
  }
}

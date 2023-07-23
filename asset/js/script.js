const user = document.querySelector(".js-user"),
pass = document.querySelector(".js-pass");

user.addEventListener('focus', () => {
    focus(user);
})

user.addEventListener('blur', () => {
    blur(user);
})

pass.addEventListener('focus', () => {
    focus(pass);
})

pass.addEventListener('blur', () => {
    blur(pass);
})

function focus(e){
    parentEl = e.parentElement;
    parentEl.classList.add('active')
};

function blur(e){
    parentEl = e.parentElement;
    if(!e.value){
        parentEl.classList.remove('active')
    }
}

window.addEventListener('pageshow', () => {
    focus(user);
    blur(user);
    focus(pass);
    blur(pass);
})

const showPass = document.querySelector('.showpass'),
hidePass = document.querySelector('.hidepass');

showPass.addEventListener('click', () => {
    showPass.style.display = "none";
    hidePass.style.display = "block";
    pass.type = "text";
})

hidePass.addEventListener('click', () => {
    hidePass.style.display = "none";
    showPass.style.display = "block";
    pass.type = "password";
})

const spass = document.querySelector('.spass');
function myFunction() {
    var x = document.getElementById("myInput");
       if (x.type === "password") {
           x.type = "text";
       } else {
           x.type = "password";
       }
   }

   document.querySelectorAll('.button').forEach(button => button.addEventListener('click', e => {
    if(!button.classList.contains('loading')) {

        button.classList.add('loading');

        setTimeout(() => button.classList.remove('loading'), 3700);

    }
    e.preventDefault();
}));



// Account page (change pass)
function checkPasswords(){
    const newPassword = document.getElementById('new_password')
    const confirmPassword = document.getElementById('confirm_password')
    if(newPassword.value == confirmPassword.value && newPassword !== '' && confirmPassword !== ''){
        updatePasswordButton.disabled = false;
    }
    else{
        updatePasswordButton.disabled = true;
    }
}


// Add to cart (Payment)
function cod(){
    document.getElementById('image').style.display = 'none'
    document.getElementById('image').required = false
}
function gGash(){
    document.getElementById('image').style.display = 'block'
    document.getElementById('image').required = true
}


// user login (password)
const passwordInput = document.querySelector("#password")
const eye = document.querySelector("#eye")
eye.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash")
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)
})
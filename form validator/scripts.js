// variable declaration
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.getElementById("form");

//Erorr message
function showError(input, message) {
  const parentDiv = input.parentElement;
  parentDiv.className = "form-control error";
  const small = parentDiv.querySelector("small");
  small.innerText = message;
}

//Sucess
function showSuccess(input) {
  const parentDiv = input.parentElement;
  parentDiv.className = "form-control success";
}

//Check email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //return re.test(String(input).toLowerCase());

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//check required fields
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//Check length fields
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be greater than ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be lesser than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//check password match
function checkPasswordsmatch(password, confirmpassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Password doesn't match");
  }
}

//get flield name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Adding event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([userName, password, confirmPassword, email]);
  checkLength(userName, 3, 15);
  checkLength(password, 3, 15);
  checkEmail(email);
  checkPasswordsmatch(password, confirmPassword);
});

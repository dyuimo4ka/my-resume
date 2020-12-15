const projectCoffee = document.querySelector("#personal-project-coffee");
const projectTicTac = document.querySelector("#personal-project-tic-tac");
const projectMoney = document.querySelector("#personal-project-money");
const projectSleepy = document.querySelector("#personal-project-sleepy");
const projectBeer = document.querySelector("#personal-project-beer");

const projectModalQuestify = document.querySelector("#team-project-questify");
const projectModalItTest = document.querySelector("#team-project-it-test");

const projectOpenBtnCoffee = document.querySelector(
  "#personal-project-coffee-btn"
);
const projectOpenBtnTicTac = document.querySelector(
  "#personal-project-tic-tac-btn"
);
const projectOpenBtnMoney = document.querySelector(
  "#personal-project-money-btn"
);
const projectOpenBtnSleepy = document.querySelector(
  "#personal-project-sleepy-btn"
);
const projectOpenBtnBeer = document.querySelector("#personal-project-beer-btn");

const projectOpenBtnQuestify = document.querySelector(
  "#team-project-questify-btn"
);
const projectOpenBtnItTest = document.querySelector(
  "#team-project-it-test-btn"
);

const projectModals = [
  projectCoffee,
  projectTicTac,
  projectMoney,
  projectSleepy,
  projectBeer,
  projectModalQuestify,
  projectModalItTest,
];

const projectBtns = [
  projectOpenBtnCoffee,
  projectOpenBtnTicTac,
  projectOpenBtnMoney,
  projectOpenBtnSleepy,
  projectOpenBtnBeer,
  projectOpenBtnQuestify,
  projectOpenBtnItTest,
];

projectBtns.forEach((btn, index) => {
  const projectModal = projectModals[index];

  if (btn) {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      projectModal.classList.add(MODAL_ACTIVE_CLASS);

      document.body.classList.add(BODY_SCROLL_DISABLE_CLASS);
    });
  }
});
const callbackThanks = document.querySelector("#modal-thanks");
const clientName = document.querySelector("#client-name");
const clientPhone = document.querySelector("#client-phone");
const clientEmail = document.querySelector("#client-email");
const callBackForm = document.querySelector(".callback-form-container");

clientPhone.addEventListener("click", function () {
  if (!clientPhone.value.trim()) {
    clientPhone.value = "+380";
  }
});

clientPhone.addEventListener("blur", function () {
  if (clientPhone.value === "+380") {
    clientPhone.value = "";
  }
});

callBackForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let errInForm = false;
  if (!clientName.value.trim()) {
    clientName.classList.add("form-border-err");
    errInForm = true;
  } else {
    clientName.classList.remove("form-border-err");
  }

  if (!clientEmail.value.trim() || !isEmailValid(clientEmail.value)) {
    clientEmail.classList.add("form-border-err");
    errInForm = true;
  } else {
    clientEmail.classList.remove("form-border-err");
  }
  if (!clientPhone.value.trim() || !isPhoneValid(clientPhone.value)) {
    clientPhone.classList.add("form-border-err");
    errInForm = true;
  } else {
    clientPhone.classList.remove("form-border-err");
  }
  if (errInForm) {
    return;
  }

  let text =
    "Перезвонить клиенту: " +
    clientName.value +
    " " +
    clientPhone.value +
    " " +
    "почта: " +
    clientEmail.value;

  sendMessage(text);

  clientName.value = "";
  clientPhone.value = "";
  clientEmail.value = "";

  callbackThanks.classList.add("modal-active");
  setTimeout(function () {
    callbackThanks.classList.remove("modal-active");
  }, 4000);
});

function isPhoneValid(phone = "") {
  const regexp = /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/;

  return phone.match(regexp);
}
function isEmailValid(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

// отправить в чат телеги:

function sendMessage(text) {
  console.log("rabotai  uzhe!!!!");

  let message = {
    chat_id: "-286263231",

    text: text,
  };

  // тестовый, токен не прячу))
  let botTest =
    "https://api.telegram.org/bot1415486919:AAGvnwT-DCAj4-qUXOGwzel0iWkN5XTuYPI/sendMessage";
  fetch(botTest, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

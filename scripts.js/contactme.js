//Taking the elements from the html
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submit = document.getElementById("getResume");

//to validate the values

// validar formulario de registro cuando se haga submit
submit.addEventListener("click", async function (e) {
  e.preventDefault();

  const errors = [];

  if (name.value === "" || name.value === null) {
    errors.push("El nombre es requerido. ");
  }

  // validar email con regex
  if (email.value === "" || email.value === null) {
    errors.push("El correo electrónico es requerido. ");
  } else if (
    email.value.trim() !== "" &&
    !email.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    errors.push("El correo electrónico no es válido. ");
  }

  if (errors.length > 0) {
    console.log(errors);
    swal("Hay errores en el formulario", errors.join(""), "error", {
      button: "OK",
    });
  } else {
    sendEmail();
  }
});

async function sendEmail() {
  console.log("Sending email");

  const subject = "Contacto Steven Chaves";
  //const values of the email request
  const requestBody = {
    subject: subject,
    message: message.value,
    to: email.value,
    name: name.value,
  };

  try {
    const response = await fetch(
      "https://prod-47.eastus.logic.azure.com:443/workflows/c232366a52454c48867a6a46c447b2e4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=76eU-RogmPhdBbhT4yH7l9ZRt6MJft7DenAkZL3KZbY",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const responseContent = await response.json();
    console.log(responseContent);

    swal({
      title: "Correo enviado",
      text: "Se te ha enviado un correo con información.",
      icon: "success",
      button: "OK",
    });

    name.value = "";
    email.value = "";
    message.value = "";

    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

//submit.addEventListener("click", sendEmail);

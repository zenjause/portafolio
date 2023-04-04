const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const submitBtn = document.querySelector('button[type="submit"]');
const successMsg = document.querySelector('.success-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm()) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Enviando...';
    const formData = new FormData();
    formData.append('name', nameInput.value);
    formData.append('email', emailInput.value);
    formData.append('phone', phoneInput.value);
    formData.append('message', messageInput.value);
    fetch('/submit-form.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar el formulario.');
      }
      return response.text();
    })
    .then(data => {
      submitBtn.innerHTML = 'Enviado';
      successMsg.style.display = 'block';
    })
    .catch(error => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enviar';
      console.error(error);
    });
  }
});

function validateForm() {
  let isValid = true;
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const messageValue = messageInput.value.trim();
  
  if (nameValue === '') {
    setError(nameInput, 'Por favor ingrese su nombre.');
    isValid = false;
  } else {
    setSuccess(nameInput);
  }
  
  if (emailValue === '') {
    setError(emailInput, 'Por favor ingrese su correo electrónico.');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(emailInput, 'Por favor ingrese un correo electrónico válido.');
    isValid = false;
  } else {
    setSuccess(emailInput);
  }
  
  if (phoneValue === '') {
    setError(phoneInput, 'Por favor ingrese su número de teléfono.');
    isValid = false;
  } else if (!isValidPhone(phoneValue)) {
    setError(phoneInput, 'Por favor ingrese un número de teléfono válido.');
    isValid = false;
  } else {
    setSuccess(phoneInput);
  }
  
  if (messageValue === '') {
    setError(messageInput, 'Por favor ingrese su mensaje.');
    isValid = false;
  } else {
    setSuccess(messageInput);
  }
  
  return isValid;
}

function setError(input, message) {
  const formControl = input.parentElement;
  const errorMsg = formControl.querySelector('.error-msg');
  input.classList.add('error');
  errorMsg.innerHTML = message;
  errorMsg.style.display = 'block';
}

function setSuccess(input) {
  const formControl = input.parentElement;
  const errorMsg = formControl.querySelector('.error-msg');
  input.classList.remove('error');
  errorMsg.style.display = 'none';
}

function isValidEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function isValidPhone(phone) {
  const re = /^\d{10}$/;
  return re.test(phone);
}

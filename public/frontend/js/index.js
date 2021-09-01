const openModal = (message) => {
  document.getElementById('exampleModal').style.display = 'block';
  document.getElementById('textVal').innerHTML = message;
  document.getElementById('exampleModal').classList.add('show');

  if(document.getElementById('username-validation').style.display === 'block') {
    document.getElementById('username-validation').style.display = 'none';
  }

  if(document.getElementById('password-validation').style.display === 'block') {
    document.getElementById('password-validation').style.display = 'none';
  }

  if(document.getElementById('email-validation').style.display === 'block') {
    document.getElementById('email-validation').style.display = 'none';
  }
};

const closeModal = () => {
  document.getElementById('exampleModal').style.display = 'none';
  document.getElementById('exampleModal').classList.remove('show');

  window.location.href = '/';
};

const createUser = () => {
  // console.log(document.getElementById('username').value)
  // console.log('callling create user')
  fetch('/apis/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      email: document.getElementById('email').value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        if (data[0].code === 400) {
          throw data;
        }
      } else {
        openModal(data.message);
      }
    })
    .catch((err) => {
      let textPassword = '';
      err.forEach((data) => {
        if (data.field === 'username') {
          document.getElementById('username-validation').innerHTML = data.message;
          document.getElementById('username-validation').style.display = 'block';
        }

        if (data.field === 'password') {
          textPassword += " " + data.message;
          document.getElementById('password-validation').innerHTML = textPassword;
          document.getElementById('password-validation').style.display = 'block';
        }

        if (data.field === 'email') {
          document.getElementById('email-validation').innerHTML = data.message;
          document.getElementById('email-validation').style.display = 'block';
        }
      });
    });
};

const loginUser = () => {
  fetch('/apis/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        if (data[0].code === 400) {
          throw data;
        }
      }
      console.log(data);
      window.location.href = '/';
    })
    .catch((err) => {
      let textPassword = '';
      err.forEach((data) => {
        if (data.field === 'username') {
          document.getElementById('username-validation').innerHTML = data.message;
          document.getElementById('username-validation').style.display = 'block';
        }

        if (data.field === 'password') {
          textPassword += " " + data.message;
          document.getElementById('password-validation').innerHTML = textPassword;
          document.getElementById('password-validation').style.display = 'block';
        }
      });
    });
};

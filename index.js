var users = [
    {
      email: "example@.com",
      password: "password",
      amount: 10
    }
  ];
  
  var isLoggedIn = false;
  var currentUser = null;
  
  var loginDiv = document.querySelector(".login-section");
  var registerDiv = document.querySelector(".register-section");
  var dashboard = document.querySelector(".dashboard-section");
  var transferForm = document.querySelector("#transfer-form");
  var transferToInput = document.querySelector("#transfer-to");
  
  function show(element) {
    element.style.display = "block";
  }
  
  function hide(element) {
    element.style.display = "none";
  }
  
  function showLogin() {
    hide(registerDiv);
    hide(dashboard);
    show(loginDiv);
  }
  
  function showRegister() {
    hide(loginDiv);
    hide(dashboard);
    show(registerDiv);
  }
  
  function showDashboard() {
    hide(registerDiv);
    hide(loginDiv);
    show(dashboard);
  }
  
  function greetUser(user) {
    var greetingElement = document.createElement("h4");
    greetingElement.textContent = "Welcome, " + user.email + "!";
    dashboard.insertBefore(greetingElement, dashboard.firstChild).style.textAlign = "center";
  }
  
  function loginUser(email, password) {
    var user = users.find(function(user) {
      return user.email === email && user.password === password;
    });
    if (user) {
      isLoggedIn = true;
      currentUser = user;
      showDashboard();
      greetUser(currentUser);
    } else {
      alert("Invalid email or password");
    }
  }
  
  loginDiv.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var email = formData.get("email");
    var password = formData.get("password");
    loginUser(email, password);
  });
  
  registerDiv.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var email = formData.get("email");
    var password = formData.get("password");
    if (!email || !password) {
      alert("Email and password must be required");
      return;
    }
    if (!users.find(function(user) { return user.email === email; })) {
      users.push({ email: email, password: password, amount: 0 });
      alert("User registered successfully!");
      showLogin();
    } else {
      alert("User already exists");
    }
  });
  
  var navButtons = document.querySelectorAll(".navbar button");
  navButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      var target = event.target.innerText.toLowerCase();
      if (target === "login") showLogin();
      else if (target === "register") showRegister();
    });
  });
  
  transferForm.addEventListener("submit", function(event) {
    event.preventDefault();
    transfer(currentUser);
  });
  
  document.querySelector("#transfer-btn").addEventListener("click", function(event) {
    event.preventDefault();
    show(transferForm);
  });
  
  function transfer(currentUser) {
    var recipientEmail = transferToInput.value;
    var recipient = users.find(function(user) {
      return user.email === recipientEmail;
    });
    if (!recipient) {
      alert("Recipient not found.");
      return;
    }
    var amount = parseFloat(document.querySelector("#transfer-amount").value);
    if (amount >= 1) {
      if (amount <= currentUser.amount) {
        currentUser.amount -= amount;
        recipient.amount += amount;
        alert("Transfer successful!");
      } else {
        alert("Amount is greater than your current balance.");
      }
    } else {
      alert("Please enter a valid amount.");
    }
  }
  
  document.querySelector("#withdraw-btn").addEventListener("click", function(event) {
    event.preventDefault();
    withdraw(currentUser);
  });
  
  document.querySelector("#deposit-btn").addEventListener("click", function(event) {
    event.preventDefault();
    deposit(currentUser);
  });
  
  function withdraw(currentUser) {
    var amount = parseFloat(document.querySelector("#amount").value);
    if (amount >= 1) {
      if (amount <= currentUser.amount) {
        currentUser.amount -= amount;
        alert("Withdrawal successful!");
      } else {
        alert("Amount is greater than your current balance.");
      }
    } else {
      alert("Please enter a valid amount.");
    }
  }
  
  function deposit(currentUser) {
    var amount = parseFloat(document.querySelector("#amount").value);
    if (amount >= 1) {
      currentUser.amount += amount;
      alert("Deposit successful!");
    } else {
      alert("Please enter a valid amount.");
    }
  }
  
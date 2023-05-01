function showAlert(message,color) {
    const alertBox = document.createElement("div");
    if(color === 'red'){
        alertBox.className = "custom-alert-red";
    }else{
        alertBox.className = "custom-alert-green";
    }

    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
  }


  module.exports = {showAlert}

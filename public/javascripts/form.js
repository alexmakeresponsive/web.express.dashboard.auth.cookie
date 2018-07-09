var log = function (d) {
  console.log(d);
};

log('forms scripts imported');






var form       = document.querySelector('#form');
if (!form) {
    form = document.createElement('div');
}


var formInputs = form.getElementsByTagName('input');

var formData   = {};



var alerts = {
    alertSuccess: document.querySelector('#alertSuccess'),
    alertAlert: document.querySelector('#alertAlert')
};


function showAlertSuccess(responseText) {
    alerts.alertSuccess.classList.remove('op0');
    alerts.alertSuccess.innerHTML = responseText;
    setTimeout(function () {
        alerts.alertSuccess.classList.remove('op1');
        alerts.alertSuccess.classList.add('op0');
    }, 2000);
}

function showAlertDanger(status, statusText) {
    alerts.alertAlert.classList.remove('op0');
    alerts.alertAlert.innerHTML = status + ': ' + statusText;
    setTimeout(function () {
        alerts.alertAlert.classList.remove('op1');
        alerts.alertAlert.classList.add('op0');
    }, 4000);
}





form.addEventListener('submit' ,function (e) {
    e.preventDefault();

    for (var i = 0; i < formInputs.length; i++) {
//                    console.log(formInputs[i]);
        formData[formInputs[i].name] = formInputs[i].value;
    }

    // 1.
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем запрос
    var xhrType;
    var xhrUrl;


    xhrType = 'post';
    xhrUrl  = '/login';


    xhr.open(xhrType, xhrUrl, false);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    // 3. Отсылаем запрос
    console.log(formData);

    xhr.send(JSON.stringify(formData));



    for (var i = 0; i < formInputs.length; i++) {
//                    console.log(formInputs[i]);
        formInputs[i].value ='';
    }


    // 4.
    if (xhr.status === 200) {
        showAlertSuccess(xhr.responseText);
        setTimeout(function () {
        window.location.href = "/profile";
        }, 2000);
    } else {
        showAlertDanger( xhr.status, xhr.statusText );
    }

});
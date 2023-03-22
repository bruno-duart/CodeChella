const formulario = document.getElementById("formulario");

var success = true;

formulario.addEventListener("submit", validate);

function validate(event) {

    event.preventDefault();
    const cpfField = document.getElementById("cpf");
    const tipoIngressoField = document.getElementById("tipo-ingresso");
    const dataNascimentoField = document.getElementById("data-nascimento");

    if (!validaCPF(cpfField.value)) {
        alert("Por favor, verifique o CPF inserido.");
        success = false
        event.preventDefault();
    }


    // verifique se o tipo de ingresso foi selecionado
    if (tipoIngressoField.value === '') {
        alert('Por favor, selecione um tipo de ingresso.');
        success = false
        event.preventDefault();
    }

    // verifique se a data de nascimento foi inserida
    if (dataNascimentoField.value === '') {
        alert('Por favor, insira sua data de nascimento.');
        success = false;
        event.preventDefault();
        return false;
    }

    if (!validarDataNascimento(dataNascimentoField)) {
        alert('Não é permitida a entrada de menores de 10 anos no evento.');
        success = false;
        event.preventDefault();
    }

    if (success) {
        if (storageAvailable('localStorage')) {
            // Yippee! We can use localStorage awesomeness
            populateStorage();
            window.location.href="../pages/ingresso.html";
        }
        else {
            // Too bad, no localStorage for us
            alert("Existem problemas na submissão")
        }
    }
}

function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // remove quaisquer caracteres que não sejam dígitos
    if (cpf == '') return false; // se o CPF estiver vazio, retorna false

    // Verifica se o CPF é válido
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999") {
        return false;
    }

    var soma = 0;
    var resto;

    for (var i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (var i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true; // se o CPF passar em todas as validações, retorna true
}

function validarDataNascimento(dataNascimentoField) {
    const dataNascimento = new Date(dataNascimentoField.value);
    const dataAtual = new Date();
    const diferencaAnos = (dataAtual - dataNascimento) / (1000 * 60 * 60 * 24 * 365);

    if (diferencaAnos < 10) {
        return false;
    } else {
        return true;
    }
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

function populateStorage() {
    localStorage.setItem('nome-completo', document.getElementById('nome-completo').value);
    localStorage.setItem('email', document.getElementById('email').value);
    localStorage.setItem('cpf', document.getElementById('cpf').value);
    localStorage.setItem('tipo-ingresso', document.getElementById('tipo-ingresso').value);
    localStorage.setItem('data-nascimento', document.getElementById('data-nascimento').value);
}
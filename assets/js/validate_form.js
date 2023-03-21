const submit = document.getElementById("submit");

submit.addEventListener("click", validate);

function validate(event) {

    const cpfField = document.getElementById("cpf");
    const tipoIngressoField = document.getElementById("tipo-ingresso");
    const dataNascimentoField = document.getElementById("data-nascimento");

    if (!validaCPF(cpfField.value)) {
        alert("Por favor, verifique o CPF inserido.")
        event.preventDefault();
    }


    // verifique se o tipo de ingresso foi selecionado
    if (tipoIngressoField.value === '') {
        alert('Por favor, selecione um tipo de ingresso.');
        event.preventDefault();
    }

    // verifique se a data de nascimento foi inserida
    if (dataNascimentoField.value === '') {
        alert('Por favor, insira sua data de nascimento.');
        event.preventDefault();
    }

    if (!validarDataNascimento(dataNascimentoField)) {
        alert('Não é permitida a entrada de menores de 10 anos no evento.');
        event.preventDefault();
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
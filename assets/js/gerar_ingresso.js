const nome = localStorage.getItem("nome-completo");
const setor = localStorage.getItem("tipo-ingresso");
gerarIngresso(nome, setor);

function gerarIngresso(nome, setor) {
    const nomeField = document.getElementById("portador__nome");
    const setorField = document.getElementById("portador__setor");

    nomeField.innerHTML = nome;
    setorField.innerHTML = "Setor " + setor;
}
window.addEventListener( 'load', function(event) {
    geolocalizar();
});

function geolocalizar() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(posicao) {
            var url = "http://nominatim.openstreetmap.org/reverse?lat="+posicao.coords.latitude+"&lon="+posicao.coords.longitude+"&format=json&json_callback=preencherCep";

            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        });
    } else {
        alert('Seu navegador não suporta geolocation!');
    }
}

function preencherCep(dados) {
    document.querySelector('#cep').value = dados.address.postcode;
}

function buscarCep(event, form) {
    event.preventDefault();
    const inputCep = form.cep;
    if (inputCep) {
        const cep = inputCep.value;
        if (cep.length === 8) {
            const URL = `https://viacep.com.br/ws/${cep}/json`;
            fetch(URL)
                .then(resposta => resposta.json())
                .then(data => mostrarResposta(data))
                .catch(erro => console.error(erro));
        }
    }
}

function mostrarResposta(cep) {
    const mensagem = `
        CEP: ${cep.cep}
        Logradouro: ${cep.logradouro}
        Complemento: ${cep.complemento}
        Bairro: ${cep.bairro}
        Cidade ${cep.localidade}
        Estado: ${cep.uf}
    `;
    alert(mensagem);
}

const formulario = document.getElementById("formPoke");

formulario.addEventListener("submit", async function(evento) {

    evento.preventDefault();

    const id = document.getElementById("idPoke").value;

    const msg = document.getElementById("msg");

    const carta = document.getElementById("resultado");

    // Esconde a carta enquanto pesquisa
    carta.style.display = "none";

    try {

        msg.textContent = "Carregando Pokémon...";

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado!");
        }

        const pokemon = await resposta.json();

        // NOME
        document.getElementById("nomePokemon").textContent =
            pokemon.name;

        // ID
        document.getElementById("idCarta").textContent =
            "Nº " + pokemon.id;

        // IMAGEM
        const imagem =
            pokemon.sprites.other["official-artwork"].front_default;

        document.getElementById("imgPoke").src =
            imagem || pokemon.sprites.front_default || "";

        // EXPERIÊNCIA
        document.getElementById("basePoke").textContent =
            pokemon.base_experience + " XP";

        // ALTURA
        document.getElementById("alturaPoke").textContent =
            (pokemon.height / 10) + " metros";

        // PESO
        document.getElementById("pesoPoke").textContent =
            (pokemon.weight / 10) + " kg";

        // MOSTRA A CARTA
        carta.style.display = "block";

        msg.textContent = "Pokémon encontrado!";

    } catch (erro) {

        msg.textContent = erro.message;

        carta.style.display = "none";

        console.error(erro);

    }

});

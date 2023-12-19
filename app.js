document.addEventListener('DOMContentLoaded',() => {

    //IMAGENS
    const cardArray = [
    {
        name: 'ganhou',
        img: 'images/ganhou.png'
    },
    {
        name:'ganhou',
        img: 'images/ganhou.png'
    },
    {
        name: 'correndo',
        img: 'images/correndo.png'
    },
    {
        name: 'correndo',
        img: 'images/correndo.png'
    },
    {
        name: 'direita',
        img: 'images/direita.png'
    },
    {
        name: 'direita',
        img: 'images/direita.png'
    },
    {
        name: 'esquerda',
        img: 'images/esquerda.png'
    },
    {
        name: 'esquerda',
        img: 'images/esquerda.png'
    },
    {
        name: 'pulo',
        img: 'images/pulo.png'
    },
    {
        name: 'pulo',
        img: 'images/pulo.png'
    },
    {
        name:'tras',
        img:'images/tras.png'
    },
    {
        name:'tras',
        img:'images/tras.png'
    }
    ]

    //som
    var vitoria = new Audio();
    vitoria.src = "sound/vitoria.wav"

    //posicionamento dos cards
    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');

    const resultDisplay = document.querySelector('#result');
    var cardsChosen = [];
    var cardsChosenId = [];
    var pares = [];


    //criando a tela
    function createBoard(){
        for(let i = 0; i< cardArray.length; i++){
            var card = document.createElement('img')
            card.setAttribute('src','images/card.png')
            card.setAttribute('data-id',i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    //conferindo pares
    function checkforMatch(){
        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        //Clicar duas vezes no mesmo card
        if(optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src','images/card.png');
            cards[optionTwoId].setAttribute('src', 'images/card.png');
            alert("Você clicou no mesmo card")
        }
        
        //formando pares
        else if(cardsChosen[0] == cardsChosen[1]){
            alert("Você formou um par!")
            cards[optionOneId].setAttribute('src','images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cards[optionOneId].removeEventListener('click',flipCard)
            cards[optionTwoId].removeEventListener('click',flipCard)
            pares.push(cardsChosen)
        }

        //não formou um par
        else {
            cards[optionOneId].setAttribute('src', 'images/card.png')
            cards[optionTwoId].setAttribute('src','images/card.png')
            alert('Ops! Jogue novamente')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = pares.length

        if(pares.length == cardArray.length/2){
            resultDisplay.textContent = 'Parabéns! Você encontrou todos os pares.'
            vitoria.play();
        }
    }

    //virando os cartões
    function flipCard(){
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)

        if(cardsChosen.length == 2){
            setTimeout(checkforMatch,500)
        }
    }
    createBoard();
})
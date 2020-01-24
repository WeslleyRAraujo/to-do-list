const ulELement = document.querySelector('.insert ul'); //variável responsável por manipular nossa <ul>
const inputElement = document.querySelector('#campo'); //variável responsável por manipular nossa <textarea>
const buttonELement = document.querySelector('#botao'); //variável responsável por manipular o nosso botão

const list = JSON.parse(localStorage.getItem("lista")) || []; //criando nossa lista no localstorage no Browser


// função responsável por atualizar nossa lista
function refreshList() {
    ulELement.innerHTML = '';

    for (item of list) {
        var listELement = document.createElement('li'); // variável responsável por criar um <li>

        var itemELement = document.createTextNode(item); // variável responsável por guardar o texto 

        //variável responsável por criar a nossa tag que possui o texto 'excluir' com atributos <a href="#" class="delete-button">
        var deleteElement = document.createElement('a');
        deleteElement.setAttribute('href', '#');
        deleteElement.setAttribute('class', 'delete-button');

        var pos = list.indexOf(item); //variável reponsável por passar por toda nossa lista
        deleteElement.setAttribute('onclick', 'deleteItem(' + pos + ')'); //variável que captura a posição do nosso elemento clicado

        var deleteText = document.createTextNode('Excluir'); // criando o texto para inserir no na nossa variável deleteElement

        deleteElement.appendChild(deleteText); // adotando o texto para o deleteElement

        // a <li> adotando o texto que foi digitado e o botão de deletar
        listELement.appendChild(itemELement);   
        listELement.appendChild(deleteElement);

        // a <ul> adotando a <li>
        ulELement.appendChild(listELement);
    }
}

// chamando nossa função responsável por atualizar nossa lista na tela
refreshList();

// função responsável por adicionar itens em tela
function addItem() {
    var itemText = inputElement.value; // variável que pega o valor digitado na <textarea>
    list.push(itemText); //colocando esse novo valor na nossa lista
    emptyInput(); //chamando a função que verifica se o formulário está vazio 
    saveToStorage(); //salvando no localStorage
    inputElement.value = ''; // esvaziando nosso formulário
}

// adicionando evento ao botão que ao ser clicado chama a função addItem
buttonELement.onclick = addItem;

// função responsável por deletar o item selecionado
function deleteItem(pos) { // pegando nossa variável pos que existe no refreshList
    list.splice(pos, 1); // passando pela posição desejada e apagando um item
    refreshList(); // chamando a função que atualiza nossa lista em tela
    saveToStorage(); // salvando no localStorage
}

//função responsável por salvar nossa lista no localStorage do Browser
function saveToStorage() {
    localStorage.setItem('lista', JSON.stringify(list));
}

// função que verifica se o formulário está vazio ou não, caso não esteja a gente chama a função refreshList
function emptyInput() {
    if(inputElement.value === ''){
        alert('Digite algo...');
    }else{
        refreshList();
    }
}
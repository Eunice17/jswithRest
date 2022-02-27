const urlApi = "https://jsonplaceholder.typicode.com";

const caja = document.querySelector("#row");

const labels = ['name', 'email', 'phone', 'website'];
let postUsuarios = null;
const rowPost = document.querySelector("#rowPost");

const postUsuario = (() => {
    fetch(`${urlApi}/posts`).then(response => {
        response.json().then(res => {
            postUsuarios = res;
        })
    })
});

postUsuario();
// Mejorar función ;)
const posteamos = ((element, userId, usuario) => {
    element.addEventListener(('click'), () => {
        rowPost.innerHTML = '';
        postUsuarios.map(post => { 
            if (post.userId === userId) {
                let cardPost = document.createElement('div');
                let bodyPost = document.createElement('div');
                let postUser = document.createElement('h4');
                let postTitle = document.createElement('h5');
                let postBody = document.createElement('p');
                cardPost.className = "card-post";
                bodyPost.className = "body-post";
                postUser.appendChild(document.createTextNode(usuario));
                postTitle.appendChild(document.createTextNode(post.title));
                postBody.appendChild(document.createTextNode(post.body));
                bodyPost.appendChild(postUser);
                bodyPost.appendChild(postTitle);
                bodyPost.appendChild(postBody);
                cardPost.appendChild(bodyPost);
                rowPost.appendChild(cardPost);
            }
        });
    })
});

fetch(`${urlApi}/users`).then( response => {
    response.json().then( res => {
        res.forEach(element => {
            let card = document.createElement('div');
            card.className = "card";
            let title = document.createElement('h2');
            title.textContent = "User_";
            card.appendChild(title);
            labels.map(label => {
                let parrafo = document.createElement('p');
                parrafo.appendChild(document.createTextNode(element[label]));
                card.appendChild(parrafo);
            })
            caja.appendChild(card);

            posteamos(card, element.id, element.name);
        });
    })
});
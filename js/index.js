function addToggleActiveEvent(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.addEventListener("click", () => {
            element.classList.toggle("active");
        });
    });
}

addToggleActiveEvent(".card");
addToggleActiveEvent(".icon3");

document.querySelectorAll('.link-icon-ancora').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var sectionId = this.getAttribute('href');
        var section = document.querySelector(sectionId);
        if (section) {
            window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
        }
    });
});


const repositories = document.querySelector('.projetos');

function getApiGitHub() {
    fetch('https://api.github.com/users/GabeYanes1217/repos')
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }

            let data = await res.json()
            // Passo 1: Ordenar os repositórios pela data de criação em ordem decrescente
            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            // Passo 2: Limitar a exibição aos 6 repositórios mais recentes
            data.slice(0, 6).forEach(item => {
                let project = document.createElement('div');

                project.innerHTML = `

                    <div class="repbox">
                        <span class="content"></span>
                        <a href="${item.html_url}" target = "_blank">
                            <h4>${item.name}</h4>
                            <span class="data">${item.created_at}</span>
                        </a>
                    </div>

                `
                repositories.appendChild(project);
            })
        })
}

getApiGitHub()


document.getElementById('myForm').addEventListener('submit', function (event) {
    // Impede o envio do formulário se a validação falhar
    if (!validateForm()) {
        event.preventDefault();
    }
});

function validateForm() {
    // Obtém os elementos do formulário
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');

    // Variável para controlar a validação
    var valid = true;

    // Valida o campo nome
    if (name.value.trim() === '') {
        alert('Por favor, preencha o campo Nome.');
        valid = false;
    }

    // Valida o campo email (verifica se não está vazio e se é um formato de email válido)
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === '' || !emailPattern.test(email.value)) {
        alert('Por favor, preencha o campo Email com um endereço de email válido.');
        valid = false;
    }

    // Valida o campo mensagem
    if (message.value.trim() === '') {
        alert('Por favor, preencha o campo Mensagem.');
        valid = false;
    }

    // Retorna o status da validação
    return valid;
}


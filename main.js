const apiBaseURL = 'https://663c040117145c4d8c34f855.mockapi.io/AC2__Usuario';
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById('loginButton');
    const cadastrarButton = document.getElementById('cadastrarButton');
    const logoutButton = document.getElementById('logoutButton');

    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            const usuario = document.getElementById('usuario').value;
            const senha = document.getElementById('senha').value;

            if (!usuario || !senha) {
                document.getElementById('loginError').innerText = 'Por favor, preencha todos os campos.';
                return;
            }

            try {
                const response = await fetch(`${apiBaseURL}?usuario=${usuario}`);
                const users = await response.json();

                if (users.length === 0) {
                    document.getElementById('loginError').innerText = 'Usuário não encontrado.';
                } else {
                    const user = users[0];
                    if (user.senha === senha) {
                        localStorage.setItem('usuario', JSON.stringify(user));
                        window.location.href = 'parabens.html';
                    } else {
                        document.getElementById('loginError').innerText = 'Usuário ou senha inválidos.';
                    }
                }
            } catch (error) {
                document.getElementById('loginError').innerText = 'Erro ao conectar ao servidor.';
            }
        });
    }

    if (cadastrarButton) {
        cadastrarButton.addEventListener('click', async () => {
            const nomeCompleto = document.getElementById('nomeCompleto').value;
            const usuarioCadastro = document.getElementById('usuarioCadastro').value;
            const senhaCadastro = document.getElementById('senhaCadastro').value;

            if (!nomeCompleto || !usuarioCadastro || !senhaCadastro) {
                document.getElementById('cadastroError').innerText = 'Por favor, preencha todos os campos.';
                return;
            }

            const newUser = {
                nomeCompleto,
                usuario: usuarioCadastro,
                senha: senhaCadastro
            };

            try {
                const response = await fetch(apiBaseURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                });

                if (response.ok) {
                    window.location.href = 'index.html';
                } else {
                    document.getElementById('cadastroError').innerText = 'Erro ao cadastrar usuário.';
                }
            } catch (error) {
                document.getElementById('cadastroError').innerText = 'Erro ao conectar ao servidor.';
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('usuario');
            window.location.href = 'index.html';
        });

        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario) {
            document.getElementById('usuarioNome').innerText = usuario.nomeCompleto;
        } else {
            window.location.href = 'index.html';
        }
    }
});

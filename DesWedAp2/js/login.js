function logout() {
    window.sessionStorage.removeItem("token");
    window.location.href = "index.html";
}

function login() {
    const enteredPassword = document.getElementById("password").value;
    const hashedPassword = hex_sha256(enteredPassword).toString();
    const defaultPassword = "SENHA";

    // Salva o hash da senha padrão localmente
    localStorage.setItem(
        "passwordHash",
        hex_sha256(defaultPassword).toString()
    );

    // Compara o hash inserido com o armazenado localmente
    if (hashedPassword === localStorage.getItem("passwordHash")) {
        // Senha correta, permitir acesso ao conteúdo principal
        localStorage.setItem("authenticated", "true");
        window.location.href = "index.html";
    } else {
        alert("Senha incorreta");
    }
}

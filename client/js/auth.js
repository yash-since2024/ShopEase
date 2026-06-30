/* ==========================================
   AUTH.JS
   Handles login/signup UI logic
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm");
    const signupForm = document.querySelector("#signupForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.querySelector("#loginEmail")?.value;
            const password = document.querySelector("#loginPassword")?.value;

            try {
                const result = await login({ email, password });
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user));
                window.location.href = "../index.html";
            } catch (error) {
                showMessage(error.message || "Login failed", "error");
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.querySelector("#signupName")?.value;
            const email = document.querySelector("#signupEmail")?.value;
            const password = document.querySelector("#signupPassword")?.value;

            try {
                const result = await register({ name, email, password });
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user));
                window.location.href = "../index.html";
            } catch (error) {
                showMessage(error.message || "Signup failed", "error");
            }
        });
    }
});

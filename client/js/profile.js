/* ==========================================
   PROFILE.JS
   Handles profile page loading & updates
========================================== */

document.addEventListener("DOMContentLoaded", async () => {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
        return;
    }

    const profileName = document.querySelector(".profile-name");
    const profileEmail = document.querySelector(".profile-email");
    const profilePhone = document.querySelector("#profilePhone");
    const profileAddress = document.querySelector("#profileAddress");
    const profileNameInput = document.querySelector("#profileName");
    const profileEmailInput = document.querySelector("#profileEmail");
    const profileForm = document.querySelector("#profileForm");

    try {
        const result = await getProfile();
        const user = result.user || {};

        if (profileName) profileName.textContent = user.name || "User";
        if (profileEmail) profileEmail.textContent = user.email || "";
        if (profilePhone) profilePhone.value = user.phone || "";
        if (profileAddress) profileAddress.value = user.address || "";
        if (profileNameInput) profileNameInput.value = user.name || "";
        if (profileEmailInput) profileEmailInput.value = user.email || "";

        if (profileForm) {
            profileForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const name = document.querySelector("#profileName")?.value || user.name || "";
                const email = document.querySelector("#profileEmail")?.value || user.email || "";
                const phone = document.querySelector("#profilePhone")?.value || user.phone || "";
                const address = document.querySelector("#profileAddress")?.value || user.address || "";

                try {
                    const updated = await updateProfile({ name, email, phone, address });
                    showMessage("Profile updated", "success");
                    if (profileName) profileName.textContent = updated.user.name || "User";
                    if (profileNameInput) profileNameInput.value = updated.user.name || "";
                    if (profileEmail) profileEmail.textContent = updated.user.email || "";
                    if (profileEmailInput) profileEmailInput.value = updated.user.email || "";
                } catch (error) {
                    showMessage(error.message || "Update failed", "error");
                }
            });
        }
    } catch (error) {
        console.error(error);
        showMessage("Unable to load profile", "error");
    }
});

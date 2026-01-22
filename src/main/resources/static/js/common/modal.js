const Modal = (() => {
    let currentModal = null;

    function open(templateId, data = {}) {
        const template = document.getElementById(templateId);
        if (!template) {
            console.error("Template not found:", templateId);
            return;
        }

        const container = document.getElementById("modal-container");
        if (!container) {
            console.error("#modal-container not found");
            return;
        }

        if (currentModal) {
            currentModal.remove();
            currentModal = null;
        }

        const clone = template.cloneNode(true);
        clone.classList.remove("hidden");
        clone.style.display = "block";
        bindData(clone, data);

        container.appendChild(clone);
        currentModal = clone;
    }

    function close() {
        if (currentModal) {
            currentModal.remove();
            currentModal = null;
        }
        hideBackdrop();
    }

    function bindData(modal, data) {
        if (data.title)
            modal.querySelector("[data-modal-title]").innerText = data.title;

        if (data.message)
            modal.querySelector("[data-modal-message]").innerText = data.message;

        modal.querySelector("[data-modal-cancel]")?.addEventListener("click", close);
    }

    function showBackdrop() {
        document.getElementById("modal-backdrop").classList.remove("hidden");
    }

    function hideBackdrop() {
        document.getElementById("modal-backdrop").classList.add("hidden");
    }

    return { open, close };
})();

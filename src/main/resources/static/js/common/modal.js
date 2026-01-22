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
        // 기존 모달 제거
        if (currentModal) {
            currentModal.remove();
            currentModal = null;
        }

        // template 태그인지 확인
        let clone;
        if (template.tagName === "TEMPLATE") {
            clone = template.content.cloneNode(true);
        } else {
            clone = template.cloneNode(true);
        }

        bindData(clone, data);

        container.appendChild(clone);
        currentModal = container.lastElementChild;
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


window.Modal = Modal;
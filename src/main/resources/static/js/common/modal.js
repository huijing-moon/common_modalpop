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


    async function openDynamicModal(userId) {
        // 서버 컨트롤러를 호출하여 HTML 조각(Fragment)을 받아옴
        const response = await fetch('/users/detail/' + userId);
        const html = await response.text();

        const container = document.getElementById("modalContainer");
        container.innerHTML = html; // 레이아웃의 빈 박스에 HTML 주입
        container.style.display = "block"; // 화면에 표시
    }

    function closeModal() {
        const container = document.getElementById("modalContainer");
        container.style.display = "none";
        container.innerHTML = ""; // 메모리 정리를 위해 내용 비움
    }

    window.onclick = function(event) {
        console.log(2222222222)
        const container = document.getElementById("modalContainer");
        // 클릭된 대상이 container(어두운 배경) 자체일 경우에만 닫기
        if (event.target == container) {
            closeModal();
        }
    }


    return { open, close };


})();


window.Modal = Modal;
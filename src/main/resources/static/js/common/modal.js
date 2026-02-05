const Modal = (() => {
    let currentModal = null;
    const container = () => document.getElementById("1번")

    function open(templateId, data = {}) {
        const template = document.getElementById(templateId);
        if (!template) return;

        // template 태그인지 확인
        let clone;
        if (template.tagName === "TEMPLATE") {
            clone = template.content.cloneNode(true);
        } else {
            clone = template.cloneNode(true);
        }

        bindData(clone, data);

        container().appendChild(clone);
        currentModal = container().lastElementChild;
    }

    function close() {
        const el = container();
        if (el) {
            el.style.display = "none";
            el.innerHTML = "";
        }
        currentModal = null;

    }

    function bindData(modal, data) {
        if (data.title)
            modal.querySelector("[data-modal-title]").innerText = data.title;

        if (data.message)
            modal.querySelector("[data-modal-message]").innerText = data.message;

       // modal.querySelector("[data-modal-cancel]")?.addEventListener("click", close);
    }

    async function fetch(url){
            const response = await window.fetch(url);
            const html = await response.text();
            const el = container();
            el.innerHTML = html;
            el.style.display = "flex";
            currentModal = el;
    }


    function show(content){
        const el = container();
        el.innerHTML = "" ;
        el.appendChild(content);
        el.style.display = "flex";
        currentModal = el;
    }

    // 배경 클릭 시 닫기
    document.addEventListener("click", (e) => {
        if (e.target === container()) close();
    });

    // ESC 키로 닫기
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && currentModal) close();
    });

    //확인
    function confirm({title, message, onConfirm, onCancel}){
        open("confirmModal" ,{title, message});

        //확인 버튼에 콜백 연결
        const el = container();
        el.querySelector("[data-modal-confirm]")?.addEventListener("click", () =>{
            if(onConfirm) onConfirm();
            close();
        })

        el.querySelector("[data-modal-cancel]").addEventListener("click", () => {
            if(onCancel) onCancel();
            close();
        })
    }

    function alert({title, message, onConfirm}){
        open("alertModal", {title, message});

        //확인 버튼에 콜백 연결
        const el = container();
        el.querySelector("[data-modal-confirm]")?.addEventListener("click", () => {
            if(onConfirm) onConfirm();
            close();
        })


    }

    return { open, fetch, close ,confirm, alert};


})();


window.Modal = Modal;
const Modal = (() => {
    let modalStack = [];

    const container = () => document.getElementById("modalContainer")

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
        const modal = container().lastElementChild;
        modalStack.push(modal);
        container().style.display = "flex";
    }

    function close() {
        const el = container();
        if(!el || modalStack.length == 0) return;

        //마지막 모달만 제거
        const lastModal = modalStack.pop();
        if(lastModal){
            lastModal.remove();
        }

        if(modalStack.length == 0){
            el.style.display = "none";
        }
    }

    //한번에 닫는 함수
    function closeAll(){
        const el = container();
        if(el){
            el.style.display = "none";
            el.innerHTML = "";
        }
    }

    function bindData(modal, data) {
        if (data.title)
            modal.querySelector("[data-modal-title]").innerText = data.title;

        if (data.message)
            modal.querySelector("[data-modal-message]").innerText = data.message;

       // modal.querySelector("[data-modal-cancel]")?.addEventListener("click", close);
    }

    async function fetch(url){
        try{
            const response = await window.fetch(url);
            if(!response.ok){
                throw new Error(`서버 오류 : ${response.status}`)
            }
            const html = await response.text();
            const el = container();
            el.innerHTML = html;
            el.style.display = "flex";


        } catch (error){
            console.error("Modal fetch 오류:" , error);
            open("alertModal",{
                title : "오류",
                message : "데이터를 불러오는 데 실패했습니다."
            })
            const el = container();
            el.style.display = "flex";

        }


    }


    function show(content){
        const el = container();
        el.innerHTML = "" ;
        el.appendChild(content);
        el.style.display = "flex";

    }

    // 배경 클릭 시 닫기
    document.addEventListener("click", (e) => {
        if (e.target === container()) close();
    });

    // ESC 키로 닫기
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalStack.length > 0 ) close();
    });

    //확인
    function confirm({title, message, onConfirm, onCancel}){
        return new Promise((resolve) => {
            open("confirmModal" ,{title, message});

            //확인 버튼에 콜백 연결
            const el = container();
            el.querySelector("[data-modal-confirm]")?.addEventListener("click", () =>{
                close();
                resolve(true);
            })


            el.querySelector("[data-modal-cancel]").addEventListener("click", () => {
                close();
                resolve(false);
            })

        })
    }

    function loading(message = "로딩 중...."){
        open("loadingModal",{ message });
        const el = container();
        el.style.display = "flex"

    }

    function alert({title, message, onConfirm}){
        return new Promise((resolve) => { // resolve:성공, reject : 실패
            open("alertModal", {title, message});

            //확인 버튼에 콜백 연결
            const el = container();
            el.querySelector("[data-modal-confirm]")?.addEventListener("click", () => {
                close();
                resolve();
            })

        })

    }


    async function saveUser() {
        Modal.loading("저장 중...");

        try {
            const response = await fetch("/users/save", { ... });
            const result = await response.json();

            Modal.close();

            if (result.success) {
                await Modal.alert({ title: "완료", message: result.message });
            }
        } catch (error) {
            Modal.close();
            await Modal.alert({ title: "오류", message: "저장 실패" });
        }
    }

    return { open, fetch, close , closeAll, confirm, alert, loading};


})();


window.Modal = Modal;
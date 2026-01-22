document.addEventListener("DOMContentLoaded", () => {
    console.log("home page loaded");

    initHome();
});

function initHome() {
    /**
     * 모달 제어용 공통 JS
     */
    console.log(333333)
}

// 모달 열기 함수
function openModal(button) {
    console.log(button)
    const modalId = button.dataset.modal;

    Modal.open(modalId, {
        title: button.dataset.title,
        message: button.dataset.message
    });
}

// 모달 닫기 함수
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// 확인 버튼 동작 (예시)
function confirmAction(modalId) {
    alert(modalId + ' 확인됨');
    closeModal(modalId);
}

document.addEventListener('DOMContentLoaded', () => {
    // 모든 모달 닫기 버튼에 이벤트 바인딩
    const modal = document.getElementById("myModal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.querySelector(".close-btn");
    const confirmBtn = document.getElementById("confirmBtn");

    // 1. 모달 열기
    openBtn.onclick = function() {
        modal.style.display = "block";
    }

    // 2. 닫기 버튼(X) 클릭 시 닫기
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // 3. 확인 버튼 클릭 시 닫기
    confirmBtn.onclick = function() {
        modal.style.display = "none";
        alert("확인되었습니다!");
    }

    // 4. 모달 바깥 영역 클릭 시 닫기
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // 배경 클릭 시 닫기
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            event.target.style.display = 'none';
        }
    });



});

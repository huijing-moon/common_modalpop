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

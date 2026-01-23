async function openDynamicModal(userId) {
    // 1. 서버에 Fragment 요청 (Fetch API 사용)
    const response = await fetch(`/users/detail/${userId}`);
    const html = await response.text();

    // 2. 받은 HTML 조각을 컨테이너에 삽입
    const container = document.getElementById("modalContainer");
    container.innerHTML = html;

    // 3. 모달 표시
    container.style.display = "flex";
}

function closeModal() {
    const container = document.getElementById("modalContainer");
    if (container) {
        container.style.display = "none"; // 배경 숨기기
        container.innerHTML = "";         // 주입된 HTML 제거
    }
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
// function closeModal(modalId) {
//     const modal = document.getElementById(modalId);
//     if (modal) {
//         modal.style.display = 'none';
//     }
// }
//



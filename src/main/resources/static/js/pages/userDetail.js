async function openDynamicModal(userId) { //페이지 이동 없이 모달만 동적으로 열기
    // 1. 서버에 Fragment 요청 (Fetch API 사용)
    const response = await fetch(`/users/detail/${userId}`); //비동기 처리 필요
    const html = await response.text(); //html 문자열을 꺼냄.

    // 2. 받은 HTML 조각을 컨테이너에 삽입
    const container = document.getElementById("modalContainer"); //<div id="modalContainer"></div> 요소가 있어야 함.
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


async function saveUser() {
    const form = document.getElementById("userForm");
    const formData = new URLSearchParams(new FormData(form));

    try {
        const response = await fetch("/users/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            closeModal();
        } else {
            alert("저장에 실패했습니다.");
        }
    } catch (error) {
        console.error("저장 오류:", error);
        alert("서버 요청 중 오류가 발생했습니다.");
    }
}





function onConfirm() {
   alert("확인되었습니다.");
   closeModal();
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



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
            Modal.alert(result.message);
            closeModal();
        } else {
            Modal.alert("저장에 실패했습니다.");
        }
    } catch (error) {
        console.error("저장 오류:", error);
        Modal.alert("서버 요청 중 오류가 발생했습니다.");
    }
}


function onConfirm() {
   alert("확인되었습니다.");
   Modal.close();
}


// 서버 Fragment 모달 열기
function openDynamicModal(userId) {
    Modal.fetch('/users/detail/' + userId);
}

// 클라이언트 템플릿 모달 열기 (confirm 등)
function openModal(button) {
    Modal.confirm(button.dataset.modal, {
        title: button.dataset.title,
        message: button.dataset.message,
        onConfirm:() => {
            //삭제 api 호출 등의 로직 추가
            alert("삭제되었습니다.");
        },
        onCancel: () => {
            alert("취소되었습니다.");
        }
    });
}

function closeModal(button){
    Modal.close();
}
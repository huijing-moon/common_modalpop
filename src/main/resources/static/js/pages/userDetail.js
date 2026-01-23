async function openDynamicModal(userId) {
    // 1. 서버에 Fragment 요청 (Fetch API 사용)
    const response = await fetch(`/users/detail/${userId}`);
    const html = await response.text();

    // 2. 받은 HTML 조각을 컨테이너에 삽입
    const container = document.getElementById("modalContainer");
    container.innerHTML = html;

    // 3. 모달 표시
    container.style.display = "block";
}

function closeModal() {
    document.getElementById("modalContainer").style.display = "none";
    document.getElementById("modalContainer").innerHTML = ""; // 내용 초기화
}
package org.example.practice01;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class ViewController {



    @GetMapping("/")
    public String home() {
        return "pages/userDetail";
    }

    @GetMapping("/users/detail/{id}")
    public String getUserDetail(@PathVariable("id") Long id, Model model) {

        // id == 2 이면 폼 모달 반환
        if (id == 2) {
            return "fragments/modal/modal-fragment :: formModal";
        }

        // VO 대신 Map을 사용하여 임시 데이터 생성
        Map<String, Object> user = new HashMap<>();
        user.put("id", id);
        System.out.println(user.get("id"));

        // id 값에 따라 이름을 다르게 설정 (파라미터 전달 확인용)
        if (id == 1) {
            user.put("name", "홍길동");
            user.put("email", "hong@test.com");
            user.put("regDate", "2026-01-23");
        } else {
            user.put("name", "이순신");
            user.put("email", "lee@test.com");
            user.put("regDate", "2026-01-23");
        }
        System.out.println(user.get("name"));


        model.addAttribute("user", user);
        // "파일경로 :: 프래그먼트이름" 형식으로 반환
        return "fragments/modal/modal-fragment :: user-detail-modal";
    }

    @PostMapping("/users/save")
    @ResponseBody
    public Map<String, Object> saveUser(@RequestParam("userName") String userName,
                                        @RequestParam("role") String role) {
        System.out.println("=== 사용자 저장 요청 ===");
        System.out.println("이름: " + userName);
        System.out.println("역할: " + role);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "사용자가 저장되었습니다.");
        return response;
    }

}

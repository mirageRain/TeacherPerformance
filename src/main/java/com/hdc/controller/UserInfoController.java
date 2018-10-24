package com.hdc.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/userInfo")
public class UserInfoController {
	
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String userInfoView(@AuthenticationPrincipal User user) {
		Map<String, Object> map = new HashMap<>();
		map.put("code", 200);
		map.put("meg", "");
		map.put("data", user);
		return "admin/index";
	}
	

}

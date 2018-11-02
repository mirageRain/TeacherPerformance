package com.hdc.controller.teacher;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hdc.service.impl.AuthoritiesServiceImpl;

@Controller
@RequestMapping("/teacher/userinfo")
public class UserInfoController {
	
	@Autowired
	private AuthoritiesServiceImpl authoritiesServiceImpl;
	
	@ResponseBody
	public Map<String, Object> getAuthoritiesList() {
		Map<String, Object> map = new HashMap<>();
		
		return (Map<String, Object>) map.put("data", authoritiesServiceImpl.getAuthoritiesList());
	}
	
}

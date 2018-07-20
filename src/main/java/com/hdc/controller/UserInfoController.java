package com.hdc.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/admin")
public class UserInfoController {
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String addAddress() {
		return "teacher/index";
	}
	

}

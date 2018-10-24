package com.hdc.controller.teacher;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/teacher")
public class TeacherView {
	
	@RequestMapping(value = "/certifiedScore", method = RequestMethod.GET)
	public String certifiedScoreView() {
		return "teacher/certifiedScore";
	}
	
	@RequestMapping(value = "/certifyingScore", method = RequestMethod.GET)
	public String certifyingScoreView() {
		return "teacher/certifyingScore";
	}
	
	@RequestMapping(value = "/changePwd", method = RequestMethod.GET)
	public String changePwdView() {
		return "teacher/changePwd";
	}
	
	@RequestMapping(value = "/gradingStandard", method = RequestMethod.GET)
	public String gradingStandardView() {
		return "teacher/gradingStandard";
	}
	
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String mainView() {
		return "teacher/main";
	}
	
	@RequestMapping(value = "/newsAdd", method = RequestMethod.GET)
	public String newsAddView() {
		return "teacher/newsAdd";
	}
	
	
	
	@RequestMapping(value = "/scoreReport", method = RequestMethod.GET)
	public String scoreReportView() {
		return "teacher/scoreReport";
	}
	
	@RequestMapping(value = "/userInfo", method = RequestMethod.GET)
	public String userInfoView() {
		return "teacher/userInfo";
	}
	
	@RequestMapping(value = "/scoreDeclaration", method = RequestMethod.GET)
	public String scoreDeclarationView() {
		return "teacher/scoreDeclaration";
	}
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String indexView() {
		return "teacher/index";
	}
	
}

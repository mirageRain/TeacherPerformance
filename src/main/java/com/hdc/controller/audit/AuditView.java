package com.hdc.controller.audit;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/audit")
public class AuditView {
	
	@RequestMapping(value = "/certifiedScore", method = RequestMethod.GET)
	public String certifiedScoreView() {
		return "audit/certifiedScore";
	}
	
	@RequestMapping(value = "/certifyingScore", method = RequestMethod.GET)
	public String certifyingScoreView() {
		return "audit/certifyingScore";
	}
	
	@RequestMapping(value = "/changePwd", method = RequestMethod.GET)
	public String changePwdView() {
		return "audit/changePwd";
	}
	
	@RequestMapping(value = "/gradingStandard", method = RequestMethod.GET)
	public String gradingStandardView() {
		return "audit/gradingStandard";
	}
	
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String mainView() {
		return "audit/main";
	}
	
	@RequestMapping(value = "/newsAdd", method = RequestMethod.GET)
	public String newsAddView() {
		return "audit/newsAdd";
	}
	
	
	
	@RequestMapping(value = "/scoreReport", method = RequestMethod.GET)
	public String scoreReportView() {
		return "audit/scoreReport";
	}
	
	@RequestMapping(value = "/userInfo", method = RequestMethod.GET)
	public String userInfoView() {
		return "audit/userInfo";
	}
	
	@RequestMapping(value = "/scoreDeclaration", method = RequestMethod.GET)
	public String scoreDeclarationView() {
		return "audit/scoreDeclaration";
	}
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String indexView() {
		return "audit/index";
	}
	
}

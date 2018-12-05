package com.hdc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("")
public class ViewController {


	@RequestMapping(value = "/", method = RequestMethod.GET)
	public void LoginView(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		resp.sendRedirect("/selectLogin");
	}

	@RequestMapping(value = "/loginPage", method = RequestMethod.GET)
	public String loginPageView() {
		return "login";
	}

	@RequestMapping(value = "/selectLogin", method = RequestMethod.GET)
	public String selectLoginView() {
		return "selectLogin";
	}


}

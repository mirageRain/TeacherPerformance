package com.hdc.controller.college;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/college")
public class CollegeView {

    @RequestMapping(value = "/certifiedScore", method = RequestMethod.GET)
    public String certifiedScoreView() {
        return "college/certifiedScore";
    }

    @RequestMapping(value = "/certifyingScore", method = RequestMethod.GET)
    public String certifyingScoreView() {
        return "college/certifyingScore";
    }

    @RequestMapping(value = "/changePwd", method = RequestMethod.GET)
    public String changePwdView() {
        return "college/changePwd";
    }

    @RequestMapping(value = "/gradingStandard", method = RequestMethod.GET)
    public String gradingStandardView() {
        return "college/gradingStandard";
    }

    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String mainView() {
        return "college/main";
    }

    @RequestMapping(value = "/newsAdd", method = RequestMethod.GET)
    public String newsAddView() {
        return "college/newsAdd";
    }


    @RequestMapping(value = "/scoreReport", method = RequestMethod.GET)
    public String scoreReportView() {
        return "college/scoreReport";
    }

    @RequestMapping(value = "/userInfo", method = RequestMethod.GET)
    public String userInfoView() {
        return "college/userInfo";
    }

    @RequestMapping(value = "/scoreDeclaration", method = RequestMethod.GET)
    public String scoreDeclarationView() {
        return "college/scoreDeclaration";
    }

    @RequestMapping(value = "/collegeList", method = RequestMethod.GET)
    public String collegePageView() {
        return "college/collegeList";
    }

    @RequestMapping(value = "/collegeEdit", method = RequestMethod.GET)
    public String collegeEditView() {
        return "college/collegeEdit";
    }

    @RequestMapping(value = "/collegeAdd", method = RequestMethod.GET)
    public String collegeAddView() {
        return "college/collegeAdd";
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String indexView() {
        return "college/index";
    }

    @RequestMapping(value = "/systemConfigPage", method = RequestMethod.GET)
    public String systemConfigPageView() {
        return "college/systemConfigPage";
    }
}

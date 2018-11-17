package com.hdc.controller.college;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/college")
public class CollegeView {


    @RequestMapping(value = "", method = RequestMethod.GET)
    public String indexView() {
        return "college/index";
    }

    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String mainView() {
        return "college/main";
    }

    @RequestMapping(value = "/userInfoPage", method = RequestMethod.GET)
    public String userInfoPageView() {
        return "userInfoPage";
    }

    @RequestMapping(value = "/changePwd", method = RequestMethod.GET)
    public String changePwdView() {
        return "changePwd";
    }

    @RequestMapping(value = "/auditList", method = RequestMethod.GET)
    public String auditListView() {
        return "college/auditList";
    }

    @RequestMapping(value = "/auditAdd", method = RequestMethod.GET)
    public String auditAddView() {
        return "college/auditAdd";
    }

    @RequestMapping(value = "/auditEdit", method = RequestMethod.GET)
    public String auditEditView() {
        return "college/auditEdit";
    }

    @RequestMapping(value = "/evaluationIndexList", method = RequestMethod.GET)
    public String evaluationIndexListView() {
        return "college/evaluationIndexList";
    }

    @RequestMapping(value = "/observationPointList", method = RequestMethod.GET)
    public String observationPointListView() {
        return "college/observationPointList";
    }

    @RequestMapping(value = "/gradingStandardList", method = RequestMethod.GET)
    public String gradingStandardListView() {
        return "college/gradingStandardList";
    }









}

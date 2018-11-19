package com.hdc.controller.college;


import com.google.common.base.CaseFormat;
import com.hdc.dto.GradingStandardDto;
import com.hdc.entity.Page;
import com.hdc.entity.GradingStandard;
import com.hdc.entity.GradingStandardExample;
import com.hdc.entity.SystemConfig;
import com.hdc.security.MyUser;
import com.hdc.service.GradingStandardService;
import com.hdc.service.SystemConfigService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/college/gradingStandard")
public class GradingStandardController {

    @Autowired
    private GradingStandardService gradingStandardService;

    @Autowired
    private SystemConfigService systemConfigService;

    /**
     * 获取取评分标准信息
     *
     * @param page        查询条件
     * @param content 评分标准名称
     * @return 返回的JSON数据
     */
    @GetMapping("")
    public Map<String, Object> selectAll(Page page, String content, Integer evaluationIndexId, Integer observationPointId,Integer auditId) {

        //获取登录的用户ID
        MyUser userDetails = (MyUser) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        Integer collegeId = userDetails.getMyUserId();

        long count = 0;
        Integer defaultSystemConfigId =1;
        List<GradingStandard> list;
        GradingStandardExample example = new GradingStandardExample();
        GradingStandardExample.Criteria criteria = example.createCriteria();
        Map<String, Object> map = new HashMap<>();
        SystemConfig systemConfig;

        //添加查询条件
        if (StringUtils.isNotBlank(content)) {
            criteria.andContentLike("%" + content + "%");
        }
        //添加查询条件
        if (observationPointId!= null &&observationPointId>0) {
            criteria.andObservationPointIdEqualTo(observationPointId);
        }
        //添加查询条件
        if (evaluationIndexId!= null &&evaluationIndexId>0) {
            criteria.andEvaluationIndexIdEqualTo(evaluationIndexId);
        }
        //添加查询条件
        if (auditId!= null &&auditId>0) {
            criteria.andAuditIdEqualTo(auditId);
        }

        try {
            systemConfig = systemConfigService.selectByPrimaryKey(defaultSystemConfigId);
            criteria.andYearEqualTo(systemConfig.getSystemYear());
            criteria.andSemesterEqualTo(systemConfig.getSystemSemester());
            criteria.andCollegeIdEqualTo(collegeId);
        }catch (Exception e) {
            map.put("code", 500);
            map.put("msg", "数据格式错误");
            return map;
        }

        //返回查询条数
        try {
            count = gradingStandardService.countByExample(example);
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", "数据格式错误");
            return map;
        }

        //添加分页和排序条件
        Integer limit = page.getLimit();
        Integer offer = page.getPage();
        String field = page.getField();
        String order = page.getOrder();
        if ((limit != null && limit >= 0) && (offer != null && offer >= 0)) {
            example.setLimit(page.getLimit());
            example.setOffset((page.getPage() - 1) * page.getLimit());
        }
        if (StringUtils.isNotBlank(field) && StringUtils.isNotBlank(order)) {
            field = CaseFormat.UPPER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, page.getField());
            example.setOrderByClause(field + " " + order);
        }


        //查询数据
        try {
            list = gradingStandardService.selectByExample(example);
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", "数据格式错误");
            return map;
        }

        //封装JSON
        map.put("code", 200);
        map.put("msg", "请求成功");
        map.put("count", count);
        map.put("data", list);
        return map;
    }

    /**
     * 检查评分标准名称是否存在
     *
     * @param gradingStandardContent 评分标准内容
     * @param gradingStandardId 如果存在，则在检查的时候排除本身
     * @return code为200时为不存在，其余为存在重复
     */
    @GetMapping("/testGradingStandardContent")
    public Map<String, Object> testGradingStandardName(String gradingStandardContent, Integer gradingStandardId) {

        //获取登录的用户ID
        MyUser userDetails = (MyUser) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        Integer collegeId = userDetails.getMyUserId();

        long count = 0;
        GradingStandardExample example = new GradingStandardExample();
        GradingStandardExample.Criteria criteria = example.createCriteria();
        Map<String, Object> map = new HashMap<>();

        //添加查询条件
        if (StringUtils.isNotBlank(gradingStandardContent)) {
            criteria.andContentEqualTo(gradingStandardContent);
        } else {
            map.put("code", 500);
            map.put("msg", "数据格式错误");
            return map;
        }

        //添加查询条件
        if (collegeId != null && collegeId > 0) {
            criteria.andCollegeIdEqualTo(collegeId);
        } else {
            map.put("code", 500);
            map.put("msg", "数据格式错误");
            return map;
        }

        //更新检查重复时除去数据本身
        if (gradingStandardId != null && gradingStandardId > 0) {
            criteria.andGradingStandardIdNotEqualTo(gradingStandardId);
        }

        //返回查询条数
        try {
            count = gradingStandardService.countByExample(example);
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", "服务器繁忙");
            return map;
        }

        if (count > 0) {
            map.put("code", 300);
            map.put("msg", "评分标准名已经存在，请检查后重试");
            return map;
        }

        //封装JSON
        map.put("code", 200);
        map.put("msg", "请求成功");
        return map;
    }

    /**
     * 插入一个评分标准账号
     *
     * @param gradingStandardDto 评分标准信息
     * @param errors  检查之后返回的错误数据
     * @return code为200时为插入成功，其它情况为插入失败
     */
    @PostMapping("")
    public Map<String, Object> insert(@Valid @RequestBody(required = false) GradingStandardDto gradingStandardDto, BindingResult errors) {

        //获取登录的用户ID
        MyUser userDetails = (MyUser) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        Integer collegeId = userDetails.getMyUserId();

        GradingStandard gradingStandard = new GradingStandard();
        Map<String, Object> map = new HashMap<>();
        Integer defaultSystemConfigId =1;
        String gradingStandardContent;
        SystemConfig systemConfig;
        //检查错误，封装错误信息
        if (errors.getErrorCount() > 0) {
            map.put("code", 500);
            map.put("msg", errors.getAllErrors().get(0).getDefaultMessage());
            return map;
        }

        //赋值
        try {
            systemConfig = systemConfigService.selectByPrimaryKey(defaultSystemConfigId);

            gradingStandard.setContent(gradingStandardDto.getContent());
            gradingStandard.setCollegeId(collegeId);
            gradingStandard.setAuditId(gradingStandardDto.getAuditId());
            gradingStandard.setObservationPointId(gradingStandardDto.getObservationPointId());
            gradingStandard.setNote(gradingStandardDto.getNote());
            gradingStandard.setGradingBasis(gradingStandardDto.getGradingBasis());
            gradingStandard.setEvaluationIndexId(gradingStandardDto.getEvaluationIndexId());
            gradingStandard.setYear(systemConfig.getSystemYear());
            gradingStandard.setSemester(systemConfig.getSystemSemester());

        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", "数据格式错误");
            return map;
        }

        /*//检查用户名和评分标准名称是否被占用
        try {
            Map<String, Object> testGradingStandardNameMap = testGradingStandardName(gradingStandardContent, null);
            if (200 != (Integer) testGradingStandardNameMap.get("code")) {
                return testGradingStandardNameMap;
            }
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", "服务器繁忙");
            return map;
        }*/

        //执行插入操作
        try {
            gradingStandardService.insert(gradingStandard);
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", e.getMessage());
            return map;
        }

        map.put("code", 200);
        map.put("msg", "请求成功");
        return map;
    }

    /**
     * 更新评分标准信息
     *
     * @param gradingStandardDto 评分标准信息
     * @param errors  检查之后返回的错误数据
     * @return code为200时为插入成功，其它情况为插入失败
     */
    @PutMapping("")
    public Map<String, Object> update(@Valid @RequestBody(required = false) GradingStandardDto gradingStandardDto, BindingResult errors) {

        //获取登录的用户ID
        MyUser userDetails = (MyUser) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        Integer collegeId = userDetails.getMyUserId();
        Integer defaultSystemConfigId =1;
        SystemConfig systemConfig;

        GradingStandard gradingStandard = new GradingStandard();
        Map<String, Object> map = new HashMap<>();

        //检查错误，封装错误信息
        if (errors.getErrorCount() > 0) {
            map.put("code", 500);
            map.put("msg", errors.getAllErrors().get(0).getDefaultMessage());
            return map;
        }

        //赋值
        try {
            systemConfig = systemConfigService.selectByPrimaryKey(defaultSystemConfigId);

            gradingStandard.setGradingStandardId(gradingStandardDto.getGradingStandardId());
            gradingStandard.setContent(gradingStandardDto.getContent());
            gradingStandard.setCollegeId(collegeId);
            gradingStandard.setAuditId(gradingStandardDto.getAuditId());
            gradingStandard.setObservationPointId(gradingStandardDto.getObservationPointId());
            gradingStandard.setNote(gradingStandardDto.getNote());
            gradingStandard.setGradingBasis(gradingStandardDto.getGradingBasis());
            gradingStandard.setEvaluationIndexId(gradingStandardDto.getEvaluationIndexId());
            gradingStandard.setYear(systemConfig.getSystemYear());
            gradingStandard.setSemester(systemConfig.getSystemSemester());

        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", "数据格式错误");
            return map;
        }

       /* //检查评分标准名称是否被占用
        try {
            Map<String, Object> testGradingStandardNameMap = testGradingStandardName(gradingStandardName, gradingStandardId);
            if (200 != (Integer) testGradingStandardNameMap.get("code")) {
                return testGradingStandardNameMap;
            }
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", "服务器繁忙");
            return map;
        }*/

        //执行更新操作
        try {
            gradingStandardService.updateByPrimaryKeySelective(gradingStandard);
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", e.getMessage());
            return map;
        }

        map.put("code", 200);
        map.put("msg", "请求成功");
        return map;
    }

    /**
     * 删除评分标准
     *
     * @param gradingStandardIdList 要删除的评分标准ID列表
     * @return code为200时为删除成功，其它情况为插入失败
     */
    @DeleteMapping("")
    public Map<String, Object> delete(@RequestBody(required = false) List<Integer> gradingStandardIdList) {

        Map<String, Object> map = new HashMap<>();
        GradingStandardExample example = new GradingStandardExample();
        example.createCriteria().andGradingStandardIdIn(gradingStandardIdList);
        //检查传入信息
        if (gradingStandardIdList == null || gradingStandardIdList.size() <= 0) {
            map.put("code", 500);
            map.put("msg", "信息不能为空");
            return map;
        }

        //执行删除操作
        try {

            gradingStandardService.deleteByExample(example);
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", e.getMessage());
            return map;
        }

        map.put("code", 200);
        map.put("msg", "请求成功");
        return map;
    }
}

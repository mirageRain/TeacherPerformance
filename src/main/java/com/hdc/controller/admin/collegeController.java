package com.hdc.controller.admin;


import com.hdc.dto.CollegeDto;
import com.hdc.entity.College;
import com.hdc.entity.UserInfo;
import com.hdc.entity.Users;
import com.hdc.service.AuthoritiesService;
import com.hdc.service.CollegeService;
import com.hdc.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.awt.print.Pageable;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin/college")
public class collegeController {
	
	@Autowired
	private CollegeService collegeService;

	@Autowired
	private UsersService usersService;
	
	@GetMapping("")
	public Map<String, Object> selectAll() {


		Map<String, Object> map = new HashMap<>();
		map.put("code", 200);
		map.put("msg", "请求成功");
		map.put("data", collegeService.selectAll());
		return map;
	}

	@PostMapping("")
	public Map<String, Object> insert(@Valid @RequestBody CollegeDto college, BindingResult errors) {
		Map<String, Object> map = new HashMap<>();
		if (errors.getErrorCount() > 0) {
			map.put("code", 500);
			map.put("msg", errors.getAllErrors().get(0).getDefaultMessage());
			return map;
		}

		Users user = new Users();
		UserInfo userInfo = new UserInfo();

		try {
		user.setUsername(college.getUsername());
		user.setPassword(college.getPassword());
		userInfo.setDisplayName(college.getCollegeName());
		} catch (Exception e) {
			map.put("code", 500);
			map.put("msg", "数据格式错误");
			return map;
		}

		try {
			usersService.insertCollege(user, userInfo);
			map.put("code", 200);
			map.put("msg", "请求成功");
		}catch (Exception e){
			map.put("code", 500);
			map.put("msg", e.getMessage());
			return map;
		}


		return map;
	}
}

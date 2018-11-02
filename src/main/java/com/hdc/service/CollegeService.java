package com.hdc.service;


import com.hdc.entity.College;
import com.hdc.entity.CollegeExample;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CollegeService {

	long countByExample(CollegeExample example);

	int deleteByExample(CollegeExample example);

	int deleteByPrimaryKey(Integer collegeId);

	int insert(College record);

	int insertSelective(College record);

	List<College> selectByExample(CollegeExample example);

	List<College> selectAll();

	College selectByPrimaryKey(Integer collegeId);

	int updateByExampleSelective(@Param("record") College record, @Param("example") CollegeExample example);

	int updateByExample(@Param("record") College record, @Param("example") CollegeExample example);

	int updateByPrimaryKeySelective(College record);

	int updateByPrimaryKey(College record);
}

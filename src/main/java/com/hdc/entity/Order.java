package com.hdc.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * @author 
 */
public class Order implements Serializable {
    /**
     * 新业绩申报单ID
     */
    private Long orderId;

    /**
     * 申请人用户ID
     */
    private Integer userId;

    /**
     * 观测点的评分标准ID
     */
    private Integer gradingStandardId;

    /**
     * 认证机构ID
     */
    private Integer auditId;

    /**
     * 申报备注
     */
    private String note;

    /**
     * 自评得分
     */
    private Float selfReportScore;

    /**
     * 被认证得分
     */
    private Float certifiedScore;

    /**
     * 认证备注
     */
    private String certifiedNote;

    /**
     * 申报单状态：0异常，1新申报待认证，2以认证，3评分周期结束
     */
    private Byte state;

    /**
     * 申报时间
     */
    private Date addTime;

    /**
     * 被认证时间
     */
    private Date certifiedTime;

    /**
     * 所属年份
     */
    private Integer year;

    /**
     * 所属学期
     */
    private Integer semester;

    private static final long serialVersionUID = 1L;

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getGradingStandardId() {
        return gradingStandardId;
    }

    public void setGradingStandardId(Integer gradingStandardId) {
        this.gradingStandardId = gradingStandardId;
    }

    public Integer getAuditId() {
        return auditId;
    }

    public void setAuditId(Integer auditId) {
        this.auditId = auditId;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Float getSelfReportScore() {
        return selfReportScore;
    }

    public void setSelfReportScore(Float selfReportScore) {
        this.selfReportScore = selfReportScore;
    }

    public Float getCertifiedScore() {
        return certifiedScore;
    }

    public void setCertifiedScore(Float certifiedScore) {
        this.certifiedScore = certifiedScore;
    }

    public String getCertifiedNote() {
        return certifiedNote;
    }

    public void setCertifiedNote(String certifiedNote) {
        this.certifiedNote = certifiedNote;
    }

    public Byte getState() {
        return state;
    }

    public void setState(Byte state) {
        this.state = state;
    }

    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }

    public Date getCertifiedTime() {
        return certifiedTime;
    }

    public void setCertifiedTime(Date certifiedTime) {
        this.certifiedTime = certifiedTime;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        Order other = (Order) that;
        return (this.getOrderId() == null ? other.getOrderId() == null : this.getOrderId().equals(other.getOrderId()))
            && (this.getUserId() == null ? other.getUserId() == null : this.getUserId().equals(other.getUserId()))
            && (this.getGradingStandardId() == null ? other.getGradingStandardId() == null : this.getGradingStandardId().equals(other.getGradingStandardId()))
            && (this.getAuditId() == null ? other.getAuditId() == null : this.getAuditId().equals(other.getAuditId()))
            && (this.getNote() == null ? other.getNote() == null : this.getNote().equals(other.getNote()))
            && (this.getSelfReportScore() == null ? other.getSelfReportScore() == null : this.getSelfReportScore().equals(other.getSelfReportScore()))
            && (this.getCertifiedScore() == null ? other.getCertifiedScore() == null : this.getCertifiedScore().equals(other.getCertifiedScore()))
            && (this.getCertifiedNote() == null ? other.getCertifiedNote() == null : this.getCertifiedNote().equals(other.getCertifiedNote()))
            && (this.getState() == null ? other.getState() == null : this.getState().equals(other.getState()))
            && (this.getAddTime() == null ? other.getAddTime() == null : this.getAddTime().equals(other.getAddTime()))
            && (this.getCertifiedTime() == null ? other.getCertifiedTime() == null : this.getCertifiedTime().equals(other.getCertifiedTime()))
            && (this.getYear() == null ? other.getYear() == null : this.getYear().equals(other.getYear()))
            && (this.getSemester() == null ? other.getSemester() == null : this.getSemester().equals(other.getSemester()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getOrderId() == null) ? 0 : getOrderId().hashCode());
        result = prime * result + ((getUserId() == null) ? 0 : getUserId().hashCode());
        result = prime * result + ((getGradingStandardId() == null) ? 0 : getGradingStandardId().hashCode());
        result = prime * result + ((getAuditId() == null) ? 0 : getAuditId().hashCode());
        result = prime * result + ((getNote() == null) ? 0 : getNote().hashCode());
        result = prime * result + ((getSelfReportScore() == null) ? 0 : getSelfReportScore().hashCode());
        result = prime * result + ((getCertifiedScore() == null) ? 0 : getCertifiedScore().hashCode());
        result = prime * result + ((getCertifiedNote() == null) ? 0 : getCertifiedNote().hashCode());
        result = prime * result + ((getState() == null) ? 0 : getState().hashCode());
        result = prime * result + ((getAddTime() == null) ? 0 : getAddTime().hashCode());
        result = prime * result + ((getCertifiedTime() == null) ? 0 : getCertifiedTime().hashCode());
        result = prime * result + ((getYear() == null) ? 0 : getYear().hashCode());
        result = prime * result + ((getSemester() == null) ? 0 : getSemester().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", orderId=").append(orderId);
        sb.append(", userId=").append(userId);
        sb.append(", gradingStandardId=").append(gradingStandardId);
        sb.append(", auditId=").append(auditId);
        sb.append(", note=").append(note);
        sb.append(", selfReportScore=").append(selfReportScore);
        sb.append(", certifiedScore=").append(certifiedScore);
        sb.append(", certifiedNote=").append(certifiedNote);
        sb.append(", state=").append(state);
        sb.append(", addTime=").append(addTime);
        sb.append(", certifiedTime=").append(certifiedTime);
        sb.append(", year=").append(year);
        sb.append(", semester=").append(semester);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}
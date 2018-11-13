package com.hdc.entity;

import java.io.Serializable;

/**
 * @author 
 */
public class SystemConfig implements Serializable {
    /**
     * 系统配置ID
     */
    private Integer systemConfigId;

    /**
     * 系统是否开启：0关闭，1开启
     */
    private Byte systemOpen;

    /**
     * 系统当前年份
     */
    private Integer systemYear;

    /**
     * 系统当前学期
     */
    private Integer systemSemester;

    private static final long serialVersionUID = 1L;

    public Integer getSystemConfigId() {
        return systemConfigId;
    }

    public void setSystemConfigId(Integer systemConfigId) {
        this.systemConfigId = systemConfigId;
    }

    public Byte getSystemOpen() {
        return systemOpen;
    }

    public void setSystemOpen(Byte systemOpen) {
        this.systemOpen = systemOpen;
    }

    public Integer getSystemYear() {
        return systemYear;
    }

    public void setSystemYear(Integer systemYear) {
        this.systemYear = systemYear;
    }

    public Integer getSystemSemester() {
        return systemSemester;
    }

    public void setSystemSemester(Integer systemSemester) {
        this.systemSemester = systemSemester;
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
        SystemConfig other = (SystemConfig) that;
        return (this.getSystemConfigId() == null ? other.getSystemConfigId() == null : this.getSystemConfigId().equals(other.getSystemConfigId()))
            && (this.getSystemOpen() == null ? other.getSystemOpen() == null : this.getSystemOpen().equals(other.getSystemOpen()))
            && (this.getSystemYear() == null ? other.getSystemYear() == null : this.getSystemYear().equals(other.getSystemYear()))
            && (this.getSystemSemester() == null ? other.getSystemSemester() == null : this.getSystemSemester().equals(other.getSystemSemester()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getSystemConfigId() == null) ? 0 : getSystemConfigId().hashCode());
        result = prime * result + ((getSystemOpen() == null) ? 0 : getSystemOpen().hashCode());
        result = prime * result + ((getSystemYear() == null) ? 0 : getSystemYear().hashCode());
        result = prime * result + ((getSystemSemester() == null) ? 0 : getSystemSemester().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", systemConfigId=").append(systemConfigId);
        sb.append(", systemOpen=").append(systemOpen);
        sb.append(", systemYear=").append(systemYear);
        sb.append(", systemSemester=").append(systemSemester);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}
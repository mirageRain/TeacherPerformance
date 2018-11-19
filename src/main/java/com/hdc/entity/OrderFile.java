package com.hdc.entity;

import java.io.Serializable;

/**
 * @author 
 */
public class OrderFile implements Serializable {
    /**
     * 申请单文件ID
     */
    private Integer orderFileId;

    /**
     * 申请单ID
     */
    private Long orderId;

    /**
     * 服务器保存的文件名称
     */
    private String saveFileName;

    /**
     * 上次时原始的文件名称
     */
    private String uploadFileName;

    /**
     * 服务器中文件的URl
     */
    private String fileUrl;

    private static final long serialVersionUID = 1L;

    public Integer getOrderFileId() {
        return orderFileId;
    }

    public void setOrderFileId(Integer orderFileId) {
        this.orderFileId = orderFileId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getSaveFileName() {
        return saveFileName;
    }

    public void setSaveFileName(String saveFileName) {
        this.saveFileName = saveFileName;
    }

    public String getUploadFileName() {
        return uploadFileName;
    }

    public void setUploadFileName(String uploadFileName) {
        this.uploadFileName = uploadFileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
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
        OrderFile other = (OrderFile) that;
        return (this.getOrderFileId() == null ? other.getOrderFileId() == null : this.getOrderFileId().equals(other.getOrderFileId()))
            && (this.getOrderId() == null ? other.getOrderId() == null : this.getOrderId().equals(other.getOrderId()))
            && (this.getSaveFileName() == null ? other.getSaveFileName() == null : this.getSaveFileName().equals(other.getSaveFileName()))
            && (this.getUploadFileName() == null ? other.getUploadFileName() == null : this.getUploadFileName().equals(other.getUploadFileName()))
            && (this.getFileUrl() == null ? other.getFileUrl() == null : this.getFileUrl().equals(other.getFileUrl()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getOrderFileId() == null) ? 0 : getOrderFileId().hashCode());
        result = prime * result + ((getOrderId() == null) ? 0 : getOrderId().hashCode());
        result = prime * result + ((getSaveFileName() == null) ? 0 : getSaveFileName().hashCode());
        result = prime * result + ((getUploadFileName() == null) ? 0 : getUploadFileName().hashCode());
        result = prime * result + ((getFileUrl() == null) ? 0 : getFileUrl().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", orderFileId=").append(orderFileId);
        sb.append(", orderId=").append(orderId);
        sb.append(", saveFileName=").append(saveFileName);
        sb.append(", uploadFileName=").append(uploadFileName);
        sb.append(", fileUrl=").append(fileUrl);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}
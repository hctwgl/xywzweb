package com.xywztech.bcrm.sales.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The persistent class for the OCRM_F_MM_OPPOR_STAGE database table. 
 * 商机阶段表
 */
@Entity
@Table(name = "OCRM_F_MM_OPPOR_STAGE")
public class OpportunityStage implements Serializable {

	private static final long serialVersionUID = 7554138935518906690L;

	/** ID */
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "ID")
	private Long id;
	
	/** 商机阶段 */
	@Column(name = "OPPOR_STAGE",length=200)
	private String opportunityStage;

	/** 阶段完成时间 */
	@Temporal(TemporalType.DATE)
	@Column(name = "STAGE_COM_DATE")
	private Date stageCompleteDate;
	
	/** 阶段工作描述 */
    @Column(name="STAGE_DESC",length=1000)
    private String stageDesc;
	
	/**更新日期*/
    @Temporal( TemporalType.DATE)
    @Column(name="UPDATE_DATE")
    private Date updateDate;

    /**创建人*/
    @Column(name="UPDATE_USER",length=100)
    private String updateUser;

	/** 商机ID */
	@Column(name = "MKT_OPPOR_ID")
	private Long marketOpporId;
	
	public String getOpportunityStage() {
		return opportunityStage;
	}

	public void setOpportunityStage(String opportunityStage) {
		this.opportunityStage = opportunityStage;
	}

	public Date getStageCompleteDate() {
		return stageCompleteDate;
	}

	public void setStageCompleteDate(Date stageCompleteDate) {
		this.stageCompleteDate = stageCompleteDate;
	}

    public Long getMarketOpporId() {
        return marketOpporId;
    }

    public void setMarketOpporId(Long marketOpporId) {
        this.marketOpporId = marketOpporId;
    }

	public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

	public void setStageDesc(String stageDesc) {
		this.stageDesc = stageDesc;
	}

	public String getStageDesc() {
		return stageDesc;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

}
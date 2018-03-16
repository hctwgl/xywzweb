package com.xywztech.bob.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_MM_ACTI_ACHIEVEMENT database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MM_ACTI_ACHIEVEMENT")
public class OcrmFMmActiAchievement implements Serializable {
	private static final long serialVersionUID = -1717384984944942919L;

	/** ID */
	@Id
	@Column(name = "ACHIEVE_ID")
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	private Long achieveId;
	
	/**�����*/
	@Column(name="INCREASE_SCALE")
	private BigDecimal increaseScale;

	/**����Ŀ���Ʒҵ��*/
	@Column(name="LAST_MON_TAR_PRO_NUM")
	private Integer lastMonTarProNum;

	/**����Ŀ���Ʒҵ��*/
	@Column(name="LOCAL_MON_TAR_PRO_NUM")
	private Integer localMonTarProNum;

	/**Ӫ��ID*/
	@Column(name="MKT_ACTI_ID")
	private Long mktActiId;

	/**Ӫ�����*/
	@Column(name="MKT_ACTI_NAME")
	private String mktActiName;

	/**Ŀ���Ʒ*/
	@Column(name="TARGET_PRODUCT")
	private String targetProduct;

    public OcrmFMmActiAchievement() {
    }

	public Long getAchieveId() {
		return this.achieveId;
	}

	public void setAchieveId(Long achieveId) {
		this.achieveId = achieveId;
	}

	public BigDecimal getIncreaseScale() {
		return this.increaseScale;
	}

	public void setIncreaseScale(BigDecimal increaseScale) {
		this.increaseScale = increaseScale;
	}

	public Integer getLastMonTarProNum() {
		return this.lastMonTarProNum;
	}

	public void setLastMonTarProNum(Integer lastMonTarProNum) {
		this.lastMonTarProNum = lastMonTarProNum;
	}

	public Integer getLocalMonTarProNum() {
		return this.localMonTarProNum;
	}

	public void setLocalMonTarProNum(Integer localMonTarProNum) {
		this.localMonTarProNum = localMonTarProNum;
	}

	public Long getMktActiId() {
		return this.mktActiId;
	}

	public void setMktActiId(Long mktActiId) {
		this.mktActiId = mktActiId;
	}

	public String getMktActiName() {
		return this.mktActiName;
	}

	public void setMktActiName(String mktActiName) {
		this.mktActiName = mktActiName;
	}

	public String getTargetProduct() {
		return this.targetProduct;
	}

	public void setTargetProduct(String targetProduct) {
		this.targetProduct = targetProduct;
	}

}
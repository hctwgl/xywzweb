package com.xywztech.bcrm.product.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The persistent class for the OCRM_F_PD_FEAT_VAL database table.
 * 
 */
@Entity
@Table(name = "OCRM_F_PD_FEAT_VAL")
public class ProductFeatureValue implements Serializable {

	/**
	 * FDM层(基础数据层)，归属于产品管理的第二主题，数据为产品特征值信息
	 */
	private static final long serialVersionUID = 2924689953158783595L;

	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	/**特征值id*/
	@Column(name = "FEAT_VAL_ID", nullable = false)
	private Long featureValueId;

	/** 特征值 */
	@Column(name = "FEAT_VAL", length = 100)
	private String featureValue;

	/** 特征值名称 */
	@Column(name = "FEAT_VAL_NAME", length = 100)
	private String featureValueName;
	/** 产品ID*/
	@Column(name = "PRODUCT_ID")
	private Long productId;
	/**特征项ID*/
	@Column(name = "FEATURE_ID")
	private Long featureId;
	// bi-directional many-to-one association to Product
//	@ManyToOne
//	@JoinColumn(name = "PRODUCT_ID")
//	private Product ocrmFPdProduct;
//
//	// bi-directional many-to-one association to ProductFeature
//	@ManyToOne
//	@JoinColumn(name = "FEATRUE_ID")
//	private ProductFeature ocrmFPdProdFeature;
	
	
	public void setFeatureValueId(Long featureValueId) {
		this.featureValueId = featureValueId;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Long getFeatureId() {
		return featureId;
	}

	public void setFeatureId(Long featureId) {
		this.featureId = featureId;
	}

	public Long getFeatureValueId() {
		return featureValueId;
	}

	public void setFeatureValue(String featureValue) {
		this.featureValue = featureValue;
	}

	public String getFeatureValue() {
		return featureValue;
	}

	public void setFeatureValueName(String featureValueName) {
		this.featureValueName = featureValueName;
	}

	public String getFeatureValueName() {
		return featureValueName;
	}

}
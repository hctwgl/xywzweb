package com.xywz.sysm.model;


import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the xywz_sysm_product_detail database table.
 * 
 */
@Entity
@Table(name="xywz_sysm_product_detail")
public class XywzSysmProductDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="PROD_ID")
	private Long prodId;

	@Column(name="HS_CODE")
	private String hsCode;
	
	@Column(name="MATERIALS")
	private String materials;

	@Column(name="PRICE")
	private BigDecimal price;

	@Column(name="SIZE")
	private String size;

	@Column(name="WAIST_DEPTH")
	private String waistDepth;

	@Column(name="WEIGHT")
	private BigDecimal weight;

    public XywzSysmProductDetail() {
    }

	public Long getProdId() {
		return this.prodId;
	}

	public void setProdId(Long prodId) {
		this.prodId = prodId;
	}

	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}

	public BigDecimal getPrice() {
		return this.price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getMaterials() {
		return this.materials;
	}

	public void setMaterials(String materials) {
		this.materials = materials;
	}
	
	public String getSize() {
		return this.size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getWaistDepth() {
		return this.waistDepth;
	}

	public void setWaistDepth(String waistDepth) {
		this.waistDepth = waistDepth;
	}

	public BigDecimal getWeight() {
		return this.weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

}
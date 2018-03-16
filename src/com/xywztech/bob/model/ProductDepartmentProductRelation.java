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
 * The persistent class for the OCRM_F_PD_DEP_PROD_REL database table.
 * 
 */
@Entity
@Table(name="OCRM_F_PD_DEP_PROD_REL")
public class ProductDepartmentProductRelation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="BELONG_DEPT", unique=true, nullable=false, length=30)
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	private String belongDept;

	@Column(name="BELONG_LINE", length=20)
	private String belongLine;

	@Column(name="CUT_PROFILE_RATE", precision=9, scale=4)
	private BigDecimal cutProfileRate;

	@Column(name="PRODUCT_ID", length=30)
	private String productId;

	@Column(length=1)
	private String tjkj;

    public ProductDepartmentProductRelation() {
    }

	public String getBelongDept() {
		return this.belongDept;
	}

	public void setBelongDept(String belongDept) {
		this.belongDept = belongDept;
	}

	public String getBelongLine() {
		return this.belongLine;
	}

	public void setBelongLine(String belongLine) {
		this.belongLine = belongLine;
	}

	public BigDecimal getCutProfileRate() {
		return this.cutProfileRate;
	}

	public void setCutProfileRate(BigDecimal cutProfileRate) {
		this.cutProfileRate = cutProfileRate;
	}

	public String getProductId() {
		return this.productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getTjkj() {
		return this.tjkj;
	}

	public void setTjkj(String tjkj) {
		this.tjkj = tjkj;
	}

}
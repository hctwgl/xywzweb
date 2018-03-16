package com.xywz.sale.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the xywz_sale_cstm_decl_packlist database table.
 * 
 */
@Entity
@Table(name="xywz_sale_cstm_decl_packlist")
public class XywzSaleCstmDeclPacklist implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="CSTM_PACKLIST_ID")
	private Long cstmPacklistId;

	@Column(name="BUNDLES")
	private BigDecimal bundles;

	@Column(name="INV_NUM")
	private String invNum;

	@Column(name="PCS")
	private BigDecimal pcs;

	@Column(name="PCS_BUNDLE")
	private BigDecimal pcsBundle;

	@Column(name="SIZE")
	private String size;

	@Column(name="SUTTLE_GROSS_WEIGHT")
	private String suttleGrossWeight;
	
	@Column(name="HS_CODE")
	private String hsCode;

    public XywzSaleCstmDeclPacklist() {
    }

	public Long getCstmPacklistId() {
		return this.cstmPacklistId;
	}

	public void setCstmPacklistId(Long cstmPacklistId) {
		this.cstmPacklistId = cstmPacklistId;
	}

	public BigDecimal getBundles() {
		return this.bundles;
	}

	public void setBundles(BigDecimal bundles) {
		this.bundles = bundles;
	}

	public String getInvNum() {
		return this.invNum;
	}

	public void setInvNum(String invNum) {
		this.invNum = invNum;
	}

	public BigDecimal getPcs() {
		return this.pcs;
	}

	public void setPcs(BigDecimal pcs) {
		this.pcs = pcs;
	}

	public BigDecimal getPcsBundle() {
		return this.pcsBundle;
	}

	public void setPcsBundle(BigDecimal pcsBundle) {
		this.pcsBundle = pcsBundle;
	}

	public String getSize() {
		return this.size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getSuttleGrossWeight() {
		return this.suttleGrossWeight;
	}

	public void setSuttleGrossWeight(String suttleGrossWeight) {
		this.suttleGrossWeight = suttleGrossWeight;
	}
	
	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}

}
package com.xywz.logi.model;
import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the xywz_logi_port_info_mgmt database table.
 * 
 */
@Entity
@Table(name="xywz_logi_port_info_mgmt")
public class XywzLogiPortInfoMgmt implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="PORT_ID")
	private Long portId;

	@Column(name="BELONG_COUNTRY")
	private String belongCountry;

	@Column(name="DETAIL_DESC")
	private String detailDesc;

	@Column(name="PORT_NAME_CN")
	private String portNameCn;

	@Column(name="PORT_NAME_EN")
	private String portNameEn;

    public XywzLogiPortInfoMgmt() {
    }

	public Long getPortId() {
		return this.portId;
	}

	public void setPortId(Long portId) {
		this.portId = portId;
	}

	public String getBelongCountry() {
		return this.belongCountry;
	}

	public void setBelongCountry(String belongCountry) {
		this.belongCountry = belongCountry;
	}

	public String getDetailDesc() {
		return this.detailDesc;
	}

	public void setDetailDesc(String detailDesc) {
		this.detailDesc = detailDesc;
	}

	public String getPortNameCn() {
		return this.portNameCn;
	}

	public void setPortNameCn(String portNameCn) {
		this.portNameCn = portNameCn;
	}

	public String getPortNameEn() {
		return this.portNameEn;
	}

	public void setPortNameEn(String portNameEn) {
		this.portNameEn = portNameEn;
	}

}
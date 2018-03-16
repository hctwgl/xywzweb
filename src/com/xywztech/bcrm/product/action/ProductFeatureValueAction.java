/**
 * 
 */
package com.xywztech.bcrm.product.action;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Validateable;
import com.opensymphony.xwork2.ValidationAwareSupport;
import com.xywztech.bcrm.product.model.ProductFeatureValue;
import com.xywztech.bcrm.product.service.ProductFeatureValueService;

/**
 * @author yaoliang
 *2011-08-30
 */
@Results({
	@Result(name = "success", type = "redirectAction" , params={
			"actionName","product-feature-value"
	})	
})
public class ProductFeatureValueAction extends ValidationAwareSupport implements
	ModelDriven<Object>,Validateable
{
	private ProductFeatureValue productFeatureValue = new ProductFeatureValue();	
	@Autowired
	private ProductFeatureValueService productFeatureValueService;
	private Long id;
	public void validate() {
		// TODO Auto-generated method stub
		
	}

	private HttpHeaders index(){
		
		
		return new DefaultHttpHeaders("index").disableCaching();
	}
	
	public String edit() {
		return "edit";
	}

	// 新增前,先创建一个产品特征项对象
	public String editNew() {
		productFeatureValue = new ProductFeatureValue();
		return "editNew";
	}

	// 删除一个产品特征项对象
	public String destroy() {

		try {
			productFeatureValueService.deleteFeatureValue(id);
			addActionMessage("remove productInfo successful");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return "success";
	}

	// 新增产品特征信息
	public HttpHeaders create() {
		try {
			productFeatureValueService.saveFeatureValue(productFeatureValue);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return new DefaultHttpHeaders("success").setLocationId(productFeatureValue
				.getFeatureValueId());
	}

	// 修改一条产品特征项信息
	public String update() {
		productFeatureValueService.saveFeatureValue(productFeatureValue);
		addActionMessage("productFeatureValue update successful");
		return "success";
	}

	public void setId(Long id) {
		if (id != null) {
			productFeatureValue = productFeatureValueService.getProductFeatureValue(id);
		}
		this.id = id;
	}
	
	public Object getModel() {

		return productFeatureValue;
		//return (productMap != null ? productMap : productFeatureValue);
	}
	
}

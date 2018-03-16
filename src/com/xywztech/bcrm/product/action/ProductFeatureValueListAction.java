/**
 * 
 */
package com.xywztech.bcrm.product.action;

import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bob.action.BaseAction;
import com.xywztech.bob.service.CommonQueryService;

/**
 * @author yaoliang
 *
 */
@ParentPackage("json-default")

@Action(value="/product-feature-value-list", results={
    @Result(name="success", type="json")
})
public class ProductFeatureValueListAction  extends BaseAction{

	private Map featureValueMap;
	
	@Autowired
	private CommonQueryService commonQueryService = new CommonQueryService();
	
	public String index(){
		
		StringBuffer sb = new StringBuffer("select ocrm_f_pd_prod_feature.feature_name,ocrm_f_pd_prod_feature.feature_catl_id,ocrm_f_pd_feat_val.*" +

				" from ocrm_f_pd_prod_feature,ocrm_f_pd_feat_val where ocrm_f_pd_prod_feature.feature_id = ocrm_f_pd_feat_val.feature_id  " );
		
		java.util.Iterator<String> iterator = this.getJson().keySet().iterator();
		
		while(iterator.hasNext()){
			
			String key = iterator.next();
			
			String productId = (String)this.getJson().get(key);
			
			if(productId != null && !productId.equals(""))
			{
				if(key.equals("PRODUCT_ID")){
					
					sb.append("  and  ocrm_f_pd_feat_val. " + key +" = "+ productId);
				}
			}
		}		
		commonQueryService.setPrimaryKey("feat_val_id");
		commonQueryService.addOracleLookup("FEATURE_CATL_ID", "FEATURE_CATL_ID");
		featureValueMap = commonQueryService.excuteQuery(sb.toString(), getStart(), getLimit());
		
		return "success";
	}

	public Map getFeatureValueMap() {
		return featureValueMap;
	}
	
	public void setFeatureValueMap(Map featureValueMap) {
		this.featureValueMap = featureValueMap;
	}
}

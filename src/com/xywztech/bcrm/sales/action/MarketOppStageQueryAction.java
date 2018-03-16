package com.xywztech.bcrm.sales.action;

import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.xywztech.bob.action.BaseAction;
import com.xywztech.bob.service.CommonQueryService;

@ParentPackage("json-default")
@Action(value="/marketOppStageQuery", results={
    @Result(name="success", type="json"),
})
public class MarketOppStageQueryAction extends BaseAction{
	
    @Autowired
    private CommonQueryService cqs;
    
    private String marketOpporId;
    
    public String index() {
        StringBuilder sb = new StringBuilder("select os.*,u.username from OCRM_F_MM_OPPOR_STAGE os " +
        		"left join sys_users u on os.UPDATE_USER = u.userid where os.mkt_oppor_id = " + marketOpporId +"");
        cqs.setPrimaryKey("os.id");
        this.setJson(cqs.excuteQuery(sb.toString(),this.getStart(),this.getLimit()));       
        return "success";
    }

	public void setMarketOpporId(String marketOpporId) {
		this.marketOpporId = marketOpporId;
	}
    
}

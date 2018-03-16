package com.xywz.logi.action;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.logi.model.XywzLogiSendNoticeHis;
import com.xywz.logi.service.XywzLogiSendNoticeHisService;
import com.xywztech.bob.common.CommonAction;



/*
 * 银行管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzLogiSendNoticeHisAction")
public class XywzLogiSendNoticeHisAction extends CommonAction {
	
	@Autowired
	private XywzLogiSendNoticeHisService service;//定义XywzParaBank属性

	
	@Autowired
	public void init() {
		model = new XywzLogiSendNoticeHis();
		setCommonService(service);
	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzLogiSendNoticeHis C WHERE C.sendSheetAdvsId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");		
        return "success";
    }
}




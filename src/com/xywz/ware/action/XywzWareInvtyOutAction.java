package com.xywz.ware.action;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import com.opensymphony.xwork2.ActionContext;
import com.xywz.ware.model.XywzWareInvtyOut;
import com.xywz.ware.service.XywzWareInvtyOutService;
import com.xywztech.bob.common.CommonAction;



/*
 * 仓库出货信息表Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzWareInvtyOutAction")
public class XywzWareInvtyOutAction extends CommonAction {
	
	@Autowired
	private XywzWareInvtyOutService service;
	

	
	@Autowired
	public void init() {
		model = new XywzWareInvtyOut();
		setCommonService(service);

	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jql="DELETE FROM XywzWareInvtyOut C WHERE C.outId IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");
		
        return "success";
    }
    //库存分配
    public String distriWare(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String jianCntStr = request.getParameter("jianCntStr");
		String remZhiCntStr = request.getParameter("remZhiCntStr");
		String chdId = request.getParameter("chdId");
		String contrNum = request.getParameter("contrNum");
		String[] ids =idStr.split(",");
		String[] jianCnts = jianCntStr.split(",");
		String[] remZhiCnts = remZhiCntStr.split(",");
		for(int i=0;i<ids.length;i++){
			service.distriWare(ids[i],jianCnts[i],remZhiCnts[i],chdId,contrNum);
		}   	
        return "success";
    }
    //库存再分配
    public String againDistriWare(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String outId = request.getParameter("outId");
		String jianCnt = request.getParameter("jianCnt");
		String remZhiCnt = request.getParameter("remZhiCnt");
		String chdId = request.getParameter("chdId");
		String contrNum = request.getParameter("contrNum");
		service.againDistriWare(outId,jianCnt,remZhiCnt,chdId,contrNum);  	
        return "success";
    }
}




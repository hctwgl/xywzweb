package com.xywztech.bcrm.action;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.model.OcrmFMmMktMaterialIoDesc;
import com.xywztech.bcrm.service.MktMaterialIoManageService;
import com.xywztech.bob.common.CommonAction;


@SuppressWarnings("serial")
@Action("mktMaterialIoManage-info")
public class MktMaterialIoManageAction  extends CommonAction{
    @Autowired
    private MktMaterialIoManageService mktMaterialIoManageService ;
	private String id;
	private int leavingNum;
	private int articleNum;
	private String outinWay;
	private String remarkIo;

    @Autowired
	public void init(){
	  	model = new OcrmFMmMktMaterialIoDesc(); 
		setCommonService(mktMaterialIoManageService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		needLog=true;
	}
    
    public void batchUpdate(){
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	id=request.getParameter("id");
    	leavingNum=Integer.parseInt(request.getParameter("leavingNum"));
    	articleNum=Integer.parseInt(request.getParameter("articleNum"));
    	outinWay=request.getParameter("outinWay");
    	remarkIo=request.getParameter("remarkIo");
		mktMaterialIoManageService.batchUpdate(id, leavingNum, articleNum, outinWay, remarkIo);
    }
 
}
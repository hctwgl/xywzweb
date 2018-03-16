package com.xywz.asst.service;


import java.util.Date;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.xywz.asst.model.XywzAsstMachgCorpMgmt;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;


/**
 * 外协加工工厂信息管理Service
 * @author 
 * @since  
 */
@Service
public class XywzAsstMachgCorpMgmtService extends CommonService {
   
	public XywzAsstMachgCorpMgmtService(){
		JPABaseDAO<XywzAsstMachgCorpMgmt, Long>  baseDAO = new JPABaseDAO<XywzAsstMachgCorpMgmt, Long>(XywzAsstMachgCorpMgmt.class);  
		super.setBaseDAO(baseDAO);
	}


	
	/*得到当前的登录用户 ,和系统的登录时间**/
	@Override
	public Object save(Object model){
		XywzAsstMachgCorpMgmt xywzAsstMachgCorpMgmt = (XywzAsstMachgCorpMgmt) model;
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if(xywzAsstMachgCorpMgmt.getAsstCorpId()==null){//新增
			xywzAsstMachgCorpMgmt.setInputPersId(auth.getUserId());
			xywzAsstMachgCorpMgmt.setInputPers(auth.getUsername());
			xywzAsstMachgCorpMgmt.setInputDt(new Date());
		}else{//更新
			xywzAsstMachgCorpMgmt.setModiDt(new Date());
		}
		return super.save(xywzAsstMachgCorpMgmt);
	}
	
}



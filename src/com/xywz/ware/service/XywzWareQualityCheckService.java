package com.xywz.ware.service;

import java.math.BigInteger;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.xywz.plan.model.XywzPlanPrdcPlanAdvsSngl;
import com.xywz.purc.model.XywzPurcProvrMgmtProduct;
import com.xywz.ware.model.XywzWareInvtyInfo;
import com.xywz.ware.model.XywzWareInvtyOut;
import com.xywz.ware.model.XywzWareManualStorage;
import com.xywz.ware.model.XywzWareQualityCheck;
import com.xywztech.bob.common.CommonService;
import com.xywztech.bob.common.JPABaseDAO;
import com.xywztech.bob.vo.AuthUser;
import com.xywztech.crm.constance.JdbcUtil;


/**
 * 质量检核Service
 * @author 
 * @since 2012-10-08 
 */
@Service
public class XywzWareQualityCheckService extends CommonService {
   
	public XywzWareQualityCheckService(){
		JPABaseDAO<XywzWareQualityCheck, Long>  baseDAO = new JPABaseDAO<XywzWareQualityCheck, Long>(XywzWareQualityCheck.class);  
		super.setBaseDAO(baseDAO);
	}

	//任务单
	public XywzPlanPrdcPlanAdvsSngl findXywzPlanPrdcPlanAdvsSngl(long id) {
		return em.find(XywzPlanPrdcPlanAdvsSngl.class, id);
	}
	//部分提交质检
	public void checkPart(String id,String jianCnt,String remZhiCnt,String memo){

		XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl = findXywzPlanPrdcPlanAdvsSngl(Long.parseLong(id)); 		
		xywzPlanPrdcPlanAdvsSngl.setScheduStatus("3");//排产状态设置为3已质检
		super.save(xywzPlanPrdcPlanAdvsSngl);
		//向质检表中插入质检合格数据
		saveXywzWareQualityCheck(xywzPlanPrdcPlanAdvsSngl,new BigInteger(jianCnt),new BigInteger(remZhiCnt),"1",memo);
		
		//向质检表中插入质检不合格数据

		BigInteger jianCnt1;
		BigInteger remZhiCnt1;
		BigInteger remsum = xywzPlanPrdcPlanAdvsSngl.getSumZhi().subtract(new BigInteger(jianCnt).multiply(xywzPlanPrdcPlanAdvsSngl.getZhiCnt()).add(new BigInteger(remZhiCnt)));
		if(xywzPlanPrdcPlanAdvsSngl.getSumZhi().compareTo(remsum)>0){
			jianCnt1=remsum.divide(xywzPlanPrdcPlanAdvsSngl.getZhiCnt());		//质检不合格的数量
			remZhiCnt1=remsum.remainder(xywzPlanPrdcPlanAdvsSngl.getZhiCnt());
			saveXywzWareQualityCheck(xywzPlanPrdcPlanAdvsSngl,jianCnt1,remZhiCnt1,"2",memo);
		}
		String channelType = xywzPlanPrdcPlanAdvsSngl.getChannalType();//渠道类型1订单2外采3录入
		if(null!=channelType&&channelType.equals("1")){
			//质检合格则向出库表中插入数据
			saveXywzWareInvtyOut(xywzPlanPrdcPlanAdvsSngl,new BigInteger(jianCnt),new BigInteger(remZhiCnt));			
		}else{
			//质检合格则向仓库表中插入数据
			saveXywzWareManualStorage(xywzPlanPrdcPlanAdvsSngl,new BigInteger(jianCnt),new BigInteger(remZhiCnt));
			if(channelType.equals("2")){
				updateXywzPurcProvrMgmtProduct(xywzPlanPrdcPlanAdvsSngl.getSourceId());				
			}else if(channelType.equals("3")){
				updateXywzWareManualStorage(xywzPlanPrdcPlanAdvsSngl.getSourceId());
			}
			
		}

		
		
	}
	//全部提交质检
	public void checkAll(String id,String status,String memo){

		XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl = findXywzPlanPrdcPlanAdvsSngl(Long.parseLong(id)); 		
		xywzPlanPrdcPlanAdvsSngl.setScheduStatus("3");//排产状态设置为3已质检
		super.save(xywzPlanPrdcPlanAdvsSngl);
		//向质检表中插入数据
		saveXywzWareQualityCheck(xywzPlanPrdcPlanAdvsSngl,xywzPlanPrdcPlanAdvsSngl.getJianCnt(),xywzPlanPrdcPlanAdvsSngl.getRemZhiCnt(),status,memo);
		//质检合格则向出库表中插入数据
		if(status.equals("1")){
			String channelType = xywzPlanPrdcPlanAdvsSngl.getChannalType();//渠道类型1订单2外采3录入
			if(null!=channelType&&channelType.equals("1")){
				//质检合格则向出库表中插入数据
				saveXywzWareInvtyOut(xywzPlanPrdcPlanAdvsSngl,xywzPlanPrdcPlanAdvsSngl.getJianCnt(),xywzPlanPrdcPlanAdvsSngl.getRemZhiCnt());			
			}else{
				//质检合格则向仓库表中插入数据
				saveXywzWareManualStorage(xywzPlanPrdcPlanAdvsSngl,xywzPlanPrdcPlanAdvsSngl.getJianCnt(),xywzPlanPrdcPlanAdvsSngl.getRemZhiCnt());
				if(channelType.equals("2")){
					updateXywzPurcProvrMgmtProduct(xywzPlanPrdcPlanAdvsSngl.getSourceId());				
				}else if(channelType.equals("3")){
					updateXywzWareManualStorage(xywzPlanPrdcPlanAdvsSngl.getSourceId());
				}
				
			}
			
			
		}
		
	}
	//向质检表中插入数据
	public void saveXywzWareQualityCheck(XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl,BigInteger jianCnt,BigInteger remZhiCnt,String status,String memo){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();		
		XywzWareQualityCheck xywzWareQualityCheck = new XywzWareQualityCheck();
			xywzWareQualityCheck.setPlanId(xywzPlanPrdcPlanAdvsSngl.getPlanId());
			xywzWareQualityCheck.setContrNum(xywzPlanPrdcPlanAdvsSngl.getContrNum());//合同号
			xywzWareQualityCheck.setMerchdType(xywzPlanPrdcPlanAdvsSngl.getMerchdType());//商品类型
			xywzWareQualityCheck.setChannalType(xywzPlanPrdcPlanAdvsSngl.getChannalType());//渠道类型
			xywzWareQualityCheck.setPrdName(xywzPlanPrdcPlanAdvsSngl.getPrdName());//品名
			xywzWareQualityCheck.setSpcModel(xywzPlanPrdcPlanAdvsSngl.getSpcModel());//规格型号
			xywzWareQualityCheck.setMaterials(xywzPlanPrdcPlanAdvsSngl.getMaterials());//材质
			xywzWareQualityCheck.setDenst(xywzPlanPrdcPlanAdvsSngl.getDenst());//密度
			xywzWareQualityCheck.setLen(xywzPlanPrdcPlanAdvsSngl.getLen());//长度
			xywzWareQualityCheck.setZhiCnt(xywzPlanPrdcPlanAdvsSngl.getZhiCnt());//支/件
			xywzWareQualityCheck.setJianCnt(jianCnt);//件
			xywzWareQualityCheck.setRemZhiCnt(remZhiCnt);//零支
			xywzWareQualityCheck.setWeight(xywzPlanPrdcPlanAdvsSngl.getWeight());//重量
			xywzWareQualityCheck.setWorkshop(xywzPlanPrdcPlanAdvsSngl.getWorkshop());//车间
			xywzWareQualityCheck.setMerchdId(xywzPlanPrdcPlanAdvsSngl.getMerchdId());//商品ID
			xywzWareQualityCheck.setCheckDt(new Date());//质检日期
			xywzWareQualityCheck.setCheckUserid(auth.getUserId());//质检人
			xywzWareQualityCheck.setCheckUsername(auth.getUsername());//质检人名称
			xywzWareQualityCheck.setCheckStatus(status);
			if (memo==null){
				memo=" ";
			}
			xywzWareQualityCheck.setMemo(memo);
		super.save(xywzWareQualityCheck);
	}
	//向仓库表中插入数据
	public void saveXywzWareManualStorage(XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl,BigInteger jianCnt,BigInteger remZhiCnt){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();	
		XywzWareInvtyInfo xywzWareInvtyInfo = new XywzWareInvtyInfo();
			xywzWareInvtyInfo.setContrNum(xywzPlanPrdcPlanAdvsSngl.getContrNum());//合同号
			xywzWareInvtyInfo.setPlanId(xywzPlanPrdcPlanAdvsSngl.getPlanId());//任务单ID
			xywzWareInvtyInfo.setMerchdId(xywzPlanPrdcPlanAdvsSngl.getMerchdId());//商品ID
			xywzWareInvtyInfo.setChannalType(xywzPlanPrdcPlanAdvsSngl.getChannalType());//渠道类型
			xywzWareInvtyInfo.setOutIntoWhsInd("");//出入库标志
			xywzWareInvtyInfo.setPrdName(xywzPlanPrdcPlanAdvsSngl.getPrdName());//品名
			xywzWareInvtyInfo.setSpcModel(xywzPlanPrdcPlanAdvsSngl.getSpcModel());//规格型号
			xywzWareInvtyInfo.setDenst(xywzPlanPrdcPlanAdvsSngl.getDenst());//密度
			xywzWareInvtyInfo.setLen(xywzPlanPrdcPlanAdvsSngl.getLen());//长度
			xywzWareInvtyInfo.setZhiCnt(xywzPlanPrdcPlanAdvsSngl.getZhiCnt());//支/件
			xywzWareInvtyInfo.setJianCnt(jianCnt);//件数
			xywzWareInvtyInfo.setRemZhiCnt(remZhiCnt);//零支
			xywzWareInvtyInfo.setWeight(xywzPlanPrdcPlanAdvsSngl.getWeight());//重量
			xywzWareInvtyInfo.setMemo("");//备注		
			xywzWareInvtyInfo.setWorkshop(xywzPlanPrdcPlanAdvsSngl.getWorkshop());//车间
			xywzWareInvtyInfo.setIntoWhsDt(new Date());//入库日期
			xywzWareInvtyInfo.setIntoWhsExecPers(auth.getUserId());//入库执行人
		super.save(xywzWareInvtyInfo);
		
		
	}
	//向出库库表中插入数据
	public void saveXywzWareInvtyOut(XywzPlanPrdcPlanAdvsSngl xywzPlanPrdcPlanAdvsSngl,BigInteger jianCnt,BigInteger remZhiCnt){
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();	
		XywzWareInvtyOut out = new XywzWareInvtyOut();
			out.setContrNum(xywzPlanPrdcPlanAdvsSngl.getContrNum());//合同号
			out.setMerchdId(xywzPlanPrdcPlanAdvsSngl.getMerchdId());//商品ID
			out.setPrdName(xywzPlanPrdcPlanAdvsSngl.getPrdName());//品名
			out.setSpcModel(xywzPlanPrdcPlanAdvsSngl.getSpcModel());//规格型号
			out.setDenst(xywzPlanPrdcPlanAdvsSngl.getDenst());//密度
			out.setLen(xywzPlanPrdcPlanAdvsSngl.getLen());//长度
			out.setMaterials(xywzPlanPrdcPlanAdvsSngl.getMaterials());
			out.setZhiCnt(xywzPlanPrdcPlanAdvsSngl.getZhiCnt());//支/件
			out.setJianCnt(jianCnt);//件数
			out.setRemZhiCnt(remZhiCnt);//零支
			out.setWeight(xywzPlanPrdcPlanAdvsSngl.getWeight());//重量
			out.setMemo("质检分配");//备注
			SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmssSSS");
			String outNum  = sdf.format(new Date());
			out.setOutNum(outNum);//出库批次号
			Map<String,String> map = getCustInfo(xywzPlanPrdcPlanAdvsSngl.getContrNum());			
			out.setOutCustId(map.get("custId"));//出库客户ID
			out.setOutCustName(map.get("custName"));//出库客户姓名
			out.setOutWhsDt(new Date());//出库日期
			out.setOutWhsExecPers(auth.getUserId());//出库人
		
		super.save(out);
	}
	
	//根据合同号查询订单信息
	public static Map<String,String> getCustInfo(String contrNum){
		Map<String,String> map = new HashMap<String,String>();
		Connection conn = null ;
    	Statement stmt = null ;
    	ResultSet rs = null;
        String sql = "SELECT a.* FROM(";
        sql+=" SELECT c.CUST_ID,c.CUST_SHT_NM,n.CONTR_NUM FROM XYWZ_SALE_INLAND_ORDR_CONTR n JOIN XYWZ_CUST_CUSTINFO c ON n.CUST_ID = c.CUST_ID";
        sql+=" UNION ALL";
        sql+=" SELECT c.CUST_ID,c.CUST_SHT_NM,w.CONTR_NUM FROM XYWZ_SALE_FRGN_ORDR_CONTR w JOIN XYWZ_CUST_CUSTINFO c ON w.CUST_ID = c.CUST_ID";
        sql+=" ) a WHERE a.CONTR_NUM ='"+contrNum+"'";
        try {
        	conn=JdbcUtil.getConnection();
			stmt = conn.createStatement();
	        rs = stmt.executeQuery(sql);
        	map.put("custId", "");
        	map.put("custName", "");
	        while(rs.next()){       	
	        	map.put("custId", rs.getString("CUST_ID"));
	        	map.put("custName", rs.getString("CUST_SHT_NM"));
	        }
	        
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
        	try {
        		if(rs != null) {
					rs.close() ;
				}
				if(stmt != null) {
					stmt.close() ;
				}
				if(conn != null) {
					conn.close() ;
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
        }

		
		
		return map;
	}
	
	//质检后修改手动入库表中的状态
	public void updateXywzWareManualStorage(Long id){
		XywzWareManualStorage xywzWareManualStorage= em.find(XywzWareManualStorage.class, id);
		if(null!=xywzWareManualStorage){
			xywzWareManualStorage.setStoreStatus("03");
			super.save(xywzWareManualStorage);
		}

		
	}
	//质检后修改外采商品的状态
	public void updateXywzPurcProvrMgmtProduct(Long id){
		XywzPurcProvrMgmtProduct xywzPurcProvrMgmtProduct= em.find(XywzPurcProvrMgmtProduct.class, id);
		if(null!=xywzPurcProvrMgmtProduct){
			xywzPurcProvrMgmtProduct.setPurcStatus("03");
			super.save(xywzPurcProvrMgmtProduct);
		}
		
	}
	
}



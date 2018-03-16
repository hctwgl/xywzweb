package com.xywztech.bcrm.product.action;

import java.sql.Connection;
import java.sql.Statement;

import org.apache.log4j.Logger;

import com.xywztech.bob.core.QueryHelper;
import com.xywztech.bob.importimpl.ImportInterface;
import com.xywztech.bob.vo.AuthUser;


//@Action("/marketing-news")
//@Results({
//    @Result(name="success", type="redirectAction", params = {"actionName" , "marketing-news"})
//})
public class ProbuyImport implements ImportInterface{
	private static Logger log = Logger.getLogger(QueryHelper.class);

	public void excute(Connection conn, String PKhead,AuthUser aUser) throws Exception {
		log.info("updateSQL: 【ProbuyImport has been evoke!】");
		Statement stm = null;
		try{
			stm = conn.createStatement();
			conn.setAutoCommit(false);
			String updateSQL="update  OCRM_F_CI_P_PROBUY_INFO " +
					"set opp_reason= '质量有问题aa' " +
					"where cust_id='66'";
			stm.execute(updateSQL);
//			String deleteSQL = "DELETE FROM OCRM_F_MM_MKT_INDEX_TEMP";
//			stm.execute(deleteSQL);
			log.info("updateSQL: 【" + updateSQL + "】");
			//}
			conn.commit();
		}catch(Exception e){
			e.printStackTrace();
			conn.rollback();
		}finally{
		    stm.close();
		    conn.close();

		}
	}

	

}
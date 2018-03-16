package com.xywztech.bob.action;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.core.CorebankingQueue;
import com.xywztech.bob.vo.AuthUser;

@ParentPackage("json-default")
@Action(value = "/coreBankingQueue", results = { @Result(name = "success", type = "json") })
public class CoreBankingQueueAction {

    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;

    private String account;
    
    private int queueSize;
    
    private List<Long> finished; 
    
    private List<Long> waiting;
    
    public String refresh() throws Exception {
        finished = new ArrayList<Long>();
        ActionContext ctx = ActionContext.getContext();
        @SuppressWarnings("unchecked")
        ArrayList<Long> list = (ArrayList<Long>) ctx.getSession().get("COREBANKING_QUERY_ID_HANDLE");
        if (list != null) {
            StringBuilder builder = new StringBuilder();
            builder.append("SELECT ID FROM OCRM_TEMP_CORE_BANKING WHERE (FINISH_TIME IS NOT NULL) AND ID IN (");
            for(long id : list) {
                builder.append(id);
                builder.append(", ");
            }
            builder.append("0)");
            Connection conn = ds.getConnection();
            try {           
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(builder.toString());
                while (rs.next()) {
                    Long id = rs.getLong("ID");
                    list.remove(id);
                    finished.add(id);
                }
                ctx.getSession().put("COREBANKING_QUERY_ID_HANDLE", list);
                waiting = list;
            } catch (Exception e) {
                e.printStackTrace();
                throw e;
            } finally {
                conn.close();
            }
        }
        return "success";
    }

    public String index() throws Exception {
        AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        String userId = auth.getUserId();
        String authUnits = "";//auth.getAuthUnits();
        Connection conn = ds.getConnection();
        try {           
            Long id = null;
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT ID_COREBANKING.NEXTVAL FROM DUAL");
            if (rs.next()) {
                id = rs.getLong("NEXTVAL");
                ActionContext ctx = ActionContext.getContext();
                @SuppressWarnings("unchecked")
                ArrayList<Long> list = (ArrayList<Long>) ctx.getSession().get("COREBANKING_QUERY_ID_HANDLE");
                if (list == null) {
                    list = new ArrayList<Long>();
                }
                list.add(id);
                ctx.getSession().put("COREBANKING_QUERY_ID_HANDLE", list);
            }
            String sql = "INSERT INTO OCRM_TEMP_CORE_BANKING(ID, ACCOUNT, USER_ID, INVOKE_TIME) VALUES (?, ?, ?, SYSDATE)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, id);
            pstmt.setString(2, account);
            pstmt.setString(3, userId);
            pstmt.execute();
            queueSize = CorebankingQueue.getInstance().addQueueItem(id, account, userId, authUnits);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            conn.close();
        }
        return "success";
    }

    public void setAccount(String account) {
        this.account = account;
    }
    
    public int getQueueSize() {
        return queueSize;
    }

    public List<Long> getFinished() {
        return finished;
    }

	public List<Long> getWaiting() {
		return waiting;
	}

}

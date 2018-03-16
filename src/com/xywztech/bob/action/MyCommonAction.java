package com.xywztech.bob.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.velocity.VelocityContext;
import com.opensymphony.xwork2.ActionSupport;

/**
 *@auth wws
 *@date 2016年6月4日---下午3:02:01
 *
 **/
public class MyCommonAction extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
    protected VelocityContext context;

    protected HttpServletRequest req;

    protected HttpServletResponse resp;

		final public void put(String name, Object o) {

				if (context == null) {
					context = new VelocityContext();
				}
				if (name == null) {
					return;
				}
				if (o == null) {
					context.remove(name);
				} else {
					context.put(name, o);
				}
				return;
			}
		
	  final protected void remove(String name) {
	        if (context != null) {
	            context.remove(name);
	        }
	    }
	  
	 final protected void set(String name, Object o) {
	        put(name, o);
	    }
	 
	 final protected Object get(String name, Object defaultValue) {
	        if (context != null) {
	            return context.get(name);
	        }
	        return defaultValue;
	    }
	
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nwchecker.server.dao;

import com.nwchecker.server.model.Contest;
import java.util.List;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Роман
 */
@Repository("ContestDAO")
public class ContestDAOImpl extends HibernateDaoSupport implements ContestDAO {
    
    @Autowired
    public void init(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }
    
    @Override
    public void addContest(Contest c) {
        getHibernateTemplate().save(c);
    }
    
    @Override
    public void updateContest(Contest c) {
        getHibernateTemplate().update(c);
    }
    
    @Override
    public List<Contest> getContests() {
        List<Contest> result = (List<Contest>) getHibernateTemplate().find("from Contest");
        return result;
    }
    
    @Override
    public Contest getContestByID(int id) {
        List<Contest> result = (List<Contest>) getHibernateTemplate().find("from Contest where id=?", id);
        return result.get(0);
    }
    
}
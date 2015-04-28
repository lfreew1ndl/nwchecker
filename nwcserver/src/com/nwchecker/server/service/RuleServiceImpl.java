package com.nwchecker.server.service;


import com.nwchecker.server.dao.LanguageDAO;
import com.nwchecker.server.dao.RuleDAO;
import com.nwchecker.server.dao.TypeContestDAO;
import com.nwchecker.server.model.Rule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("RuleService")
public class RuleServiceImpl implements RuleService{

    @Autowired
    private RuleDAO ruleDAO;

    @Autowired
    private LanguageDAO languageDAO;

    @Autowired
    private TypeContestDAO typeContestDAO;

    @Override
    public List<Rule> getRulesByLanguageTag(String tag) {
        int languageId = languageDAO.getLanguageIdByTag(tag);
        return ruleDAO.getRulesByLanguageId(languageId);
    }

    @Override
    public void updateRules(List<Rule> rules) {
        for(Rule r : rules){
            ruleDAO.updateRule(r);
        }
    }

    @Override
    public void updateRulesByLanguageTag(List<Rule> rules, String tag) {
        int languageId = languageDAO.getLanguageIdByTag(tag);
        for(Rule r : rules){
            r.setLanguageId(languageId);
            ruleDAO.updateRule(r);
        }
    }
}

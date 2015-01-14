package com.nwchecker.server.validators;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.nwchecker.server.model.User;

public class UserProfileValidator implements Validator {

	private final String	patternDisplayName	= "^[a-zA-Z]+[a-zA-Z0-9_-]{2,15}$";
	private final String	patternDepartment	= "^[a-zA-Z0-9_ -]*$";
	
	@Override
	public boolean supports(Class<?> clazz) {
		return User.class.equals(clazz);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "displayName", "profile.empty.displayName.caption");

		User user = (User) obj;
		
		if (!user.getDisplayName().matches(patternDisplayName)) {
			errors.rejectValue("displayName", "profile.badDisplayName.caption");
		}
		
		if (!user.getDisplayName().matches(patternDepartment)) {
			errors.rejectValue("department", "profile.badDepartment.caption");
		}
		
	}
}

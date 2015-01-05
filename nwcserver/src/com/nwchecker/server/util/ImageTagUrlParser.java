package com.nwchecker.server.util;

public class ImageTagUrlParser {

	private static final String IMG_PATTERN = "<img";
	private static final String SRC_PATTERN = "src=\"";
	private static final String CLOSING_SYMBOL = "\"";
	
	private StringBuilder string;
	
	private int currentPosition;
	private int urlEnd;
	
	public ImageTagUrlParser() {
		this.string = null;
		this.currentPosition = 0;
		this.urlEnd = 0;
	}

	public String getString() {
		return string.toString();
	}
	public void setString(String string) {
		this.string = new StringBuilder(string);
	}
	
	public void resetPointer() {
		this.currentPosition = 0;
		this.urlEnd = 0;
	}
	
	public String nextUrl() {
		currentPosition = string.indexOf(IMG_PATTERN, urlEnd);
		if (currentPosition != -1) {
			currentPosition = string.indexOf(SRC_PATTERN, urlEnd);
			currentPosition += SRC_PATTERN.length();
			urlEnd = string.indexOf(CLOSING_SYMBOL, currentPosition);
			return string.substring(currentPosition, urlEnd);
		}
		return "";
	}
	
	public boolean isEnd() {
		return (currentPosition == -1);
	}
	
	public void replaceUrl(String newUrlValue) {
		string = string.delete(currentPosition, urlEnd);
		string = string.insert(currentPosition, newUrlValue);
		urlEnd = currentPosition + newUrlValue.length();
	}
}
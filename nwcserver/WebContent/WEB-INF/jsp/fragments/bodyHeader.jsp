<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
<spring:url value="/resources/" var="resources" />

<header>
	<!-- service Logo -->
	<a href="index.do"><img src="${resources}images/logo.png" alt="Whitesquare logo"></a>
	<!-- choose language -->
	<div class="languageChoose">
		<a href="${requestScope['javax.servlet.forward.request_uri']}?locale=ua"><img
			src="${resources}images/ukraineFlag.png" width="36" height="36" alt="ua"></a> <a
			href="${requestScope['javax.servlet.forward.request_uri']}?locale=en"><img src="${resources}images/ukFlag.png"
			width="36" height="36" alt="en"></a>
	</div>
	<!-- navigating toolbar -->
	<nav class="navbar navbar-default">
		<ul class="nav navbar-nav">
			<!-- home -->
			<c:choose>
				<c:when test="${param.pageName=='home'}">
					<li class="active"><a><spring:message code="home.caption" /></a></li>
				</c:when>
				<c:otherwise>
					<li><a href="index.do"><spring:message code="home.caption" /></a></li>
				</c:otherwise>
			</c:choose>
			<!-- news -->
			<c:choose>
				<c:when test="${param.pageName=='news'}">
					<li class="active"><a><spring:message code="news.caption" /></a></li>
				</c:when>
				<c:otherwise>
					<li><a href="/"><spring:message code="news.caption" /></a></li>
				</c:otherwise>
			</c:choose>
			<!-- rating -->
			<c:choose>
				<c:when test="${param.pageName=='rating'}">
					<li class="active"><a href="/"><spring:message code="rating.caption" /></a></li>
				</c:when>
				<c:otherwise>
					<li><a href="/"><spring:message code="rating.caption" /></a></li>
				</c:otherwise>
			</c:choose>
			<!-- tasks -->
			<!-- if we are in task local need create task button clickable-->
			<c:choose>
				<c:when test="${(param.pageName=='taskLocal')||(param.pageName=='taskCreate')}">
					<li class="active"><a href="getTasks.do"><spring:message code="task.caption" /></a></li>
				</c:when>
				<c:otherwise>
					<c:choose>
						<c:when test="${param.pageName=='task'}">
							<li class="active"><a><spring:message code="task.caption" /></a></li>
						</c:when>
						<c:otherwise>
							<li><a href="getTasks.do"><spring:message code="task.caption" /></a></li>
						</c:otherwise>
					</c:choose>
				</c:otherwise>
			</c:choose>
			<!-- olympiad -->
			<c:choose>
				<c:when test="${param.pageName=='olympiad'}">
					<li class="active"><a href="/"><spring:message code="olympiad.caption" /></a></li>
				</c:when>
				<c:otherwise>
					<li><a href="/"><spring:message code="olympiad.caption" /></a></li>
				</c:otherwise>
			</c:choose>
			<!-- login -->
			<security:authorize access="!isAuthenticated()">
				<c:choose>
					<c:when test="${param.pageName=='login'}">
						<li class="active"><a><spring:message code="login.caption" /></a></li>
					</c:when>
					<c:otherwise>
						<li><a href="login.do"><spring:message code="login.caption" /></a></li>
					</c:otherwise>
				</c:choose>
			</security:authorize>
			<!-- logout -->
			<security:authorize access="isAuthenticated()">
				<c:choose>
					<c:when test="${param.pageName=='logout'}">
						<li class="active"><a><spring:message code="logout.caption" /></a></li>
					</c:when>
					<c:otherwise>
						<li><a href="logout.do"><spring:message code="logout.caption" /></a></li>
					</c:otherwise>
				</c:choose>
			</security:authorize>
		</ul>
	</nav>
	<div class="heading">
		<h1>
			<spring:message code="${param.pageName}.caption" />
		</h1>
	</div>
</header>
var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";
var REPO_NAME = "";

// $.ajaxSetup({
// headers : {
// 'Authorization' : "Basic " + btoa(USERNAME + ':' + PASSWORD)
// }
// });

$("#button_get_repo").click(function(e) {
	e.preventDefault();
	getRepo();
});

function getUserPass() {
	USERNAME = $("#user").val();
	PASSWORD = $("#password").val();
}

function getRepo() {
	getUserPass();
	REPO_NAME = $("#repository_name").val();

	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + REPO_NAME;
	$("#repos_result").text('');
	
	$.ajax({
		headers : {
			'Authorization' : "Basic " + btoa(USERNAME + ':' + PASSWORD)
		},
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(
			function(data, status, jqxhr) {
				var repo = data;

				$("#get_repo_result").text('');
				$('<h3> Name: ' + repo.name + '</h3>').appendTo($('#get_repo_result'));
				$('<p>').appendTo($('#get_repo_result'));	
				$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#get_repo_result'));
				$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#get_repo_result'));
				$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#get_repo_result'));
				$('<strong> Created: </strong> ' + repo.created_at + '<br>').appendTo($('#get_repo_result'));
				$('<strong> Last Push: </strong> ' + repo.pushed_at + '<br>').appendTo($('#get_repo_result'));	
				$('<strong> Language: </strong> ' + repo.language + '<br>').appendTo($('#get_repo_result'));		
				$('<strong> Default branch: </strong> ' + repo.default_branch + '<br>').appendTo($('#get_repo_result'));
				$('</p>').appendTo($('#get_repo_result'));
				

				$('<strong> Owner: </strong> ' + repo.owner.login + '<br>').appendTo($('#get_owner_result'));	
				$('<strong> Owner ID: </strong> ' + repo.owner.id + '<br>').appendTo($('#get_owner_result'));					
				$('<p>').appendTo($('#get_owner_result'));	
				$("#imagen").attr("src", repo.owner.avatar_url);
					//$("#imagen").attr("height", 100);
					
			}).fail(function() {
		$("#repos_result").text("Este repositorio no existe");
	});
}
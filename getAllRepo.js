var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";

// $.ajaxSetup({
// headers : {
// 'Authorization' : "Basic " + btoa(USERNAME + ':' + PASSWORD)
// }
// });

$("#button_get_repos").click(function(e) {
	e.preventDefault();
	getRepos();
});

function getUserPass() {
	USERNAME = $("#user").val();
	PASSWORD = $("#password").val();
}

function getRepos() {
	getUserPass();
	var url = API_BASE_URL + '/users/' + USERNAME + '/repos';
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
				var repos = data;

				$.each(repos, function(i, v) {
					var repo = v;

					
					$('<h3> Name: ' + '<strong>'+ repo.name + '</strong>'+'</h3>').appendTo($('#repos_result'));
					$('<p>').appendTo($('#repos_result'));	
					$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result'));
					$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#repos_result'));
					$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#repos_result'));
					
					$('<strong> Created: </strong> ' + repo.created_at + '<br>').appendTo($('#repos_result'));
				   $('<strong> Last Push: </strong> ' + repo.pushed_at + '<br>').appendTo($('#repos_result'));	
			   	$('<strong> Language: </strong> ' + repo.language + '<br>').appendTo($('#repos_result'));		
				   $('<strong> Default branch: </strong> ' + repo.default_branch + '<br>').appendTo($('#repos_result'));
			   	$('<strong> Owner: </strong> ' + repo.owner.login + '<br>').appendTo($('#repos_result'));	
			   	$('<strong> Owner ID: </strong> ' + repo.owner.id + '<br>').appendTo($('#repos_result'));					
			   	$('<strong> Owner Avatar: </strong> ' + repo.owner.avatar_url + '<br>').appendTo($('#repos_result'));	
				//	$('<strong> Links: </strong> ' + getRequestHeader("next") + '<br>').appendTo($('#repos_result'));		
					$('</p>').appendTo($('#repos_result'));
				});

			}).fail(function() {
		$("#repos_result").text("No hay repositorios.");
	});
}
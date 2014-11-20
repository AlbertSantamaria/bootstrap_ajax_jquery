var API_BASE_URL = "https://api.github.com";
var USERNAME = "TestingASL";
var PASSWORD = "test123456";

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

/*
Details about repository of GitHub API 
https://developer.github.com/v3/repos/
*/

$("#button_get_repos").click(function(e) {
	e.preventDefault();
	getRepos();
});

$("#button_get_repos_p").click(function(e) {
	e.preventDefault();
	getRepos_p();
});

$("#button_get_repo").click(function(e) {
	e.preventDefault();
	getRepo($("#repository_name").val());
});

$("#button_delete_repo").click(function(e) {
	e.preventDefault();
	var checked= new Object();
	checked=$("#checkbox_r").value();
	window.alert(checked);
	deleteRepo($("#repository_name_del").val());
});


$("#button_get_repo_to_edit").click(function(e) {
	e.preventDefault();
	getRepoToEdit($("#repository_name_get_to_edit").val());
});


$("#button_edit_repo").click(function(e) {
	e.preventDefault();

   var newRepo = new Object();
   var oldRepo= new Object();
	newRepo.name = $("#repository_name_to_edit").val();
	newRepo.description = $("#description_to_edit").val();
	oldRepo.name=$("#repository_name_get_to_edit").val();
	
	updateRepo(newRepo,oldRepo);
});

$("#button_to_create").click(function(e) {
	e.preventDefault();

   var newRepo = new Object();
	newRepo.name = $("#repository_name_to_create").val();
	newRepo.description = $("#description_to_create").val();
 	newRepo.homepage = "https://github.com";
 	newRepo.private = false;
	newRepo.has_issues = true;
	newRepo.has_wiki = true;
	newRepo.has_downloads = true;
	
	//validateNewRepo(newRepo);

	createRepo(newRepo);
});


function getRepos() {
	var url = API_BASE_URL + '/users/' + USERNAME + '/repos';
	$("#repos_result").text('');
	
	$.ajax({
		//head: links,
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
		//headers : 'data',
		//beforeSend: getHeader
	}).done(function(data, status, jqxhr) {
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
		$("#repos_result").text("No repositories.");
	});

}

function getRepos_p() {
	var url = API_BASE_URL + '/users/' + USERNAME + '/repos'+'?per_page=2';
	$("#repos_result_p").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		headers:{'Accept':'application/json; odata=verbose'},
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var repos = data;
				
				var link = jqxhr.getResponseHeader('link');
				
				var next_link = jqxhr.getResponseHeader('next');
				var last_link = jqxhr.getResponseHeader('last');
				
				//var line1=link.split('next');
				//var line2=line1[0].split('<');
				//var line3=line2[1].split('>');
				//NEXT_PAGE=line3[0];
				//window.alert(NEXT_PAGE);
				
				$.each(repos, function(i, v) {
					var repo = v;

					$('<h4> Name: ' + repo.name + '</h4>').appendTo($('#repos_result_p'));
					$('<p>').appendTo($('#repos_result_p'));	
					$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result_p'));
					$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#repos_result_p'));
					$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#repos_result_p'));

					$('<strong> Links: </strong> ' +next_link+ '<br>').appendTo($('#repos_result_p'));
									$('</p>').appendTo($('#repos_result_p'));
				});
				$(<a class="btn btn-danger" href="./eliminar.html" role="button">Ir a Eliminar &raquo;</a>).appendTo($('#repos_result_p'));

	}).fail(function() {
		$("#repos_result").text("No repositories.");
	});

}

function getRepo(repository_name) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name;
	$("#get_repo_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

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
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#get_repo_result"));
	});

}


function deleteRepo(repository_name_del) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name_del;
	$("#delete_repo").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Deleted</div>').appendTo($("#delete_repo"));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#delete_repo"));
	});

}


function getRepoToEdit(repository_name) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name;
	$("#update_result").text('');

	//validate();
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
		
				var repo = data;
				
				$("#update_result").text('');
				$("#repository_name_to_edit").val(repo.name);
				$("#description_to_edit").val(repo.description);

	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#update_result"));
	});

}

function updateRepo(repository,oldRepository) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + oldRepository.name;
	var data = JSON.stringify(repository);

	$("#update_result").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#update_result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Updated</div>').appendTo($("#update_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#update_result"));
	});

}


function createRepo(repository) {
	var url = API_BASE_URL + '/user/repos';
	var data = JSON.stringify(repository);

	$("#create_result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>').appendTo($("#create_result_w"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#create_result_w"));
	});

}


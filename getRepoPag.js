var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";
var PAGE = "1" * 1; 
var NEXT_PAGE = "";
var PREV_PAGE = "";


$("#button_get_repos").click(function(e) {
	e.preventDefault();
	getRepos();
});

$("#button_get_repos_prev").click(function(e) {
	e.preventDefault();
	getReposPrev();
});

$("#button_get_repos_next").click(function(e) {
	e.preventDefault();
	getReposNext();
});

function getUserPass() {
	USERNAME = $("#user").val();
	PASSWORD = $("#password").val();
}

function getRepos() {
	getUserPass();
	var url = API_BASE_URL + '/users/' + USERNAME + '/repos?page=1&per_page=2';

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

				var link = jqxhr.getResponseHeader('link');

				var line1 = link.split('next');
				var line2 = line1[0].split('<');
				var line3 = line2[1].split('>');
				NEXT_PAGE = line3[0];

				$.each(repos, function(i, v) {
					var repo = v;

					$('<h3>' + repo.name + '</h3>').appendTo($('#repos_result'));
					$('<p>').appendTo($('#repos_result'));
					$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result'));
					$('<strong> Git URL: </strong> ' + repo.git_url + '<br>').appendTo($('#repos_result'));
					$('<strong> Descripción: </strong> '+ repo.description + '<br>').appendTo($('#repos_result'));
					$('<strong> Es un repositorio fork: </strong>'+ repo.fork + '<br>').appendTo($('#repos_result'));
					$('</p>').appendTo($('#repos_result'));
				});

			}).fail(function() {
		$("#repos_result").text("No hay repositorios.");
	});
}

function getReposPrev() {
	getUserPass();
	var url = PREV_PAGE;

	$("#repos_result").text('');

	$
			.ajax(
					{
						headers : {
							'Authorization' : "Basic "
									+ btoa(USERNAME + ':' + PASSWORD)
						},
						url : url,
						type : 'GET',
						crossDomain : true,
						dataType : 'json',
					})
			.done(
					function(data, status, jqxhr) {
						var repos = data;

						var link = jqxhr.getResponseHeader('link');

						var line1 = link.split('next');
						var line2 = line1[0].split('<');
						var line3 = line2[1].split('>');
						NEXT_PAGE = line3[0];

						if (url != "https://api.github.com/user/8829997/repos?page=1&per_page=2") {
							var line4 = link.split('prev');
							var line5 = line4[0].split('<');
							var line6 = line5[4].split('>');
							PREV_PAGE = line6[0];
						}

						$.each(repos, function(i, v) {
							var repo = v;

							$('<h3>' + repo.name + '</h3>').appendTo($('#repos_result'));
							$('<p>').appendTo($('#repos_result'));
							$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result'));
							$('<strong> Git URL: </strong> '+ repo.git_url + '<br>').appendTo($('#repos_result'));
							$('<strong> Descripción: </strong> '+ repo.description + '<br>').appendTo($('#repos_result'));
							$('<strong> Es un repositorio fork: </strong>'+ repo.fork + '<br>').appendTo($('#repos_result'));
							$('</p>').appendTo($('#repos_result'));
						});

					}).fail(function() {
				$("#repos_result").text("No hay repositorios.");
			});
}

function getReposNext() {
	getUserPass();
	// PAGE++;
	// var url = API_BASE_URL + '/users/' + USERNAME + '/repos?page=' + PAGE +
	// '&per_page=2';
	var url = NEXT_PAGE;

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

				var link = jqxhr.getResponseHeader('link');

				var line1 = link.split('next');
				var line2 = line1[0].split('<');
				var line3 = line2[1].split('>');
				NEXT_PAGE = line3[0];

				var line4 = link.split('prev');
				var line5 = line4[0].split('<');
				var line6 = line5[4].split('>');
				PREV_PAGE = line6[0];

				$.each(repos, function(i, v) {
					var repo = v;

					$('<h3>' + repo.name + '</h3>')
							.appendTo($('#repos_result'));
					$('<p>').appendTo($('#repos_result'));
					$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#repos_result'));
					$('<strong> Git URL: </strong> ' + repo.git_url + '<br>').appendTo($('#repos_result'));
					$('<strong> Descripción: </strong> '+ repo.description + '<br>').appendTo($('#repos_result'));
					$('<strong> Es un repositorio fork: </strong>'+ repo.fork + '<br>').appendTo($('#repos_result'));
					$('</p>').appendTo($('#repos_result'));
				});

			}).fail(function() {
		$("#repos_result").text("No hay repositorios.");
	});
}
var API_BASE_URL = "https://api.github.com";
var API_EJEMPLO_URL = "https://api.github.com/repos/dsesto/basesdedatos";
var USERNAME = "";
var PASSWORD = "";
var REPO_NAME = "";

// $.ajaxSetup({
// headers : {
// 'Authorization' : "Basic " + btoa(USERNAME + ':' + PASSWORD)
// }
// });

$('#button_create_repo').attr("disabled", true);

$(document)
		.ready(
				function() {
					$('#button_create_repo').attr('disabled', true);

					$('#repository_name')
							.keyup(
									function() {
										if ($(this).val().length != 0
												&& $('#repository_description')
														.val().length != 0)
											$('#button_create_repo').attr(
													'disabled', false);
										else
											$('#button_create_repo').attr(
													'disabled', true);
									})

					$('#repository_description')
							.keyup(
									function() {
										if ($(this).val().length != 0
												&& $('#repository_name').val().length != 0)
											$('#button_create_repo').attr(
													'disabled', false);
										else
											$('#button_create_repo').attr(
													'disabled', true);
									})
				});

$("#button_create_repo").click(function(e) {
	e.preventDefault();
	
	var repo = new Object();
	repo.name = $("#repository_name").val();
	repo.description = $("#repository_description").val();
	repo.homepage = "https://github.com";
	repo.private = false;
	repo.has_issues = true;
	repo.has_wiki = true;
	repo.has_downloads = true;
	
	postRepo(repo);
});

function getUserPass() {
	USERNAME = $("#user").val();
	PASSWORD = $("#password").val();
}

function postRepo(repo) {
	getUserPass();

	var url = API_BASE_URL + '/user/repos';
	var data = JSON.stringify(repo);
	
	$("#repos_result").text('');

	$
			.ajax(
					{
						headers : {
							'Authorization' : "Basic "
									+ btoa(USERNAME + ':' + PASSWORD)
						},
						url : url,
						type : 'POST',
						crossDomain : true,
						dataType : 'json',
						data : data,
					})
			.done(
					function(data, status, jqxhr) {
						$(
								'<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>')
								.appendTo($("#repos_result"));
					})
			.fail(
					function() {
						$(
								'<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>')
								.appendTo($("#repos_result"));
					});
}
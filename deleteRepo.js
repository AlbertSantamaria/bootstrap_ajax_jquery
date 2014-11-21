var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";


$("#button_delete_repo").click(function(e) {
	e.preventDefault();	
	deleteRepo($("#repository_name_del").val());
});

function getUserPass() {
	USERNAME = $("#user").val();
	PASSWORD = $("#password").val();
}


function deleteRepo(repository_name_del) {
	getUserPass();
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name_del;
	$("#delete_repo").text('');

	$.ajax({
		headers : {	'Authorization' : "Basic "	+ btoa(USERNAME + ':' + PASSWORD) },
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
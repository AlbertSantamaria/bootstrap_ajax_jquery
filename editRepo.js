var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";

function getUserPass() {
	USERNAME = $("#user").val();
	PASSWORD = $("#password").val();
}

$("#button_edit_repo").click(function(e) {
	e.preventDefault();

   var newRepo = new Object();
   var oldRepo= new Object();
	newRepo.name = $("#repository_name_to_edit").val();
	newRepo.description = $("#description_to_edit").val();
	oldRepo.name=$("#repository_name_get_to_edit").val();
	
	updateRepo(newRepo,oldRepo);
});

function getRepoToEdit(repository_name) {
	getUserPass();	
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name;
	$("#update_result").text('');

	//validate();
	$.ajax({
		headers : {	'Authorization' : "Basic "	+ btoa(USERNAME + ':' + PASSWORD) },
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
	getUserPass();		
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + oldRepository.name;
	var data = JSON.stringify(repository);

	$("#update_result").text('');

	$.ajax({
		headers : {	'Authorization' : "Basic "	+ btoa(USERNAME + ':' + PASSWORD) },
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

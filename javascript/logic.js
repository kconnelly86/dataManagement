$(document).ready(function() {
	
    
    var config = {
        apiKey: "AIzaSyAAUV4y_LfKr94423qBchTSu4m0tD6VwPw",
        authDomain: "data-management-9ee56.firebaseapp.com",
        databaseURL: "https://data-management-9ee56.firebaseio.com",
        projectId: "data-management-9ee56",
        storageBucket: "",
        messagingSenderId: "960294846835"
      };

	firebase.initializeApp(config);

	var database = firebase.database();

	function monthDiff(d1, d2) {
	    var months;
	    months = (d2.getFullYear() - d1.getFullYear()) * 12;
	    months -= d1.getMonth() + 1;
	    months += d2.getMonth();
	    return months <= 0 ? 0 : months;
	}

	// database.ref("/EmployeeDataManagement").on("child_added", function(childsnapshot) {});
	database.ref("/EmployeeDataManagement").on("value", function(snap) {
		$("#display-article").empty();

		var today = new Date();

		snap.forEach(function(childsnap) {
			var childValue = childsnap.val();

			var tr = $("<tr>");
			tr.append("<td>" + childValue.employeeName + "</td>");
			tr.append("<td>" + childValue.role + "</td>");
			tr.append("<td>" + childValue.startDate + "</td>");

			var childdate = new Date(childValue.startDate);
			var monthWorked = monthDiff(childdate, today);
			tr.append("<td>" + monthWorked + "</td>");

			tr.append("<td>" + "$" + childValue.monthlyRate + "</td>");

			var total = childValue.monthlyRate * monthWorked;
			tr.append("<td>" + "$" + total + "</td>");
			
			$("#display-article").append(tr);
		});
	});

	$("#select-article").on("click", function(event) {
		// prevent form from submitting
		event.preventDefault();

		var name = $("#data-name").val().trim();
		var role = $("#data-role").val().trim();
		var date = $("#data-date").val().trim();
		var rate = $("#data-rate").val().trim();

		database.ref("/EmployeeDataManagement").push({
			employeeName: name,
			role: role,
			startDate: date,
			monthlyRate: rate
		});
	});

	
});


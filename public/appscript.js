document.addEventListener("DOMContentLoaded", (event) => {
	document.getElementById('deletebtn').addEventListener('click', (e) => {
		let action = e.target.value;
		action = action.toLowerCase();
		document.getElementById('actiontype').value = action;
		document.forms["blogform"].submit();
	});
 });


const maxUsersCount = 50;
var maleCount = 0;
var femaleCount = 0;
var id = 0;

$.ajax({
	url: 'https://randomuser.me/api/?results='+maxUsersCount,
  	dataType: 'json',
  	success: function(dataPerson) {

    dataPerson.results.forEach(person => {
    	createAccordionElement(person);
    	id++;
	    	if(person.gender === 'male'){
	    		maleCount++;
	    	} else {
	    		femaleCount++;
	    	}
	    	});
    	createChart(maleCount, femaleCount);  

    	$("#myInput").on("keyup", filterByFirstName());
	}
});

var createAccordionElement = function(person){
	var accordionControl = $('<div/>', {'class': 'row', 'data-toggle': 'collapse', 'data-target': '#collapse'+id, 'aria-expanded': 'false',
										 'aria-controls': 'collapse'+id});
	createPersonMainInfoRow(person, accordionControl)
	var cardHeader = $('<div/>', {'class': 'card-header'});
	var card = $('<div/>', {'class': 'card'});
	cardHeader.append(accordionControl);
	card.append(cardHeader);
	createCardBody(person, card);
	$('#accord').append(card);
}

var createPersonMainInfoRow = function(person, appendToElement){
	var photo = $('<div/>', {'class': 'col-1'})
							.append($('<img/>',	 {'src': person.picture.thumbnail,
                            		  'class':'rounded-circle',
                              		  'alt': 'photo'}));
	var lastName = $('<div/>', {'class': 'col-2 aa', 'text': person.name.last});
	var firstName = $('<div/>', {'class': 'col-2', 'text': person.name.first});
	var username = $('<div/>', {'class': 'col-2', 'text': person.login.username});
	var phone = $('<div/>', {'class': 'col-2', 'text': person.phone});
	var location = $('<div/>', {'class': 'col-2', 'text': person.location.state});
	var plusIcon = $('<div/>', {'class': 'col-1'}).append($('<img class="plusIcon" src="plusIcon.jpg">'));

	$(appendToElement).append(photo, lastName,firstName, username, phone, location, plusIcon);
}

var createCardBody = function(person, appendToElement){
	var cardBody = $('<div/>', {'class': 'card-body'});
	var divContainer = $('<div/>', {'class': 'container'});
	var dataParentController = $('<div/>', {'id': 'collapse'+id, 'class': 'collapse', 'data-parent': '#accord'});
	cardBody.append(divContainer);
	createCardBodyInfo(person, divContainer);
	dataParentController.append(divContainer);
	$(appendToElement).append(dataParentController);
}

var createCardBodyInfo = function(person, appendToElement){
	var nameAndIcon = $('<div/>', {'class': 'row person-first-name', 'text': person.name.first});
	var detailedInfo = $('<div/>', {'class': 'row person-detail-data'});
	createDetailedInfo(person, detailedInfo);
	$(appendToElement).append(nameAndIcon, detailedInfo);
}

var createDetailedInfo = function(person, appendToElement){
	var username = $('<div/>', {'class': 'row', 'text': 'Username: ' + person.login.username});
	var registred = $('<div/>', {'class': 'row', 'text': 'Registred: ' + person.registered.date}) ;
	var email = $('<div/>', {'class': 'row', 'text': 'Email: ' + person.email}) ;

	var div1 = $('<div/>', {'class': 'col-3'});
	div1.append(username, registred, email);

	var adress = $('<div/>', {'class': 'row', 'text': 'Adress: '+ person.location.street.name +
																  ', ' + person.location.street.number});
	var city = $('<div/>', {'class': 'row', 'text': 'City: ' + person.location.city}) ;
	var zip = $('<div/>', {'class': 'row', 'text': 'Zip Code: ' + person.location.postcode}) ;

	var div2 = $('<div/>', {'class': 'col-3'});
	div2.append(adress, city, zip);

	var birthday = $('<div/>', {'class': 'row', 'text': 'Birthday: ' + person.dob.date});
	var phone = $('<div/>', {'class': 'row', 'text': 'Phone: ' + person.phone}) ;
	var cell = $('<div/>', {'class': 'row', 'text': 'Cell: ' + person.cell}) ;

	var div3 = $('<div/>', {'class': 'col-3'});
	div3.append(birthday, phone, cell);

	var photoLarge = $('<div/>', {'class': 'col-3'})
		.append($('<img/>',	 {'src': person.picture.large,
                              'class':'rounded-circle',
                              'alt': 'photo'}));

	$(appendToElement).append(div1, div2, div3, photoLarge);
}

var createChart = function(maleCount, femaleCount){
	var ctx = $('#myChart');
	var labels = ['Male', 'Female'];
	var colors = ['blue', 'red'];

	var myChart = new Chart(ctx, {
		type: 'pie',
		data:{
			datasets:[{
				data: [maleCount,femaleCount],
				backgroundColor:colors
			}],
			labels:labels
		},
		options: {
			responsive: true
		}
	})
}

var filterByFirstName = function(){
	// .....
}

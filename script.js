const maxUsersCount = 50;

$.ajax({
	url: 'https://randomuser.me/api/?results='+maxUsersCount,
  	dataType: 'json',
  	success: function(data) {
    console.log(data.results);

    data.results.forEach(person => {
    	createAccordionElement(person);
    	})  
	}
});

var createAccordionElement = function(person){
	var accordionControl = $('<div/>', {'class': 'row', 'data-toggle': 'collapse', 'data-target': '#collapse'+person.login.uuid, 'aria-expanded': 'false',
										 'aria-controls': 'collapse'+person.login.uuid});
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
	var lastName = $('<div/>', {'class': 'col-2', 'text': person.name.last});
	var firstName = $('<div/>', {'class': 'col-2', 'text': person.name.first});
	var username = $('<div/>', {'class': 'col-2', 'text': person.login.username});
	var phone = $('<div/>', {'class': 'col-2', 'text': person.phone});
	var location = $('<div/>', {'class': 'col-2', 'text': person.location.state});
	var plusIcon = $('<div/>', {'class': 'col-1', 'text': '+'});

	$(appendToElement).append(photo, lastName,firstName, username, phone, location, plusIcon);
}

var createCardBody = function(person, appendToElement){
	var cardBody = $('<div/>', {'class': 'card-body'});
	var dataParentController = $('<div/>', {'id': 'collapse'+person.login.uuid, 'class': 'collapse', 'data-parent': '#accord'});
	createCardBodyInfo(person, cardBody);
	dataParentController.append(cardBody);
	$(appendToElement).append(dataParentController);
}

var createCardBodyInfo = function(person, appendToElement){
	var nameAndIcon = $('<div/>', {'class': 'row', 'text': 'name icon'});
	var detailedInfo = $('<div/>', {'class': 'row'});
	createDetailedInfo(person, detailedInfo);

	$(appendToElement).append(nameAndIcon, detailedInfo);


}

var createDetailedInfo = function(person, appendToElement){
	var username = $('<div/>', {'class': 'row', 'text': 'Username: '});
	var registred = $('<div/>', {'class': 'row', 'text': 'Registred: '}) ;
	var email = $('<div/>', {'class': 'row', 'text': 'Email: '}) ;

	var div1 = $('<div/>', {'class': 'col-3'});
	div1.append(username, registred, email);

	var adress = $('<div/>', {'class': 'row', 'text': 'Adress: '});
	var city = $('<div/>', {'class': 'row', 'text': 'City: '}) ;
	var zip = $('<div/>', {'class': 'row', 'text': 'Zip Code: '}) ;

	var div2 = $('<div/>', {'class': 'col-3'});
	div2.append(adress, city, zip);

	var birthday = $('<div/>', {'class': 'row', 'text': 'Birthday: '});
	var phone = $('<div/>', {'class': 'row', 'text': 'Phone: '}) ;
	var cell = $('<div/>', {'class': 'row', 'text': 'Cell: '}) ;

	var div3 = $('<div/>', {'class': 'col-3'});
	div3.append(birthday, phone, cell);

	var photoLarge = $('<div/>', {'class': 'col-3'})
		.append($('<img/>',	 {'src': person.picture.large,
                              'class':'rounded-circle',
                              'alt': 'photo'}));

	$(appendToElement).append(div1, div2, div3, photoLarge);
}


var socket = io();

function scrolltoBottom(){
  //selectors
  var messages = jQuery('.table');
  var newMessage= messages.children('tbody:last-child');
  //Heights
  var clientHeight= messages.prop('clientHeight');
  var scrollTop= messages.prop('scrollTop');
  var scrollHeight= messages.prop('scrollHeight');
  var newMessageHeight= newMessage.innerHeight();
  var lastMessageHeight= newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight +lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  jQuery('#username').text(params.name);
  jQuery('.logo').append(params.room);
  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href= '/';
    }else{
      console.log('No Error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList',function (users){
    var ol= jQuery('<ol id="users"></ol>');
    users.forEach(function (user){
      var li= jQuery('<li style="font-family: Ani;"></li>');
      var a= jQuery('<a></a>');
      ol.append(jQuery(li.append(a).text("😁   "+user+"  ")));
    });  
    jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
  var formattedTime= moment(message.createdAt).format('h:mm a');
  var template= jQuery('#message-template').html();
  var html= Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  //jQuery('#messages').append(html);
  scrolltoBottom();
});

socket.on('newLocationMessage', function (message) {
  var formattedTime= moment(message.createdAt).format('h:mm a');
  var template= jQuery('#location-message-template').html();
  var html= Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('.table').children('tbody:first-child').html(html); 
  scrolltoBottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox= jQuery('[name=message]');

  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function () {
      messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('');
    var i= jQuery('<i class="fa fa-lg fa-map-marker"></>');
    locationButton.append(i)
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('');
    var i= jQuery('<i class="fa fa-lg fa-map-marker"></>');
    locationButton.append(i)
    alert('Unable to fetch location.');
  });
});
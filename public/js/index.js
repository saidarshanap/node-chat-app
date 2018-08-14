var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery(`<tr><td>${message.from}</td><td class="mail-subject">${message.text}</td></tr>`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery(`<tr><td>${message.from}</td><td class="mail-subject"><a target="_blank" href=${message.url}>My current location</a></td></tr>`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox= jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
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
    var i= jQuery('<i class="fa fa-location-arrow"></>');
    locationButton.append(i)
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('');
    var i= jQuery('<i class="fa fa-location-arrow"></>');
    locationButton.append(i)
    alert('Unable to fetch location.');
  });
});
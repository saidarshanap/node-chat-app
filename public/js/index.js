var socket = io();

    socket.on('connect', function (){
      console.log('Connected to server');
    });

    socket.on('disconnect', function () {
      console.log('Disconnected from server');
    });

    socket.on('newMessage',function (message){
        console.log('new msg: ',message);
        var li = jQuery('<li></li>');
        li.text(`${message.from} : ${message.text}`);

        jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage',function(message){
      var li= jQuery('<li></li>');
      var a= jQuery('<a target="_blank">My Current Location</a>');

      li.text(`${message.from}`);
      a.attr('href',message.url);
      li.append(a);
      jQuery('#messages').append(li);
    });

    jQuery('#message-form').on('submit', function (e){
      e.preventDefault();

      socket.emit('createMessage',{
          from: 'User',
          text: jQuery('[name=message]').val()
      },function(){

      });

      var locationButton = jQuery('#send-location');
      locationButton.on('Click',function(){
        if(!navigator.geolocation){
          return alert('Geolocation Not Supported');
        }
        navigator.geolocation.getCurrentPosition(function(position){
            socket.emit('createLoacationMessage',{
              latitude : position.coords.latitude,
              longitude: position.coords.longitude
            });
        },function(){
          alert('Unable to fetch loacation');
        });
      });

    });
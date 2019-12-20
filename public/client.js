$( document ).ready(function() {
  /*global io*/
var socket = io();
var currentUsers;
  
socket.on('user count', function(data){         
          console.log(data);
});

console.log('user ' + socket.request.user.name + ' connected')
   
  // Form submittion with new message in field with id 'm'
  $('form').submit(function(){
    var messageToSend = $('#m').val();
    //send message to server here?
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
  
  
  
});


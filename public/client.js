$( document ).ready(function() {
  /*global io*/
var socket = io();
var currentUsers;
  
socket.on('user count', function(data){
          currentUsers = data;
          console.log(data);
});

socket.on('disconnect', () => { 
      io.on('user count', socket => {
        currentUsers = currentUsers - 1;
        io.emit('user count',currentUsers);
    });
});
   
  // Form submittion with new message in field with id 'm'
  $('form').submit(function(){
    var messageToSend = $('#m').val();
    //send message to server here?
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
  
  
  
});


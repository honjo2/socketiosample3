$(function() {
    var socket = io.connect('http://localhost');
    socket.on('news', function(data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });
    var $msg = $('#msg')
    , $ok = $('#ok')
    , $display = $('#display')
    ;
    socket.on('msg push', function(data) {
        var $li = $('<li>').text(data);
        $display.append($li);
    });
    $ok.click(function() {
        socket.emit('msg send', $msg.val());
    });
});


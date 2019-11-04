module.exports = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log(socket.id);
        socket.on('SEND_MESSAGE', function (data) {
            console.log(data);
            io.emit('RECEIVE_MESSAGE', data); 
            //socket.emit('MY_MESSAGE', data); // 나한테만 메세지 전송함
            //socket.broadcast.emit('OTHER_MESSAGE', data); // 본인을 제외한 다른 사람들에게만 메세지 전송함
        });
    });
    return io;
}
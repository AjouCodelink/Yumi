module.exports = function (server) {
    var io = require('socket.io')(server);
    var PopQuiz = require('../../models/popQuiz');

    io.sockets.on('connection', function (socket) {
        console.log(socket.id);
        socket.on('SEND_MESSAGE', function (data) {
            console.log(data);
            //socket.join(data.cr_id);
            io.sockets.in(data.cr_id).emit('RECEIVE_MESSAGE', data); 
            //socket.emit('MY_MESSAGE', data); // 나한테만 메세지 전송함
            //socket.broadcast.emit('OTHER_MESSAGE', data); // 본인을 제외한 다른 사람들에게만 메세지 전송함
        });

        socket.on('JOIN_ROOM', function(cr_id){
            socket.join(cr_id);
        });

        socket.on('LEAVE_ROOM', function(cr_id){
            socket.leave(cr_id);
        });
    });

    setInterval(() => { // 일정 주기로 팝퀴즈를 반환함
        var data = {};

        PopQuiz.find({}, function(err, datas){ 
            if(err) return err;
            var randomQuizNumber = Math.floor(Math.random() * datas.length); // 팝퀴즈 중 하나 랜덤으로 찾음

            data.author = datas[randomQuizNumber].question; // TODO : 이거 나중에 프론트엔드에 RECEIVE_QUIZ 작성 되면 author -> question으로 수정
            data.message = datas[randomQuizNumber].answer;

            console.log(data);
            io.emit('RECEIVE_MESSAGE', data); // TODO : RECEIVE_QUIZ로 나중에 수정 예정
        })
    }, 2000000); // 시간 주기 설정 (2000 -> 2초)

    return io;
}

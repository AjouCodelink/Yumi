module.exports = function (server) {
    var io = require('socket.io')(server);
    var PopQuiz = require('../../models/popQuiz');
    var ChatRoom = require('../../models/chatRoom');
    var User = require('../../models/user');

    io.sockets.on('connection', function (socket) {
        console.log(socket.id);
        socket.on('SEND_MESSAGE', function (data) {
            console.log(data);
            ChatRoom.findOne({_id : data.cr_id}, function(err, chatroom){
                chatroom.chatlog.push({ // chatroom에 채팅 로그 저장
                    user_email : data.user_email,
                    time : data.Time,
                    message : data.message
                })
                chatroom.save();
            })
            io.sockets.in(data.cr_id).emit('RECEIVE_MESSAGE', data); 
        })

        socket.on('JOIN_ROOM', function(data){
            ChatRoom.findOne({_id:data.cr_id}, function(err, chatroom){
                var len = chatroom.participants.length;

                for(var i=0; i<len; i++){
                    
                    if(data.myEmail == chatroom.participants[i].email){
                        if(chatroom.participants[i].socketID == undefined){
                            chatroom.participants[i].socketID = socket.id;
                            chatroom.save();
                            socket.join(data.cr_id);
                            break;
                        } else{
                            chatroom.participants[i].socketID=socket.id;
                            chatroom.save();
                            socket.join(data.cr_id);
                            break;
                        }
                    }
                }
            })
        });

        socket.on('LEAVE_ROOM', function(){
            socket.leaveAll();
            console.log(socket.id);
            socket.emit('disconnect');
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
          });
    });

    setInterval(() => { // 일정 주기로 팝퀴즈를 반환함
        ChatRoom.find({}, {interest: 1}, function(err, chatrooms){
            chatrooms.map((room) => {
                var category = room.interest.section;

                PopQuiz.find({category}, function(err, quizzes){
                    var random_num = Math.floor(Math.random() * quizzes.length);
                    var quiz = quizzes[random_num];
                    
                    io.sockets.in(room._id).emit('RECEIVE_QUIZ', quiz);
                })
            })
        })
    }, 2000000); // 시간 주기 설정 (2000 -> 2초)

    return io;
}

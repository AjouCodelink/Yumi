var router = require('express').Router();
var ChatRoom = require('../../models/chatRoom');
var request = require('request');

/*
    GET /place/recommend/:roomId
*/
exports.recommend = (req, res, next) => {
    var roomId = req.params.roomId; // query로 roomId = {id}를 받아야함.
    var client_id = 'pn80bxdxtf';
    var client_secret = 'HBSc7VWidfQACtAmmWL9K7I6ebVMCmRYpUiSUlU9';
    
    ChatRoom.findOne({_id:roomId}, function(err, room){
        var interestsAndLocation = getInterestsAndLocationByRoom(room);

        var keyword = getKeywordByInterests(["soccer", "soccer", "baseball"]) // TODO : 파라미터에 interestsAndLocation.interests 들어갈 예정
        var centerLocation = getCenterByLocations([{x:127.123, y:35.11}, {x:128.444, y:34.33}]); // TODO : locations의 정보를 DB에 넣은 뒤 interestsAndLocation.location 파라미터 바꿔주기
        
        keyword = 'pc'; // TODO : getKeywordByInterests 함수 작성 후 삭제 예정

        var api_url = 'https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query='+keyword+
        '&coordinate='+centerLocation.x+','+centerLocation.y;
        var options = {
            url: api_url,
            headers: {'X-NCP-APIGW-API-KEY-ID':client_id, 'X-NCP-APIGW-API-KEY': client_secret}
        };
        request.get(options, function (error, response, body) { // 네이버 API에서 장소 정보 가져오는 코드.
            if (!error && response.statusCode == 200) {
                res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
                res.end(body);
            } else {
                res.status(response.statusCode).end();
                console.log('error = ' + response.statusCode);
            }
        });
    })
}

function getInterestsAndLocationByRoom(room){ // room 정보를 입력하여 방에 포함된 사용자들의 interests와 location을 반환
    var interestsOfRoomMembers=[];
    var locationOfRoomMembers=[];
    var participants = room.participants

    for(var i=0; i<participants.length; i++){
        for(var j=0; j<participants[i].interests.length; j++){
            interestsOfRoomMembers.push(participants[i].interests[j])
        }
    }
    /*
        TODO : 사용자들의 위치 정보 입력하는 코드 작성
        participants[i].location으로 작성 예정
    */
    return {interests : interestsOfRoomMembers, location:locationOfRoomMembers};
}

function getKeywordByInterests(interests){
    /*
        TODO : SVD 알고리즘 사용하여 interests를 데이터로 하여 최적의 관심분야를 찾아내는 코드 작성.
    */
}

function getCenterByLocations(location){ // location 배열 정보를 입력 받아 center 좌표를 반환
    var center_x=0;
    var center_y=0;

    for(var i=0; i<location.length; i++){
        center_x += location[i].x;
        center_y += location[i].y;
    }
    center_x /= location.length;
    center_y /= location.length;

    return {x:center_x, y:center_y};
}
const request = require('supertest');
const should = require('should');
const app = require('../../app');

describe('GET /login/auth/test', () => {
    describe('성공시', ()=>{
        it('unit test 테스트를 위한 코드', (done) => {
            request(app)
                .get('/login/auth/test')
                .expect(200)
                .end((err, res) => {
                    if(err) throw err;
                    res.body.email.should.be.a.String();
                    done();
                })
        });
    })
});

describe('POST /login/auth', ()=>{
    describe('성공시', ()=> {
        it('생성된 유저를 반환한다.', (done)=>{
            request(app)
                .post('/login/auth')
                .send({email:"tkdgusl94@naver.com", password:"codelink"})
                .end((err,res)=>{
                    console.log(res.body);
                    done();
                })
        })
    });
});

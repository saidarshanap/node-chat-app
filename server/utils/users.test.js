const expect = require('expect');

const {Users}= require('./users')

describe('Users', () => {
    var users;

    beforeEach(()=>{
        users= new Users();
        users.users=[{
            id: '1',
            name: 'Sai',
            room: 'Advayas'
        },
        {
            id: '2',
            name: 'Darshan',
            room: 'VIMCA'
        },
        {
            id: '3',
            name: 'Sai Darshan',
            room: 'Advayas'
        }];
    });
    it('Should add new User', ()=>{
        var users= new Users();
        var user ={
            id: '123',
            name: 'sai',
            room: 'Sai'

        };
        var reUser= users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });
    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
    
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
      });
    
      it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);
    
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
      });
    
      it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
    
        expect(user.id).toBe(userId);
      });
    
      it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);
    
        expect(user).toNotExist();
      });

    it('should return names for Advayas', ()=>{
        var userList = user.getUserList('Advayas');

        expect(userList).toEqual(['Sai','Sai Darshan']);
    });
    it('should return names for VIMCA', ()=>{
        var userList = user.getUserList('Advayas');

        expect(userList).toEqual(['Darshan']);
    });
});
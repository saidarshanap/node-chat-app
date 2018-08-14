var expect = require('expect');

var{generateMessage}= require('./message');

describe('generateMessage',()=>{
    it('Should generate coreect message object' , ()=>{
        var from = 'Dart';
        var text= 'Message';
        var message= generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});
const expect = require('expect');

const{isRealString} = require('./validation');

describe('isRealString', ()=>{
    it('Should Reject non-string Values',()=>{
        var res = isRealString(98);
        expect(res).toBe(false);
    });
    it('Should Reject string With only Spaces',()=>{
        var res = isRealString('      ');
        expect(res).toBe(false);
    });
    it('Should allow string with non-space characters',()=>{
        var res = isRealString('  Sai  ');
        expect(res).toBe(false);
    });
});
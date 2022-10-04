import keccak256 from 'keccak256'
import MerkleTree from './merkletree';
import { parse } from 'csv';
import * as fs from "fs";

let foo = fs.readFileSync('./sample.csv');
//let bar = Buffer.from(foo).toString();

parse(foo, {delimiter: ','}, (err, data) => {
    if(err) {
        return
    }

    for(let i=0; i<data.length; i++){
        console.log(data[i]);
/*
        console.log(zeroPadding(i.toString(16)));
        console.log(data[i][0].replace('0x', ''));
        console.log(zeroPadding(parseInt(data[i][1]).toString(16)));
*/

        //BN 으로 바꿔야함
        let raw = zeroPadding(i.toString(16)) + data[i][0].replace('0x', '') + zeroPadding(parseInt(data[i][1]).toString(16));
        console.log(data[i][1]);
        console.log(zeroPadding(parseInt(data[i][1]).toString(16)));
        //console.log(keccak256(Buffer.from(raw, 'hex')).toString('hex'));
    }
})

function zeroPadding(num: string) {
    if(num.length < 64) {
        return num = ('0000000000000000000000000000000000000000000000000000000000000000' + num).slice(-64);
    } else return num;
}

// idx : 0, account : 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, amount : 10
// 256bits + 160bits + 256bits
// 00000000000000000000000000000000000000000000000000000000000000005B38Da6a701c568545dCfcB03FcB875f56beddC4000000000000000000000000000000000000000000000000000000000000000a
// 0x20469d57a663e836e1c54b49e35f108cc3e8674594eaeefcfef97170b35d0a88

/*
// result
// foo : 41b1a0649752af1b28b3dc29a1556eee781e4a4c3a1f7f53f90fa834de098c4d
// bar : 5dc1c14d56e959d57ab94facd0d6c86740ac46c453bf9107bba1c735d7783c71
console.log(keccak256('foo').toString('hex'));
console.log(keccak256(Buffer.from('foo')).toString('hex'));
*/

const leaves = ['foo', 'var'].map(x => keccak256(Buffer.from(x)).toString('hex'));

const tree = new MerkleTree(leaves);
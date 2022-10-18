import { MerkleTree, csvToLeaves } from './merkletree';
import * as fs from "fs";

sampleFunc(fs.readFileSync('./sample.csv'));

async function sampleFunc(csv: Buffer) {
    let leaves = await csvToLeaves(csv);
    let merkleTree = new MerkleTree(leaves);

    console.log("leaves :", merkleTree.getLeaves());
    console.log("layers :", merkleTree.getLayers());
    console.log("tree :\n", merkleTree.getTree());
    console.log("root :", merkleTree.getRoot());
    
    console.log("proof string :\n", merkleTree.getProof('a36c0d02987059f985bbbf9d9777359fd4721fd00732bf967d653635ca4d5c45'));
    console.log("proof index:\n", merkleTree.getProof(1));
    
    /*
    console.log("verify :", merkleTree.verify([
        'a36873a8c21502d6d1b94e50296e3a14da4a176f8e693130eb009bb09d7f3131',
        'bfae9843fcb3e70765bdc74bb8d4da0587c587f190ae45416485d121ba8b41df',
        'fecd452fe1dd902d8a32d733d8c46544020523988b13e9b5eccd4e9c1d70932d',
        '2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
      ], "2f5cd6d34a8083269880b774761dd5bf49edc44add2dac87ae953cad8d2dab2b", "f1b19f47976c7bf4c9d325c04bdbe76bfa6f8bc01b65c5db8c8dc553e3514143"));
    */

    console.log("Proofs : ", merkleTree.getAllProof());
}

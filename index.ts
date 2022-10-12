import { MerkleTree, csvToLeaves } from './merkletree';
import * as fs from "fs";

sampleFunc(fs.readFileSync('./sample.csv'));

async function sampleFunc(csv: Buffer) {
    let leaves = await csvToLeaves(csv);
    let merkleTree = new MerkleTree(leaves);

    console.log("root :", merkleTree.getRoot());
    console.log("leaves :", merkleTree.getLeaves());
    console.log("layers :", merkleTree.getLayers());
    console.log("tree :\n", merkleTree.getTree());
    console.log("proof :\n", merkleTree.getProof('4a0ae025d7e2c2a2668304ea985f3f581280c4f75c836dd3e457428b0c1b4392'));
}

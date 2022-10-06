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
}

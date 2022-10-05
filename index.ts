import {MerkleTree, csvToLeaves} from './merkletree';
import * as fs from "fs";

let sampleCsv = fs.readFileSync('./sample.csv');

(async() => {
    let leaves = await csvToLeaves(sampleCsv);

    let bar = new MerkleTree(leaves);
    console.log("leaves :", bar.getLeaves());
    console.log("root :", bar.getRoot());
    console.log("layers :", bar.getLayers());
})()



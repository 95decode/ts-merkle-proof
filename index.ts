import { MerkleTree, csvToLeaves } from './merkletree';
import * as fs from "fs";
import * as treeify from "treeify";

let sampleCsv = fs.readFileSync('./sample.csv');

(async() => {
    let leaves = await csvToLeaves(sampleCsv);

    let bar = new MerkleTree(leaves);
    console.log("leaves :", bar.getLeaves());
    console.log("root :", bar.getRoot());
    console.log("layers :", bar.getLayers());
})()

let foo: treeify.TreeObject = {
    "root" : {
        "bar": "baz",
        "bar2": "baz2"
    }
}

console.log(treeify.asTree(foo, false, false));



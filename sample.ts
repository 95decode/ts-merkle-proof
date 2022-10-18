import { MerkleTree, csvToLeaves } from './merkletree';
import * as fs from "fs";

sampleFunc(fs.readFileSync('./sample10e6.csv'));

async function sampleFunc(csv: Buffer) {
    let leaves = await csvToLeaves(csv);
    let merkleTree = new MerkleTree(leaves);
    console.log("constructor");
    //console.log("leaves :", merkleTree.getLeaves());
    //console.log("layers :", merkleTree.getLayers());
    //console.log("tree :\n", merkleTree.getTree());
/*
    let index = 999
    console.log(index);

    console.log("leaves :", JSON.stringify(merkleTree.getLeaves()));

    let root = merkleTree.getRoot();
    console.log("root :", root);

    let leaf = merkleTree.getLeaf(index);
    console.log("leaf :", leaf);
    
    let proof = merkleTree.getProof(index);
    console.log("proof :\n", proof);

    console.log("verify :", merkleTree.verify(proof, root, leaf));
*/ 
    //console.log("Proofs : ", merkleTree.getAllProof());
    let _root = merkleTree.getRoot();
    let result = true;
    for(let i = 0; i < 1000000; i++) {
      console.log(i);
      if(!merkleTree.verify(merkleTree.getProof(i), _root, merkleTree.getLeaf(i))) {
        result = false;
      };
    }
    console.log(result);
}

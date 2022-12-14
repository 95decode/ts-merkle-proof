import { parse } from 'csv';
import BigNumber from 'bignumber.js';
import keccak256 from 'keccak256';
import * as treeify from "treeify";

export class MerkleTree {
    private leaves: string[] = [];
    private root: string = "";
    private layers: Array<string[]> = [];
    private leavesObj: Array<treeify.TreeObject> = [];
    private treeObj: treeify.TreeObject = {};

    constructor(_leaves: string[]) {
        this.leaves = _leaves;
        this.leavesObj = this.leaves.map((key): treeify.TreeObject => {
            let obj: treeify.TreeObject = {};
            obj[key] = "leaf";
            return obj;
        });
        this.layers.push(this.leaves);
        this.calculateLayer(this.leaves, this.leavesObj);
    }

    /**
     * @description Calculate merkle tree's layer using recursive function
     */
    private calculateLayer(currentLayer: string[], currentLayerObj: Array<treeify.TreeObject>) {
        if(!currentLayer.length) return;
        
        let nextLayer: string[] = [];
        let nextLayerObj: Array<treeify.TreeObject> = [];

        for(let i = 0; i < currentLayer.length; i++) {
            if(i+1 == currentLayer.length) {
                nextLayer.push(currentLayer[i]);
                nextLayerObj.push(currentLayerObj[i]);
                break;
            }
            let raw = [currentLayer[i], currentLayer[i + 1]].sort();
            let parent = keccak256(Buffer.from(raw[0] + raw[1], 'hex')).toString('hex');
            let parentObj: treeify.TreeObject = {};
            parentObj[parent] = Object.assign(currentLayerObj[i], currentLayerObj[i+1]);
            nextLayer.push(parent);
            nextLayerObj.push(parentObj);
            i++;
        }
        this.layers.push(nextLayer);

        if(nextLayer.length != 1) {
            this.calculateLayer(nextLayer, nextLayerObj);
        } else {
            this.root = nextLayer[0]
            this.treeObj = nextLayerObj[0];
        };
    }

    /**
     * @description Calculate merkle proof using recursive function
     */
    private calculateProof(hash: string, layer: number, proof: string[]) {
        let _hash = hash.replace('0x', '');
        let length = this.layers[layer].length;
        if(length == 1) return proof;

        let idx = this.layers[layer].indexOf(_hash);
        if(idx == -1) return [];

        if(length % 2 && idx == length - 1) {
            layer++
            proof = this.calculateProof(_hash, layer, proof);
        } else {
            const neighborIdx = idx % 2 ? idx - 1 : idx + 1;
            proof.push(this.layers[layer][neighborIdx]);
            let raw = [this.layers[layer][idx], this.layers[layer][neighborIdx]].sort();
            let nextHash = keccak256(Buffer.from(raw[0] + raw[1], 'hex')).toString('hex');
            layer++
            proof = this.calculateProof(nextHash, layer, proof);
        }
        return proof;
    }

    /**
     * @param proof Merkle proof
     * @param root Merkle root
     * @param leaf 1 of Merkle tree's leaves
     * @returns bool
     */
    verify(proof: string[], root: string, leaf: string): boolean {
        let _root = root.replace("0x", "");
        let _leaf = leaf.replace("0x", "");

        let _proof = proof.map((hash) => {
            return hash.replace("0x", "");
        });

        let nextHash = _leaf;
        for(let i = 0; i < _proof.length; i++) {
            // openzeppelin's merkle proof library need pair sort
            let raw = [nextHash, _proof[i]].sort();
            
            nextHash = keccak256(Buffer.from(raw[0] + raw[1], 'hex')).toString('hex');
        }
        return nextHash == _root ? true : false;
    }

    /**
     * @param leaf 1 of Merkle tree's leaves or index number
     * @returns Merkle proof as array of keccak256 hashes string
     */
    getProof(leaf: string | number): string[] {
        let proof: string[] = [];

        if (typeof leaf === "string") {
            let _leaf = leaf.replace('0x', '');
            proof = this.calculateProof(_leaf, 0, proof);
        } else {
            proof = this.calculateProof(this.leaves[leaf], 0, proof);
        }
        return proof.map((hash) => {
            return "0x" + hash;
        });
    }

    /**
     * @returns All merkle proofs 
     */
    getAllProof(): Array<object> {

        let proofs = [];

        for(let i = 0; i < this.leaves.length; i++) {
            let leaf = this.leaves[i];
            proofs.push({
                ["0x" + leaf]: this.getProof(leaf)
            })
        }
        return proofs;
    }

    /**
     * @returns Merkle tree string using treeify
     */
    getTree(): string {
        return treeify.asTree(this.treeObj, false, false);
    }

    getLeaf(index: number): string {
        return "0x" + this.leaves[index];
    }

    /**
     * @returns Merkle tree's leaves
     */
    getLeaves(): string[] {
        return this.leaves.map((hash) => {
            return "0x" + hash;
        });
    }

    /**
     * @returns Merkle root
     */
    getRoot(): string {
        return "0x" + this.root;
    }

    /**
     * @returns Merkle tree's layer
     */
    getLayers(): Array<string[]> {
        return this.layers.map((layer) => {
            return layer.map((hash) => {
                return "0x" + hash;
            })
        });
    }
}

/**
 * @param csvData csv file as Buffer
 * @returns Merkle leaves
 */
export function csvToLeaves(csvData: Buffer): Promise<string[]> {
    return new Promise(resolve => {
        parse(csvData, {delimiter: ','}, (err, data) => {
            if(err) return;
            let leaves: string[] = [];
            for(let i = 0; i < data.length; i++){
                const idx = i.toString(16);
                const address = data[i][0].replace('0x', '');
                const amount = BigNumber(data[i][1]).toString(16);

                /**
                 * raw is hexadecimal string, fixed length(256bits + 160bits + 256bits)
                 * raw = (idx, address, amount)
                 */
                let raw = zeroPadding(idx) + address + zeroPadding(amount);

                // leaf : keccak256(raw)
                let leaf = keccak256(Buffer.from(raw, 'hex')).toString('hex');
                leaves.push(leaf);
            }
            resolve(leaves);
        });
    })
}

/**
 * @param num non-zero padded hexadecimal
 * @returns zero padded hexadecimal as string
 */
export function zeroPadding(num: string): string {
    const zero32 = '0000000000000000000000000000000000000000000000000000000000000000'
    if(num.length < 64) {
        return num = (zero32 + num).slice(-64);
    } else return num;
}

export default MerkleTree
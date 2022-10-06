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

    verify(proof: string[], root: string, leaf: string): boolean {
        let nextHash = leaf;
        for(let i = 0; i < proof.length; i++) {
            let raw = [nextHash, proof[i]].sort();
            nextHash = keccak256(Buffer.from(raw[0] + raw[1], 'hex')).toString('hex');
        }
        return nextHash == root ? true : false;
    }

    getProof(leaf: string[]): string[]{
        // leaf 포함 확인

        let proof: string[] = [];

        // proof 연산

        return proof;
    }

    getTree(): string {
        return treeify.asTree(this.treeObj, false, false);
    }

    getLeaves(): string[] {
        return this.leaves;
    }

    getRoot(): string {
        return this.root;
    }

    getLayers(): Array<string[]> {
        return this.layers;
    }
}

export function csvToLeaves(csvData: Buffer): Promise<string[]> {
    return new Promise(resolve => {
        parse(csvData, {delimiter: ','}, (err, data) => {
            if(err) return;
            let leaves: string[] = [];
            for(let i = 0; i < data.length; i++){
                const idx = i.toString(16);
                const address = data[i][0].replace('0x', '');
                const amount = BigNumber(data[i][1]).toString(16);
                // 256bits + 160bits + 256bits
                // raw : (idx, address, amount)
                let raw = zeroPadding(idx, 64) + address + zeroPadding(amount, 64);
                // leaf : keccak256(raw)
                let leaf = keccak256(Buffer.from(raw, 'hex')).toString('hex');
                leaves.push(leaf);
            }
            resolve(leaves);
        });
    })
}

export function zeroPadding(num: string, len: number): string {
    const zero32 = '0000000000000000000000000000000000000000000000000000000000000000'
    if(num.length < len) {
        return num = (zero32 + num).slice(-len);
    } else return num;
}

export default MerkleTree
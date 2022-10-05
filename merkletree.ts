import { parse } from 'csv';
import BigNumber from 'bignumber.js';
import keccak256 from 'keccak256'

export class MerkleTree {
    private leaves: string[] = [];
    private layer: Array<string[]> = [];

    constructor(_leaves: string[]) {
        this.leaves = _leaves;

        this.layer.push(this.leaves)
    }

    public getleaves() {
        console.log(this.leaves);
    }

    public getRoot() {
        if(!this.leaves.length) return;

        this.recur(this.leaves);

        console.log(this.layer);
    }

    private recur(data: string[]) {
        if(!data.length) return;
        
        let nextLayer: string[] = [];

        for(let i=0; i<data.length; i++) {
            if(i+1 == data.length) {
                nextLayer.push(data[i]);
                break;
            }

            // i, i+1 연산 함
            let raw = [data[i], data[i+1]];
            raw.sort()
            nextLayer.push(keccak256(Buffer.from(raw[0]+raw[1], 'hex')).toString('hex'));
            i++
        }
        this.layer.push(nextLayer);

        if(nextLayer.length != 1) {
            this.recur(nextLayer)
        } else {
            console.log(nextLayer);
        };
    }
}

export function csvToLeaves(csvData: Buffer): Promise<string[]> {
    return new Promise(resolve => {
        parse(csvData, {delimiter: ','}, (err, data) => {
            if(err) return;
            let leaves: string[] = []
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
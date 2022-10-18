# merkle-proof-generator
merkle-proof-generator

```sh
npm install
npx ts-node sample
```

# example
## sample.ts
```javascript
import { MerkleTree, csvToLeaves } from './merkletree';
import * as fs from "fs";

sampleFunc(fs.readFileSync('./sample.csv'));
```
## 
## 
## 
## 
## leaves  

```javascript
async function sampleFunc(csv: Buffer) {
    let leaves = await csvToLeaves(csv);
    let merkleTree = new MerkleTree(leaves);

    console.log("leaves :", merkleTree.getLeaves());
}
```

## result  

```sh
leaves : [
  '0x11ef200483cf2448ae0f999acab16214c895ec9774aa577b096a54ad2e018f39',
  '0xa36c0d02987059f985bbbf9d9777359fd4721fd00732bf967d653635ca4d5c45',
  '0x2ecebf1cfb0a71092b92883812eaa6b06b94de7647bc20348b5c583732a98a7c',
  '0x56586f0fa29881694da448f1e72d38e3a8aac0dbf9f87a9c3d388d8fdb8291a6',
  '0x187a099e84a518e0cc3afac23127c9029cd3fdbf414ff4bea92bab7b2f67f02a',
  '0x3dc2e2d73f0279bfbb461c57ba1828d8f3a21f01ee19b0eabf3d07a8dab1429c',
  '0xf1b19f47976c7bf4c9d325c04bdbe76bfa6f8bc01b65c5db8c8dc553e3514143',
  '0xa36873a8c21502d6d1b94e50296e3a14da4a176f8e693130eb009bb09d7f3131',
  '0x8a488c523702af8f633075e7475230fa08785fd4a7ab3252c7b311ce72a636a7',
  '0xd2929b4015471728ed78faf954f3af8043ab57cc255a8b0f5f8c5c1079a20190'
]
```
## 
## 
## 
## 
## tree  

```javascript
async function sampleFunc(csv: Buffer) {
    let leaves = await csvToLeaves(csv);
    let merkleTree = new MerkleTree(leaves);

    console.log("tree :\n", merkleTree.getTree());
}
```

## result  

```sh
tree :
 └─ 2f5cd6d34a8083269880b774761dd5bf49edc44add2dac87ae953cad8d2dab2b
   ├─ f0bc34532f97e668e14dcc28a08e7f90f96eed05a33cc6c1cee0ad7005c64538
   │  ├─ fecd452fe1dd902d8a32d733d8c46544020523988b13e9b5eccd4e9c1d70932d
   │  │  ├─ a24882c1fba184e7e8bf6d6c996a2b90d334a9b2448318c7fcea27341a9c6e3c
   │  │  │  ├─ 11ef200483cf2448ae0f999acab16214c895ec9774aa577b096a54ad2e018f39
   │  │  │  └─ a36c0d02987059f985bbbf9d9777359fd4721fd00732bf967d653635ca4d5c45
   │  │  └─ 6ac5c4e041a12a5fa4100e44192a965f23245fe44dc51a60ccd8dad1f8e60167
   │  │     ├─ 2ecebf1cfb0a71092b92883812eaa6b06b94de7647bc20348b5c583732a98a7c
   │  │     └─ 56586f0fa29881694da448f1e72d38e3a8aac0dbf9f87a9c3d388d8fdb8291a6
   │  └─ 45e05fd3a9032d84c9f4c84bf4221a0913e413125b3d7709c5cd6ad73319dec4
   │     ├─ bfae9843fcb3e70765bdc74bb8d4da0587c587f190ae45416485d121ba8b41df
   │     │  ├─ 187a099e84a518e0cc3afac23127c9029cd3fdbf414ff4bea92bab7b2f67f02a
   │     │  └─ 3dc2e2d73f0279bfbb461c57ba1828d8f3a21f01ee19b0eabf3d07a8dab1429c
   │     └─ 462a64806a350c083daca9634697503f5e5051c98a0f8648452a461a1832f24b
   │        ├─ f1b19f47976c7bf4c9d325c04bdbe76bfa6f8bc01b65c5db8c8dc553e3514143
   │        └─ a36873a8c21502d6d1b94e50296e3a14da4a176f8e693130eb009bb09d7f3131
   └─ 2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801
      ├─ 8a488c523702af8f633075e7475230fa08785fd4a7ab3252c7b311ce72a636a7
      └─ d2929b4015471728ed78faf954f3af8043ab57cc255a8b0f5f8c5c1079a20190
```
## 
## 
## 
## 
## root  

```javascript
async function sampleFunc(csv: Buffer) {
    let leaves = await csvToLeaves(csv);
    let merkleTree = new MerkleTree(leaves);

    console.log("root :", merkleTree.getRoot());
}
```

## result  

```sh
root : 0x2f5cd6d34a8083269880b774761dd5bf49edc44add2dac87ae953cad8d2dab2b
```
## 
## 
## 
## 
## proof  

```javascript
async function sampleFunc(csv: Buffer) {
    let leaves = await csvToLeaves(csv);
    let merkleTree = new MerkleTree(leaves);

    console.log("proof string :\n", merkleTree.getProof('a36c0d02987059f985bbbf9d9777359fd4721fd00732bf967d653635ca4d5c45'));
    console.log("proof index:\n", merkleTree.getProof(1));
}
```

## result  

```sh
proof string :
 [
  '0x11ef200483cf2448ae0f999acab16214c895ec9774aa577b096a54ad2e018f39',
  '0x6ac5c4e041a12a5fa4100e44192a965f23245fe44dc51a60ccd8dad1f8e60167',
  '0x45e05fd3a9032d84c9f4c84bf4221a0913e413125b3d7709c5cd6ad73319dec4',
  '0x2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
]
proof index:
 [
  '0x11ef200483cf2448ae0f999acab16214c895ec9774aa577b096a54ad2e018f39',
  '0x6ac5c4e041a12a5fa4100e44192a965f23245fe44dc51a60ccd8dad1f8e60167',
  '0x45e05fd3a9032d84c9f4c84bf4221a0913e413125b3d7709c5cd6ad73319dec4',
  '0x2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
]
```
## 
## 
## 
## 
## All proofs  

```javascript
async function sampleFunc(csv: Buffer) {
    let leaves = await csvToLeaves(csv);
    let merkleTree = new MerkleTree(leaves);

    console.log("Proofs : ", merkleTree.getAllProof());
}
```

## result  

```
Proofs :  [
  {
    '0x11ef200483cf2448ae0f999acab16214c895ec9774aa577b096a54ad2e018f39': [
      '0xa36c0d02987059f985bbbf9d9777359fd4721fd00732bf967d653635ca4d5c45',
      '0x6ac5c4e041a12a5fa4100e44192a965f23245fe44dc51a60ccd8dad1f8e60167',
      '0x45e05fd3a9032d84c9f4c84bf4221a0913e413125b3d7709c5cd6ad73319dec4',
      '0x2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
    ]
  },
  {
    '0xa36c0d02987059f985bbbf9d9777359fd4721fd00732bf967d653635ca4d5c45': [
      '0x11ef200483cf2448ae0f999acab16214c895ec9774aa577b096a54ad2e018f39',
      '0x6ac5c4e041a12a5fa4100e44192a965f23245fe44dc51a60ccd8dad1f8e60167',
      '0x45e05fd3a9032d84c9f4c84bf4221a0913e413125b3d7709c5cd6ad73319dec4',
      '0x2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
    ]
  },
  {
    '0x2ecebf1cfb0a71092b92883812eaa6b06b94de7647bc20348b5c583732a98a7c': [
      '0x56586f0fa29881694da448f1e72d38e3a8aac0dbf9f87a9c3d388d8fdb8291a6',
      '0xa24882c1fba184e7e8bf6d6c996a2b90d334a9b2448318c7fcea27341a9c6e3c',
      '0x45e05fd3a9032d84c9f4c84bf4221a0913e413125b3d7709c5cd6ad73319dec4',
      '0x2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
    ]
  },
  {
    '0x56586f0fa29881694da448f1e72d38e3a8aac0dbf9f87a9c3d388d8fdb8291a6': [
      '0x2ecebf1cfb0a71092b92883812eaa6b06b94de7647bc20348b5c583732a98a7c',
      '0xa24882c1fba184e7e8bf6d6c996a2b90d334a9b2448318c7fcea27341a9c6e3c',
      '0x45e05fd3a9032d84c9f4c84bf4221a0913e413125b3d7709c5cd6ad73319dec4',
      '0x2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
    ]
  },
  {
    '0x187a099e84a518e0cc3afac23127c9029cd3fdbf414ff4bea92bab7b2f67f02a': [
      '0x3dc2e2d73f0279bfbb461c57ba1828d8f3a21f01ee19b0eabf3d07a8dab1429c',
      '0x462a64806a350c083daca9634697503f5e5051c98a0f8648452a461a1832f24b',
      '0xfecd452fe1dd902d8a32d733d8c46544020523988b13e9b5eccd4e9c1d70932d',
      '0x2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
    ]
  },
  {
    '0x3dc2e2d73f0279bfbb461c57ba1828d8f3a21f01ee19b0eabf3d07a8dab1429c': [
      '0x187a099e84a518e0cc3afac23127c9029cd3fdbf414ff4bea92bab7b2f67f02a',
      '0x462a64806a350c083daca9634697503f5e5051c98a0f8648452a461a1832f24b',
      '0xfecd452fe1dd902d8a32d733d8c46544020523988b13e9b5eccd4e9c1d70932d',
      '0x2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
    ]
  },
  {
    '0xf1b19f47976c7bf4c9d325c04bdbe76bfa6f8bc01b65c5db8c8dc553e3514143': [
      '0xa36873a8c21502d6d1b94e50296e3a14da4a176f8e693130eb009bb09d7f3131',
      '0xbfae9843fcb3e70765bdc74bb8d4da0587c587f190ae45416485d121ba8b41df',
      '0xfecd452fe1dd902d8a32d733d8c46544020523988b13e9b5eccd4e9c1d70932d',
      '0x2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
    ]
  },
  {
    '0xa36873a8c21502d6d1b94e50296e3a14da4a176f8e693130eb009bb09d7f3131': [
      '0xf1b19f47976c7bf4c9d325c04bdbe76bfa6f8bc01b65c5db8c8dc553e3514143',
      '0xbfae9843fcb3e70765bdc74bb8d4da0587c587f190ae45416485d121ba8b41df',
      '0xfecd452fe1dd902d8a32d733d8c46544020523988b13e9b5eccd4e9c1d70932d',
      '0x2a98db303de15a2a660403f5fb0e97e3b6eb3eac515cf484bfc76d3a5ab20801'
    ]
  },
  {
    '0x8a488c523702af8f633075e7475230fa08785fd4a7ab3252c7b311ce72a636a7': [
      '0xd2929b4015471728ed78faf954f3af8043ab57cc255a8b0f5f8c5c1079a20190',
      '0xf0bc34532f97e668e14dcc28a08e7f90f96eed05a33cc6c1cee0ad7005c64538'
    ]
  },
  {
    '0xd2929b4015471728ed78faf954f3af8043ab57cc255a8b0f5f8c5c1079a20190': [
      '0x8a488c523702af8f633075e7475230fa08785fd4a7ab3252c7b311ce72a636a7',
      '0xf0bc34532f97e668e14dcc28a08e7f90f96eed05a33cc6c1cee0ad7005c64538'
    ]
  }
]
```
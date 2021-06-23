var fs = require('fs');
const util = require('util');
const { ethers } = require("ethers");

const BASTARDGANPUNKV2ADDRESS="0x31385d3520bCED94f77AaE104b406994D8F2168C";
const BASTARDGANPUNKV2ABI=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_BASTARDS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"METADATA_PROVENANCE_HASH","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numBastards","type":"uint256"}],"name":"adoptBASTARD","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"calculatePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"calculatePriceTest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hasSaleStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseDrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_hash","type":"string"}],"name":"setProvenanceHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startDrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"payable","type":"function"}];


const provider = new ethers.providers.JsonRpcProvider();
console.log(JSON.stringify(provider));

const signer = provider.getSigner();
console.log(JSON.stringify(signer));

async function test() {
  console.log(await provider.getBlockNumber());

  const contract = new ethers.Contract(BASTARDGANPUNKV2ADDRESS, BASTARDGANPUNKV2ABI, provider);
  const totalSupply = await contract.totalSupply();
  console.log("contract.totalSupply: " + totalSupply.toString());

  for (let i = 0; i < totalSupply && i < 10000; i++) {
    const tokenURI = await contract.tokenURI(i);
  //   const tokenId = await wrappedMoonCatRescue.tokenByIndex(i);
  //   console.log("wrappedMoonCatRescue.tokenId: " + tokenId.toString());
  //   const tokenByIndex = await wrappedMoonCatRescue.tokenByIndex(i);
    console.log("tokenURI: " + tokenURI.toString());
  //   const _tokenIDToCatID = await wrappedMoonCatRescue._tokenIDToCatID(tokenId);
  //   console.log("wrappedMoonCatRescue._tokenIDToCatID: " + _tokenIDToCatID.toString());
  }

}

test();

if (false) {
const INPUTDATADIR = "osraw/";
// const OUTPUTDATAJS = "slumdoge.js";
// const OUTPUTDATAJSON = "slumdoge.json";
const OUTPUTREPORT = "reportOSImages.js";

// console.log("Reading data from '" + INPUTDATAFILE + "' ...");

let records = {};
let accumulator = {};
for (let i = 0; i < 10000; i += 50) {
  // console.log(i);
  var data = JSON.parse(fs.readFileSync(INPUTDATADIR + i + ".json", "utf8"));
  // console.log(JSON.stringify(data, null, 2));
  for (let assetIndex in data.assets) {
    const asset = data.assets[assetIndex];
    // console.log(asset.token_id + " => " + asset.image_url);
    records[asset.token_id] = asset.image_url;
  }
  // const attributeCount = data.attributes.length;
  // if (!accumulator[attributeCount]) {
  //   accumulator[attributeCount] = [];
  // }
  // accumulator[attributeCount].push(data.name);
  // records.push({ image: data.image, name: data.name, attributes: data.attributes });
}

// console.log(JSON.stringify(records, null, 2));

(async () => {
  await fs.writeFile(OUTPUTREPORT, "const SLUMDOGEIMAGEDATA=" + JSON.stringify(records, null, 2) + ";", (err) => {
      if (err) throw err;
      console.log('Data written to file: ' + OUTPUTREPORT);
  });
})();
}

// (async () => {
//   await fs.writeFile(OUTPUTDATAJS, "const SLUMDOGEDATA=" + JSON.stringify(records, null, 2) + ";", (err) => {
//       if (err) throw err;
//       console.log('Data written to file: ' + OUTPUTDATAJS);
//   });
// })();
// (async () => {
//   await fs.writeFile(OUTPUTDATAJSON, JSON.stringify(records, null, 2), (err) => {
//       if (err) throw err;
//       console.log('Data written to file: ' + OUTPUTDATAJSON);
//   });
// })();


// const https = require('https')
// const url = "https://slumdoge.s3.ap-southeast-2.amazonaws.com/0";
// https.get(url, res => {
//   let data = '';
//   res.on('data', chunk => {
//     data += chunk;
//   });
//   res.on('end', () => {
//     data = JSON.parse(data);
//     console.log(data);
//   })
// }).on('error', err => {
//   console.log(err.message);
// })

// var config = JSON.parse(fs.readFileSync(INPUTDATAFILE, 'utf8'));
//
// console.log(util.inspect(config, showHidden=false, depth=3, colorize=true));
//
// console.log("allTokenIds: " + util.inspect(getAllTokenIds(config), showHidden=false, depth=3, colorize=true));
// console.log("allParents: " + util.inspect(getAllParents(config), showHidden=false, depth=3, colorize=true));
// console.log("allAttributes: " + util.inspect(getAllAttributes(config), showHidden=false, depth=3, colorize=true));
// console.log("allAncientDNAs: " + util.inspect(getAllAncientDNAs(config), showHidden=false, depth=3, colorize=true));
//
// for (let tokenId in Object.keys(config.tokens)) {
//   let token = config.tokens[tokenId];
//   const filenamePrefix = pad64Zeroes(tokenId);
//   const jsonFilename = OUTPUTDATADIR + filenamePrefix + ".json";
//   console.log(jsonFilename + " " + JSON.stringify(token));
//
//   const data = {};
//   const attributes = [];
//   data.name = config.name_prefix + ' #' + pad3Zeroes(tokenId);
//   data.description = data.name + '. ' + config.description;
//   data.external_url = config.external_url_prefix + '#/' + tokenId;
//   data.image = config.external_url_prefix + 'media/' + token.imageName;
//   data.imageTransparentBG = config.external_url_prefix + 'media/' + token.imageTBName;
//   attributes.push({ "trait_type": "Collection", "value": config.collection });
//   attributes.push({ "trait_type": "Generation", "value": token.generation });
//
//   for (let parentIndex in token.parents) {
//     let parent = token.parents[parentIndex];
//     console.log("parent" + " " + JSON.stringify(parent));
//     attributes.push({ "trait_type": "Parent", "value": parent.name });
//   }
//
//   for (let attributeIndex in token.attributes) {
//     let attribute = token.attributes[attributeIndex];
//     console.log("attribute" + " " + JSON.stringify(attribute));
//     attributes.push({ "trait_type": "Attribute", "value": attribute });
//   }
//
//   for (let ancientDNAIndex in token.ancientDNA) {
//     let ancientDNA = token.ancientDNA[ancientDNAIndex];
//     console.log("ancientDNA" + " " + JSON.stringify(ancientDNA));
//     attributes.push({ "trait_type": "Ancient DNA", "value": ancientDNA });
//   }
//
//   data.attributes = attributes;
//   (async () => {
//     await fs.writeFile(jsonFilename, JSON.stringify(data, null, 2), (err) => {
//         if (err) throw err;
//         console.log('Data written to file: ' + jsonFilename + " " + JSON.stringify(data, null, 2));
//     });
//   })();
//
// }
//
// // https://ipfs.io/ipfs/Qmdmw1BZA9eF8iH4yK7v3fjqqGEWXFM4x6bu4aLc2wdamB/Baby_000_background.png
// // {
// //   "description": "Zombie Baby #000",
// //   "external_url": "https://ethervendingmachine.io/nfts/0000000000000000000000000000000000000000000000000000000000000000.png",
// //   "image": "https://ethervendingmachine.io/nfts/0000000000000000000000000000000000000000000000000000000000000000.png",
// //   "name": "Zombie Baby #000",
// //   "attributes": [
// //       {
// //         "trait_type": "Collection",
// //         "value": "Zombie Babies"
// //       },
// //       {
// //         "trait_type": "Parent 1",
// //         "value": "Zombie #3636"
// //       },
// //       {
// //         "trait_type": "Parent 2",
// //         "value": "Zombie #4472"
// //       },
// //       {
// //         "trait_type": "Attribute",
// //         "value": "Front Beard Dark"
// //       },
// //       {
// //         "trait_type": "Attribute",
// //         "value": "Earring"
// //       },
// //       {
// //         "trait_type": "Attribute",
// //         "value": "Top Hat"
// //       },
// //       {
// //         "trait_type": "Ancient DNA",
// //         "value": "None"
// //       },
// //       {
// //         "display_type": "number",
// //         "trait_type": "Generation",
// //         "value": 2
// //       }
// //     ]
// // }
//
//
//
// function pad3Zeroes(s) {
//   var o = s.toString();
//   while (o.length < 3) {
//     o = "0" + o;
//   }
//   return o;
// }
//
// function pad64Zeroes(s) {
//   var o = s.toString();
//   while (o.length < 64) {
//     o = "0" + o;
//   }
//   return o;
// }
//
// function getAllTokenIds(config) {
//   return Object.keys(config.tokens);
// }
//
// function getAllParents(config) {
//   let allParents = {};
//   for (let tokenId in Object.keys(config.tokens)) {
//     let token = config.tokens[tokenId];
//     for (let parentIndex in token.parents) {
//       let parent = token.parents[parentIndex];
//       if (allParents[parent] === undefined) {
//         allParents[parent] = 1;
//       }
//     }
//   }
//   return Object.keys(allParents);
// }
//
// function getAllAttributes(config) {
//   let allAttributes = {};
//   for (let tokenId in Object.keys(config.tokens)) {
//     let token = config.tokens[tokenId];
//     for (let attributeIndex in token.attributes) {
//       let attribute = token.attributes[attributeIndex];
//       if (allAttributes[attribute] === undefined) {
//         allAttributes[attribute] = 1;
//       }
//     }
//   }
//   return Object.keys(allAttributes);
// }
//
// function getAllAncientDNAs(config) {
//   let allAncientDNAs = {};
//   for (let tokenId in Object.keys(config.tokens)) {
//     let token = config.tokens[tokenId];
//     for (let ancientDNAIndex in token.ancientDNA) {
//       let ancientDNA = token.ancientDNA[ancientDNAIndex];
//       if (allAncientDNAs[ancientDNA] === undefined) {
//         allAncientDNAs[ancientDNA] = 1;
//       }
//     }
//   }
//   return Object.keys(allAncientDNAs);
// }
//
// // Simple Addition Function in Javascript
// function add(a, b) {
//   return a+b
// }
// console.log(add(4, 6))

console.log(process.cwd());



// console.log("Hello: " + BASTARDGANPUNKV2ADDRESS);

// geth attach http://localhost:8545 << EOF
// loadScript("functions.js");
//
// EOF

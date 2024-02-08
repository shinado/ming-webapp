const base58 = require('bs58');
const crypto = require('crypto');

export function getBTCAddress(name) {
    //fixme: get sha384 from name
    const sha384 = crypto.createHash('sha384').update(name).digest('hex');

    let ecdsaPublicKey = '0444444444444444444444444444444444' + sha384;
    console.log("ECDSA Public Key: ", ecdsaPublicKey);

    // Calculating SHA-256 hash
    let hash256FromECDSAPublicKey = crypto.createHash('sha256').update(Buffer.from(ecdsaPublicKey, 'hex')).digest('hex');
    console.log("SHA256(ECDSA Public Key): ", hash256FromECDSAPublicKey);

    // Calculating RIPEMD160 hash
    let ridemp160FromHash256 = crypto.createHash('ripemd160').update(Buffer.from(hash256FromECDSAPublicKey, 'hex')).digest('hex');
    console.log("RIDEMP160(SHA256(ECDSA Public Key)): ", ridemp160FromHash256);

    // Prepend network byte
    let prependNetworkByte = '00' + ridemp160FromHash256;
    console.log("Prepend Network Byte to RIDEMP160(SHA256(ECDSA Public Key)): ", prependNetworkByte);

    // Double SHA-256 hash
    let hash = prependNetworkByte;
    for (let x = 1; x <= 2; x++) {
        hash = crypto.createHash('sha256').update(Buffer.from(hash, 'hex')).digest('hex');
        console.log("\t|___>SHA256 #", x, " : ", hash);
    }

    // Checksum
    let checksum = hash.substring(0, 8);
    console.log("Checksum(first 4 bytes): ", checksum);

    // Append checksum
    let appendChecksum = prependNetworkByte + checksum;
    console.log("Append Checksum to RIDEMP160(SHA256(ECDSA Public Key)): ", appendChecksum);

    // Base58 encoding
    let bitcoinAddress = base58.encode(Buffer.from(appendChecksum, 'hex'));
    console.log("Bitcoin Address: ", bitcoinAddress);
}
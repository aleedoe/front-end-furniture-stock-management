import crypto from 'crypto';

// Fungsi untuk enkripsi
export function encrypt(text: string) {
    const algorithm = 'aes-256-cbc'; // Algoritma enkripsi
    const key = crypto.scryptSync('secret_key', 'salt', 32); // Key untuk enkripsi
    const iv = crypto.randomBytes(16); // Inisialisasi vector

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Gabungkan iv dan hasil enkripsi
    return iv.toString('hex') + ':' + encrypted;
}

// Fungsi untuk dekripsi
export function decrypt(text: string) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync('secret_key', 'salt', 32);
    const [iv, encryptedText] = text.split(':');

    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
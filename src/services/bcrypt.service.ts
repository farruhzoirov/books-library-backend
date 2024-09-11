import bcrypt from 'bcryptjs';

export class BcryptService {
    async generateHash(data: string) {
        return await bcrypt.hash(data, await bcrypt.genSalt(12));
    }

    async compareHash(data: string, hash: string) {
        return await bcrypt.compare(data, hash);
    }
}
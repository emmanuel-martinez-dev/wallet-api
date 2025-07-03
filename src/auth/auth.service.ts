import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthMessage } from './auth-message.entity';

type UserRepository = Repository<User>;
type AuthMessageRepository = Repository<AuthMessage>;

export const AUTH_MESSAGE =
    'This request will not trigger a blockchain transaction or cost any gas fees.';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        public readonly userRepository: UserRepository,
        @InjectRepository(AuthMessage)
        public readonly authMessageRepository: AuthMessageRepository,
    ) { }

    async generateAuthMessage(walletAddress: string) {
        const authMessage = await this.authMessageRepository.save({
            walletAddress,
        });

        return {
            authMessage: {
                nonce: authMessage.id,
                walletAddress: authMessage.walletAddress,
                message: `${AUTH_MESSAGE}\n\nWallet address:\n${walletAddress.toLowerCase()}\n\nNonce:\n${authMessage.id
                    }`,
            },
        };
    }

    async login(walletAddress: string) {
        let foundUser = await this.userRepository.findOne({
            where: {
                walletAddress,
            },
        });

        if (!foundUser) {
            foundUser = await this.userRepository.save({
                walletAddress,
            });
        }

        // Assuming there is a generate user token method
        const token = await this.generateUserToken(foundUser);

        return {
            token,
        };
    }

    private async generateUserToken(user: User): Promise<string> {
        // Implementación básica - reemplaza con tu lógica de tokens
        return `token_${user.id}_${Date.now()}`;
    }
}
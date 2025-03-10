import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';




@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'secret_key',
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
    exports: [JwtModule],
})
export class JWTModule {}
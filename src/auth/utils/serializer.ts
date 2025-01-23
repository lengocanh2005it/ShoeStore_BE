import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error | null, user?: any) => void) {
    done(null, user.userId);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error | null, user?: any) => void,
  ) {
    const user = await this.usersService.findOne(payload.userId);
    return user ? done(null, user) : done(null, null);
  }
}

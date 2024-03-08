import {TokenService, UserService} from '@loopback/authentication';
import {
  Credentials,
  TokenServiceBindings,
  User,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, param, post, requestBody} from '@loopback/rest';
import {Account} from '../models';
import {AccountRepository} from '../repositories';

export class AccountController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
  ) {}

  @post('/register')
  async register(
    @requestBody() credentials: {username: string; password: string},
    @param.query.string('username', {required: true}) username: string,
    @param.query.string('password', {required: true}) password: string,
    @param.query.string('role', {required: true}) role: string,
  ): Promise<Account> {
    const existingAccount: Account | null =
      await this.accountRepository.findOne({
        where: {username},
      });

    if (existingAccount) {
      throw new Error('Tên đăng nhập đã được sử dụng');
    }

    const newAccount: Account = await this.accountRepository.create({
      username,
      password,
      role,
    });

    return newAccount;
  }

  @post('/login')
  async login(
    @requestBody() credentials: {username: string; password: string},
    @param.query.string('username', {required: true}) username: string,
    @param.query.string('password', {required: true}) password: string,
  ): Promise<Account> {
    const account: Account | null = await this.accountRepository.findOne({
      where: {username, password},
    });

    if (!account) {
      throw new HttpErrors[404]('Wrong username or password');
    }

    return account;
  }
}

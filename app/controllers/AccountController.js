var Account = require('../models/account');
import { BaseController }  from './BaseController';

export class AccountsController extends BaseController{
  constructor(app) {

    super(app);

    this.model = Account;
    this.baseRoute = '/v1/accounts';
    this.responseKey = 'accounts';
  }
}

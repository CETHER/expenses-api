var User = require('../models/user');
import { BaseController }  from './BaseController';

export class UsersController extends BaseController{
  constructor(app) {

    super(app);

    this.model = User;
    this.baseRoute = '/v1/users';
    this.responseKey = 'users';
  }

  store(req, res){
    User.findOne({
      email: req.body.email
    },(err, user)=>{
      if(err) { return this.handleError(req, res, err); }
      if(user) { return this.restoreUser(req, res, user);}

      var newUser = new User(req.body);
      if(!newUser){
        return res.status(400).json({error: 'Wrong request'});
      }
      this.saveUser(req, res, newUser);

    });
  }
}

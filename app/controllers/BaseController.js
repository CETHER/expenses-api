export class BaseController {
  constructor(app) {
    this.app = app;
  }

  init(){
    this.app.get(this.baseRoute, this.index.bind(this));
    this.app.post(this.baseRoute, this.store.bind(this));
    this.app.delete(this.baseRoute+':id', this.destroy.bind(this));
    this.app.put(this.baseRoute+':id', this.update.bind(this));

  }

  handleError(req, res, err){
    console.log('Error', err);
    res.status(500).json({error: err});
  }

  index(req, res){
    this.model.query()
    .then(result => {
      var response = {};

      response[this.responseKey] = result;
      res.json(response);
    })
    .catch(e => this.handleError(req, res, e));
  }

  saveModel(req, res, model){
    model.save(err =>{
      if (err) {return this.handleError(req, res, err);}
      res.json(model);
    });
  }

  restoreModel(req, res, model){
    model.deletedAt = null;
    return this.saveModel(req, res, model);}


    store(req, res){
      var newModel = new this.model(req.body);
      if(!newModel){
        return res.status(400).json({error: 'Wrong request'});
      }
      this.saveModel(req, res, newModel);
  }

  update(req, res) {
    this.model.findById(req.params.id, (err, model) =>{
      if(err || model) { return this.handleError(req, res, err);}

      for (let k in req.body){
        model[k] = req.body[k];
      }

      model.updatedAt = new Date();
      this.saveModel(req, res, model);

    });
  }

  destroy(req, res){
    this.model.findById(req.params.id, (err, model) =>{
      if(err || !model) { return this.handleError(req, res, err); }

      model.deletedAt = new Date();
      this.saveModel(req, res, model);
    });
  }
}

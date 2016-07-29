var express = require('express');

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.deleteModify =function (attr, value,action){
    
    var i = this.items.length;
    arr =this.items;
   console.log("this is the " + attr + " this is  the value" + value);
    while(i--){
       if( arr[i] 
          && arr[i][attr] == value ) { 
    if (action =='#@$%^') // i have to use special character as I don't wnat user to provide this to modify
      {           
            arr.splice(i,1);
            return;
        }
        else {
               arr[i].name = action;
               return;;
         }

       }
    }
}

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};




var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();
app.use(express.static('public'))

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id',function(req,res){
 console.log("this is delete");
   storage.deleteModify('id', req.params.id,'#@$%^')
   res.json(storage.items);
   //return;

});

app.put('/items', jsonParser, function(req, res) {


  console.log("this is the body" + req.body.name);
   storage.deleteModify('id', req.params.id,req.body.name);

   console.log(json(storage.items));
  res.status(200).json(storage.items);
  
});

app.get('/items', function(req, res) {
  console.log("this is get");
    res.status(200).json(storage.items);
});

app.listen(process.env.PORT || 8080,function(req,res){
console.log('Port started on ');

});

exports.app = app;
exports.storage = storage;
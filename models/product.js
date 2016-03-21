var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {type: String, default: null},
    description: {type: String, default: null},
    value: {type: Number, default: 0}
},
{
    versionKey: false
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceHash;

var OUTPUT_DIR = 'prd';
var QUERY_REG = /\?.+$/;
var VER_REG = /@[\d\w]+(?=\.\w+)/;

/**
 * 由于express中，如果使用app.use(xxx, middle)这种方式，中间件里面没法获取req.url，所以这里直接过滤js和css
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function replaceHash(req, res, next) {
  var url = req.url.replace(QUERY_REG, '');
  if (/.*\.(js|css)$/.test(url)) {
    var filePaths = url.split('/');
    // 如果url == '/projectname/prd/..../xxx@hash值.js|css'，那么把这些hash都删除掉。
    if (filePaths[2] === OUTPUT_DIR) {
      req.url = url.replace(QUERY_REG, '').replace(VER_REG, '');
      req.originalUrl = req.url;
    }
  }
  next();
}
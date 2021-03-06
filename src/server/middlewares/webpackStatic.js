
const STATIC_REG = /.*\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/
const VER_REG = /[\W][\d\w]+(?=\.\w+$)/;

export default (req, res, next) => {
  let filePaths = req.url.split('/')
  if (STATIC_REG.test(req.path) && filePaths[2] === 'prd') {
    filePaths.splice(2, 1)
    req.url = filePaths.join('/').replace(VER_REG, '')
  }
  next()
}
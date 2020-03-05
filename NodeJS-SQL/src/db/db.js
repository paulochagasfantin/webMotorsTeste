var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'webmotors',
        password: 'ferrari',
        server: 'DESKTOP-GL5Q18R',
        database: 'teste_webMotors'
    });
 
    return conn;
};

module.exports = connect;
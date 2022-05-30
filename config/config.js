//COMANDO STARTAR APP "npm start"
const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 3000;

const config = () => {
    switch (env) {
        case 'dev':
        return{
            bd_string: 'mongodb+srv://usuario_admin:TfT4223MmV3ZDZu@clusterapi.2hkoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_pass: 'senhaexemplo2022',
            jwt_expires_in: '7d'
        }

        case 'hml':
        return {
            bd_string: 'mongodb+srv://usuario_admin:TfT4223MmV3ZDZu@clusterapi.2hkoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_pass: 'senhaexemplo2022',
            jwt_expires_in: '7d'
        }

        case 'prod':
        return {
            bd_string: 'mongodb+srv://usuario_admin:TfT4223MmV3ZDZu@clusterapi.2hkoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_pass: 'senhaexemplo2022',
            jwt_expires_in: '7d'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);


module.exports = config();
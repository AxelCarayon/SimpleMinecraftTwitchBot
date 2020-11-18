const util = require('minecraft-server-util');

module.exports = {
    sendCommand: function(commande) {
        const client = new util.RCON('localhost', { port: 25575, enableSRV: true, timeout: 5000, password: 'zebi' });
        client.on('output', (message) => console.log(message));

        client.connect()
            .then(async() => {
                await client.run(commande);

                client.close();
            })
            .catch((error) => {
                throw error;
            });
    }
}
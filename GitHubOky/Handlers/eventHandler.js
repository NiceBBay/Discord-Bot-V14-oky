function loadEvents(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Eventy', 'Status');

    const folders = fs.readdirSync('./Eventy');
    for (const folder of folders) {
        const files = fs.readdirSync(`./Eventy/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(`../Eventy/${folder}/${file}`);

            if (event.rest) {
                if(event.once)
                    client.rest.once(event.name, (...args) =>
                    event.execute(...args, client)
                );
                else
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client)
                    );
            } else {
                if (event.once)
                    client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args, client));
            }
            table.addRow(file, "✅");
            continue;
        }
    }
    return console.log(table.toString(), "\nPomyślnie załadowano eventy!");
}

module.exports = {loadEvents};
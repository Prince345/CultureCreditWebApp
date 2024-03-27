const { MongoClient } = require('mongodb'); //Connects to a MongoDB database

// Connects to MongoDB cluster, calls functions to query database, and disconnects from cluster
async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try {
        //Now can connect to cluster, this returns a promise
        await client.connect();
        //This function should print the names of the databases in this cluster.
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        //Be sure to close the connection
        await client.close();
    }
}

main().catch(console.error);

/**
 * Prints names of all available databases
 * @param client
 * @returns {Promise<void>}
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function createStudent(client, newStudent){
    const result = await client.db("PEMACS").collection("Students").insertOne(newStudent);
    console.log(`New student created with the following id: ${result.insertId}`);
}
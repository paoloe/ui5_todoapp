const { MongoClient } = require("mongodb");

async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb+srv://new-user_01:h2WEFic8kJmvCRR@cluster0.txcl3.mongodb.net/plantDB?retryWrites=true&w=majority";


  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      // await  listDatabases(client);

      //Find one plant
      await findOnePlantByName(client, "Monstera Deliciosa");

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

async function findOnePlantByName(client, nameOfPlant){
  const result = await client.db("plantDB").collection("plant")
  .findOne({name: nameOfPlant});

  if (result) {
    console.log(`Found a plant in the collection with the name '$
    {nameOfPlant}'`);
    console.log(result);
  } else {
    console.log(`No plants found with the name '${nameOfPlant}'`);
  }
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);
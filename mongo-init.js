print("Started Adding the Users.");
db = db.getSiblingDB(process.env["MONGO_INITDB_ROOT_USERNAME"]);
db.auth(
  process.env["MONGO_INITDB_ROOT_USERNAME"],
  process.env["MONGO_INITDB_ROOT_PASSWORD"]
);
db = db.getSiblingDB(process.env["MONGO_INITDB_DATABASE"]);
db.createUser({
  user: process.env["MONGO_USER"],
  pwd: process.env["MONGO_PASS"],
  roles: [
    {
      role: "dbOwner",
      db: process.env["MONGO_INITDB_DATABASE"],
    },
  ],
});

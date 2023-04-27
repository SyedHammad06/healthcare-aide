migrate((db) => {
  const collection = new Collection({
    "id": "oyo9q30xpbkgjct",
    "created": "2023-04-27 18:53:37.005Z",
    "updated": "2023-04-27 18:53:37.005Z",
    "name": "package_schedule",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4qyktcwi",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "ourwny5a",
        "name": "package_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "mglj99b5hqwfx6p",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "uljmalxk",
        "name": "date_time",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("oyo9q30xpbkgjct");

  return dao.deleteCollection(collection);
})

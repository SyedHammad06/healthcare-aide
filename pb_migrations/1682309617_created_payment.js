migrate((db) => {
  const collection = new Collection({
    "id": "5lz3k4mfeiebmex",
    "created": "2023-04-24 04:13:36.958Z",
    "updated": "2023-04-24 04:13:36.958Z",
    "name": "payment",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "av66q5ft",
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
        "id": "awe1vdom",
        "name": "address",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jlkwxkme",
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
  const collection = dao.findCollectionByNameOrId("5lz3k4mfeiebmex");

  return dao.deleteCollection(collection);
})

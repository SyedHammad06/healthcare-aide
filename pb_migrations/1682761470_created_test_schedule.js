migrate((db) => {
  const collection = new Collection({
    "id": "2mqmvki79eyqrst",
    "created": "2023-04-29 09:44:30.624Z",
    "updated": "2023-04-29 09:44:30.624Z",
    "name": "test_schedule",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hxs7n8pl",
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
        "id": "tkaduuzb",
        "name": "test_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "w14d63yupbda362",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "t4qyvlgu",
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
  const collection = dao.findCollectionByNameOrId("2mqmvki79eyqrst");

  return dao.deleteCollection(collection);
})

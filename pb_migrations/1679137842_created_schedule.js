migrate((db) => {
  const collection = new Collection({
    "id": "1ztujwjg5pjrmw9",
    "created": "2023-03-18 11:10:42.373Z",
    "updated": "2023-03-18 11:10:42.373Z",
    "name": "schedule",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qmlfany3",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "envcahj1",
        "name": "appointment_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "qit46i88o2kl94z",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "y8vmy9dn",
        "name": "time",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("1ztujwjg5pjrmw9");

  return dao.deleteCollection(collection);
})

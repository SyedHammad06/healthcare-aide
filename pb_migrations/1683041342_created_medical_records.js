migrate((db) => {
  const collection = new Collection({
    "id": "6h7679scucpl8qd",
    "created": "2023-05-02 15:29:01.945Z",
    "updated": "2023-05-02 15:29:01.945Z",
    "name": "medical_records",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ez4yfxrp",
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
        "id": "fyi7bwkt",
        "name": "medical_record",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("6h7679scucpl8qd");

  return dao.deleteCollection(collection);
})

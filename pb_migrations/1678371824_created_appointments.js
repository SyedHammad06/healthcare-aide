migrate((db) => {
  const collection = new Collection({
    "id": "qit46i88o2kl94z",
    "created": "2023-03-09 14:23:44.377Z",
    "updated": "2023-03-09 14:23:44.377Z",
    "name": "appointments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xeuaqzgp",
        "name": "name",
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
        "id": "rvf4bvey",
        "name": "field",
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
        "id": "v8e7iahg",
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
        "id": "jspfk4io",
        "name": "fee",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "lbzetzr0",
        "name": "img",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qit46i88o2kl94z");

  return dao.deleteCollection(collection);
})

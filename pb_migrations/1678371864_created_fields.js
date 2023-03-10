migrate((db) => {
  const collection = new Collection({
    "id": "jewdqkhfjzyozkc",
    "created": "2023-03-09 14:24:23.944Z",
    "updated": "2023-03-09 14:24:23.944Z",
    "name": "fields",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gdu8usuz",
        "name": "title",
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
        "id": "0nv88y6j",
        "name": "subtitle",
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
        "id": "cewhdvun",
        "name": "image",
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
  const collection = dao.findCollectionByNameOrId("jewdqkhfjzyozkc");

  return dao.deleteCollection(collection);
})

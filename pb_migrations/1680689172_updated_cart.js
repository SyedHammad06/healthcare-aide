migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nt369wnm6hcvafl")

  // remove
  collection.schema.removeField("v8yl4vuw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nwo8wgzm",
    "name": "image",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nt369wnm6hcvafl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v8yl4vuw",
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
  }))

  // remove
  collection.schema.removeField("nwo8wgzm")

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mglj99b5hqwfx6p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vdrkv0te",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/webp"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mglj99b5hqwfx6p")

  // remove
  collection.schema.removeField("vdrkv0te")

  return dao.saveCollection(collection)
})

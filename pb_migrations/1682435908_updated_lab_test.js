migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w14d63yupbda362")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zmc1hrrc",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w14d63yupbda362")

  // remove
  collection.schema.removeField("zmc1hrrc")

  return dao.saveCollection(collection)
})

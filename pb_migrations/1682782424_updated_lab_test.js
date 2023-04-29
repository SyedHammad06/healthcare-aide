migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w14d63yupbda362")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5ubwwsry",
    "name": "timings",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w14d63yupbda362")

  // remove
  collection.schema.removeField("5ubwwsry")

  return dao.saveCollection(collection)
})

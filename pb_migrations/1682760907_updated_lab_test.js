migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w14d63yupbda362")

  // remove
  collection.schema.removeField("fibau1xp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "be76b8sr",
    "name": "description",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w14d63yupbda362")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fibau1xp",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("be76b8sr")

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mglj99b5hqwfx6p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hkeqcorh",
    "name": "timings",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mglj99b5hqwfx6p")

  // remove
  collection.schema.removeField("hkeqcorh")

  return dao.saveCollection(collection)
})

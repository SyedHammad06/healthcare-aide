migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qit46i88o2kl94z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lsvqkft0",
    "name": "timings",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qit46i88o2kl94z")

  // remove
  collection.schema.removeField("lsvqkft0")

  return dao.saveCollection(collection)
})

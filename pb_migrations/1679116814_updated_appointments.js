migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qit46i88o2kl94z")

  // remove
  collection.schema.removeField("o1f8ab7f")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qit46i88o2kl94z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o1f8ab7f",
    "name": "field1",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})

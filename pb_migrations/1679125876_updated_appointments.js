migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qit46i88o2kl94z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rydf4pag",
    "name": "direction",
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
  const collection = dao.findCollectionByNameOrId("qit46i88o2kl94z")

  // remove
  collection.schema.removeField("rydf4pag")

  return dao.saveCollection(collection)
})

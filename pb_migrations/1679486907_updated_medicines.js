migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1kzl6ohniipek4i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gir2mqop",
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
  const collection = dao.findCollectionByNameOrId("1kzl6ohniipek4i")

  // remove
  collection.schema.removeField("gir2mqop")

  return dao.saveCollection(collection)
})

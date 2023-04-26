migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ajkgqpew26j2e87")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tdydcbm2",
    "name": "ideal",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ajkgqpew26j2e87")

  // remove
  collection.schema.removeField("tdydcbm2")

  return dao.saveCollection(collection)
})

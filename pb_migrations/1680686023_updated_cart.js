migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nt369wnm6hcvafl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cfwhtngx",
    "name": "total",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nt369wnm6hcvafl")

  // remove
  collection.schema.removeField("cfwhtngx")

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nt369wnm6hcvafl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udmubvue",
    "name": "price",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udmubvue",
    "name": "pack_size",
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

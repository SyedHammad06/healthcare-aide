migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6h7679scucpl8qd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "egjha18o",
    "name": "last_edit",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6h7679scucpl8qd")

  // remove
  collection.schema.removeField("egjha18o")

  return dao.saveCollection(collection)
})

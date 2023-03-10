migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qit46i88o2kl94z")

  // remove
  collection.schema.removeField("rvf4bvey")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gtvsppzj",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jewdqkhfjzyozkc",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": [
        "title"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qit46i88o2kl94z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rvf4bvey",
    "name": "field",
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
  collection.schema.removeField("gtvsppzj")

  return dao.saveCollection(collection)
})

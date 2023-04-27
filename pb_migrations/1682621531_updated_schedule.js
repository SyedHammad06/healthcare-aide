migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ztujwjg5pjrmw9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "envcahj1",
    "name": "appointment_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "qit46i88o2kl94z",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ztujwjg5pjrmw9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "envcahj1",
    "name": "appointment_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "qit46i88o2kl94z",
      "cascadeDelete": false,
      "maxSelect": 3,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

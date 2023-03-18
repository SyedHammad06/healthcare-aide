migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ztujwjg5pjrmw9")

  // remove
  collection.schema.removeField("y8vmy9dn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4qajneo7",
    "name": "date_time",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1ztujwjg5pjrmw9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y8vmy9dn",
    "name": "time",
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
  collection.schema.removeField("4qajneo7")

  return dao.saveCollection(collection)
})

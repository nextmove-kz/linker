/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1335443150")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select2489655421",
    "maxSelect": 1,
    "name": "tariff",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "main",
      "lifetime"
    ]
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "exceptDomains": [],
    "hidden": false,
    "id": "email3885137012",
    "name": "email",
    "onlyDomains": [],
    "presentable": false,
    "required": false,
    "system": false,
    "type": "email"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1335443150")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select2489655421",
    "maxSelect": 1,
    "name": "tariff",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "main",
      "lifetime"
    ]
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "exceptDomains": [],
    "hidden": false,
    "id": "email3885137012",
    "name": "email",
    "onlyDomains": [],
    "presentable": false,
    "required": true,
    "system": false,
    "type": "email"
  }))

  return app.save(collection)
})

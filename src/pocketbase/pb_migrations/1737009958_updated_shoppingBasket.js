/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number2245608546",
    "max": 50,
    "min": 1,
    "name": "amount",
    "onlyInt": true,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number2245608546",
    "max": 50,
    "min": 1,
    "name": "count",
    "onlyInt": true,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})

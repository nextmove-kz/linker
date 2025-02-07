/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1335443150")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1146066909",
    "max": null,
    "min": null,
    "name": "user_phone",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1335443150")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1146066909",
    "max": null,
    "min": null,
    "name": "phone",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})

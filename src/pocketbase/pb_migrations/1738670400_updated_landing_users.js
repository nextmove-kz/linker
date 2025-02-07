/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1335443150")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool228880198",
    "name": "is_read",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1335443150")

  // remove field
  collection.fields.removeById("bool228880198")

  return app.save(collection)
})

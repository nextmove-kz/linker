/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_345395871")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3861620733",
    "hidden": false,
    "id": "relation2288470639",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "setting_options",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_345395871")

  // remove field
  collection.fields.removeById("relation2288470639")

  return app.save(collection)
})

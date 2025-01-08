/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1218262561")

  // remove field
  collection.fields.removeById("relation3015334490")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1218262561")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4092854851",
    "hidden": false,
    "id": "relation3015334490",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "products",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})

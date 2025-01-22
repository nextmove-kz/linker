/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1258897888")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3892359758",
    "hidden": false,
    "id": "relation3846545605",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "settings",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1258897888")

  // remove field
  collection.fields.removeById("relation3846545605")

  return app.save(collection)
})

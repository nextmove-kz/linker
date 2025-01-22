/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1258897888")

  // remove field
  collection.fields.removeById("json3846545605")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool3768296713",
    "name": "required",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1258897888")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "json3846545605",
    "maxSize": 0,
    "name": "settings",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("bool3768296713")

  return app.save(collection)
})

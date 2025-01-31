/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1258897888")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3892359758",
    "hidden": false,
    "id": "relation863840008",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "field_settings",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3609584214",
    "hidden": false,
    "id": "relation1041358631",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "field_options",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1258897888")

  // remove field
  collection.fields.removeById("relation863840008")

  // remove field
  collection.fields.removeById("relation1041358631")

  return app.save(collection)
})

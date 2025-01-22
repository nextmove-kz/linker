/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3344818903")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2769025244",
    "hidden": false,
    "id": "relation2675226776",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "setting",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3344818903")

  // remove field
  collection.fields.removeById("relation2675226776")

  return app.save(collection)
})

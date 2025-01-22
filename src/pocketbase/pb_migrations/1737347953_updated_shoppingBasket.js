/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3344818903",
    "hidden": false,
    "id": "relation2764548572",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "selected_variants",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // remove field
  collection.fields.removeById("relation2764548572")

  return app.save(collection)
})

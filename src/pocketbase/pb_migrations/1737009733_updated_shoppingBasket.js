/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // remove field
  collection.fields.removeById("date2482226890")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date2482226890",
    "max": "",
    "min": "",
    "name": "datetime",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})

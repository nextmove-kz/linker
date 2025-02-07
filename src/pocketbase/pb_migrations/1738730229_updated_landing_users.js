/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1335443150")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select3472488231",
    "maxSelect": 1,
    "name": "consult_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "subscription",
      "question"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1335443150")

  // remove field
  collection.fields.removeById("select3472488231")

  return app.save(collection)
})

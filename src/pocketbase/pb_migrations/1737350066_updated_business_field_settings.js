/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3892359758")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_ctPdPtZuBl` ON `business_field_settings` (\n  `businsess_field`,\n  `setting`\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3892359758")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1258897888")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_7tNUcA3Cge` ON `business_fields` (`position`)",
      "CREATE UNIQUE INDEX `idx_LjqSrs9ZUG` ON `business_fields` (`name`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1258897888")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_7tNUcA3Cge` ON `business_fields` (\n  `business`,\n  `position`\n)",
      "CREATE UNIQUE INDEX `idx_LjqSrs9ZUG` ON `business_fields` (\n  `business`,\n  `name`\n)"
    ]
  }, collection)

  return app.save(collection)
})

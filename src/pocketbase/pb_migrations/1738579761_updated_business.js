/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey__pb_users_auth_` ON `business` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email__pb_users_auth_` ON `business` (`email`) WHERE `email` != ''",
      "CREATE UNIQUE INDEX `idx_zPcoxyW9LV` ON `business` (`name`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey__pb_users_auth_` ON `business` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email__pb_users_auth_` ON `business` (`email`) WHERE `email` != ''",
      "CREATE UNIQUE INDEX `idx_zPcoxyW9LV` ON `business` (\n  `name`,\n  `displayName`\n)"
    ]
  }, collection)

  return app.save(collection)
})

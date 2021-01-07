import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.profilesTableName,
    Item: {
      // The attributes of the profile that will be created
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the profile
      actualName: data.actualName,
      university: data.university,
      field: data.field,
      createdAt: Date.now(), // Current Unix timestamp when profile was created
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
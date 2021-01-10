import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.companyTableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
      companyId: event.pathParameters.id, // The id of the company from the path
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
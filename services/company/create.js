import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import * as uuid from "uuid";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.companyTableName,
    Item: {
      // The attributes of the profile that will be created
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the profile
      companyId: uuid.v1(),
      companyName: data.companyName,
      companyPriority: data.companyPriority,
      recruitingStart: data.recruitingStart,
      recruitingEnd: data.recruitingEnd,
      companyWebsite: data.companyWebsite,
      companyDescription: data.companyDescription,
      companyLastContactDate: data.companyLastContactDate,
      createdAt: Date.now(), // Current Unix timestamp when profile was created
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
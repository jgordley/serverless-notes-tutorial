import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.companyTableName,
    // 'Key' defines the partition key of the user to be updated
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the user to refer to their profile
      companyId: event.pathParameters.id, // The id of the company from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET companyName = :companyName, companyPriority = :companyPriority, recruitingStart = :recruitingStart, recruitingEnd = :recruitingEnd, companyWebsite = :companyWebsite, companyDescription = :companyDescription, companyLastContactDate = :companyLastContactDate",
    ExpressionAttributeValues: {
      ":companyName": data.companyName,
      ":companyPriority": data.companyPriority,
      ":recruitingStart": data.recruitingStart,
      ":recruitingEnd": data.recruitingEnd,
      ":companyWebsite": data.companyWebsite,
      ":companyDescription": data.companyDescription,
      ":companyLastContactDate": data.companyLastContactDate
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
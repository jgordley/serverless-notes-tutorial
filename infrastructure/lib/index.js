import S3Stack from "./S3Stack";
import CognitoStack from "./CognitoStack";
import DynamoDBStack from "./DynamoDBStack";
import DynamoDBProfileStack from "./DynamoDBProfileStack";

// Add stacks
export default function main(app) {
  new DynamoDBStack(app, "dynamodb");
  new DynamoDBProfileStack(app, "profiles");

  const s3 = new S3Stack(app, "s3");

  new CognitoStack(app, "cognito", { bucketArn: s3.bucket.bucketArn });
}
import { CfnOutput } from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as sst from "@serverless-stack/resources";

export default class DynamoDBProfileStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const app = this.node.root;

    const table = new dynamodb.Table(this, "Table", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING }
    });

    // Output values
    new CfnOutput(this, "ProfilesTableName", {
      value: table.tableName,
      exportName: app.logicalPrefixedName("ProfilesTableName"),
    });
    new CfnOutput(this, "ProfilesTableArn", {
      value: table.tableArn,
      exportName: app.logicalPrefixedName("ProfilesTableArn"),
    });
  }
}
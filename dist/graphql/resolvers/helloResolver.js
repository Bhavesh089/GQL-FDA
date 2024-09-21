"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const helloResolver = {
    Query: {
        fetchItems: async () => {
            const lambda = new aws_sdk_1.Lambda();
            // Invoke the DBQuery Lambda function
            const params = {
                FunctionName: 'fda-service-dev-dbquery',
                InvocationType: 'RequestResponse',
            };
            console.log(params, 'this is params-->');
            try {
                const result = await lambda.invoke(params).promise();
                const data = JSON.parse(result.Payload);
                return JSON.parse(data.body).items;
            }
            catch (error) {
                console.error('Error invoking DBQuery Lambda:', error);
                return [];
            }
        },
    },
};
exports.default = helloResolver;

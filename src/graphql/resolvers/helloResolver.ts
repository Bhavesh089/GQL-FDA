import { Lambda } from 'aws-sdk';

const helloResolver = {
  Query: {
    fetchItems: async () => {
      const lambda = new Lambda();

      // Invoke the DBQuery Lambda function
      const params = {
        FunctionName: 'fda-service-dev-dbquery',
        InvocationType: 'RequestResponse',
      };
      console.log(params, 'this is params-->')
      try {
        const result = await lambda.invoke(params).promise();
        const data = JSON.parse(result.Payload as string);
        return JSON.parse(data.body).items;
      } catch (error) {
        console.error('Error invoking DBQuery Lambda:', error);
        return [];
      }
    },
  },
};

export default helloResolver;

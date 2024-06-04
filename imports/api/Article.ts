import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ArticlesCollection. It encapsulates state and variable values for stuff.
 */
class ArticlesCollection {
  /** @type {string} */
  name;

  /** @type {Mongo.Collection<any>} */
  collection;

  /** @type {SimpleSchema} */
  schema;

  /** @type {string} */
  userPublicationName;

  constructor() {
    // The name of this collection.
    this.name = 'ArticlesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: String,
      description: String,
      createdOn: {
        type: Date,
        autoValue: function () {
          return new Date();
        },
      },
      modifiedOn: Date,
      createdById: Date,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {ArticlesCollection}
 */
export const Articles = new ArticlesCollection();
